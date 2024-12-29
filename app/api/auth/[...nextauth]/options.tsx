import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { Account, Profile, Session, TokenSet, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import connectMongoDB from "@/lib/MongooseConnect";
import { IUser } from "@/types/models/user";
import MUser from "@/lib/models/userModel";

export interface SessionType extends Session {
  user: {
    name: string;
    nickname: string;
    email: string;
    image: string;
    userId: string;
  };
}

interface UserToSubmit extends User {
  nickname: string;
}

interface CustomProfile extends Profile {
  picture?: string;
}

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),

    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "user123" },
        email: { label: "Email", type: "text", placeholder: "Email@mail.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: Record<string, string> | undefined) => {
        console.log("credentials", credentials);
        try {
          if (!credentials) {
            return null;
          }
          const db = await connectMongoDB();
          if (credentials.email !== " ") {
            var user: IUser | null = await MUser.findOne({
              email: credentials.email,
            });
          } else {
            var user: IUser | null = await MUser.findOne({
              username: credentials.username,
            });
          }

          if (!user) {
            return null;
          }

          const checkPassword = await compare(
            credentials.password,
            user.password
          );

          if (!checkPassword) {
            return null;
          }

          const userToSubmit: UserToSubmit = {
            id: user._id,
            name: user.username,
            nickname: user.nickname,
            email: user.email,
            image: user.image,
          };
          console.log(userToSubmit);

          return userToSubmit;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({
      token,
      account,
      user,
      profile,
      trigger,
      session,
    }: {
      token: TokenSet;
      account: Account | null;
      user: User | AdapterUser;
      profile?: Profile | undefined;
      trigger?: "update" | "signIn" | "signUp" | undefined;
      session?: any;
    }) {
      console.log("trigger", trigger);
      if (trigger === "update") {
        if (session.name) {
          token.name = session.name;
          token.nickname = session.nickname;
        } else {
          token.nickname = session.nickname;
        }
        return token;
      }
      if (account) {
        // Set these once, as they do not depend on the database lookup
        token.accessToken = account.access_token;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.userId = user.id;

        if (profile) {
          try {
            const db = await connectMongoDB(); // Ensure the connection is handled correctly in connectMongo
            const dbUser: IUser | null = await MUser.findOne({
              email: profile.email,
            });

            if (dbUser) {
              // Update token with data from database
              token.userId = dbUser._id;
              token.name = dbUser.username;
              token.nickname = dbUser.nickname;
              token.picture = dbUser.image;
            } else {
              console.log("User not found");
              // Optionally handle user not found scenario
            }
          } catch (error) {
            console.log("Error accessing MongoDB:", error);
            // Optionally handle the error, e.g., by setting an error flag in the token
          }

          // These should only be set if profile is available
          token.email = profile.email;
        }
      }
      return token; // Return the modified token
    },
    async session({ session, token }: { session: any; token: TokenSet }) {
      console.log("session", session);
      // this token return above jwt()
      session.accessToken = token.accessToken;
      session.user.userId = token.userId;
      session.user.nickname = token.nickname;
      //if you want to add user details info
      // console.log(session);
      return session;
    },

    async redirect() {
      return `/home`;
    },

    async signIn({
      account,
      profile,
    }: {
      account: Account | null;
      profile?: CustomProfile | undefined; // Make profile optional if required by the library
    }) {
      console.log("signin", account);
      if (!account) {
        return false;
      }
      if (account.provider === "google") {
        if (!profile) {
          return false;
        }
        try {
          const connect = await connectMongoDB();
          if (connect) {
            const user: IUser | null = await MUser.findOne({
              // googleId: account.providerAccountId,
              email: profile.email,
            });
            if (!user) {
              var newUser = new MUser({
                email: profile.email,
                nickname: "0",
                username: "0",
                googleId: account.providerAccountId,
                image: profile.picture,
              });

              await newUser.save(); // Ensure `save` operation is awaited
            } else if (!user.googleId) {
              user.googleId = account.providerAccountId;
              user.save();
            }
            return true;
          }
          return false; // Ensure a boolean is returned if `connect` is falsy
        } catch (error) {
          console.log(error);
          return false; // Ensure a boolean is returned in the catch block
        }
      } else if (account.provider === "credentials") {
        return true;
      }
      return false; // Ensure a boolean is returned if no condition is met
    },
  },
  callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback`,

  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/register", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};
