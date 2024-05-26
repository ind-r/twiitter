import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";
import connectMongo from "../../../../libs/MongooseConnect";
import UserMongo, { UserType } from "../../../../libs/models/userModel";
import { compare } from "bcryptjs";
import { Account, Profile, TokenSet, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

export type SessionType = {
  user: {
    name: string,
    email: string,
    image: string,
    userId: string,
  }
  expires: string,
  accessToken: string,
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
      authorize: async (
        credentials: Record<string, string> | undefined
      ) => {
        try {
          if (!credentials) {
            return null;
          }
          const db = await connectMongo();
          if (credentials.email !== ' ') {
            var user: UserType | null = await UserMongo.findOne({
              email: credentials.email,
            });
          } else {
            var user: UserType | null = await UserMongo.findOne({
              username: credentials.username
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

          const userToSubmit: User = {
            id: user._id,
            name: user.username,
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
    }: {
      token: TokenSet;
      account: Account | null;
      user: User | AdapterUser;
      profile?: Profile | undefined;
    }) {
      if (account) {
        // Set these once, as they do not depend on the database lookup
        token.accessToken = account.access_token;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.userId = user.id;

        if (profile) {
          try {
            const db = await connectMongo(); // Ensure the connection is handled correctly in connectMongo
            const dbUser: UserType | null = await UserMongo.findOne({
              email: profile.email,
            });

            if (dbUser) {
              // Update token with data from database
              token.userId = dbUser._id;
              token.name = dbUser.username;
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
    }
    ,
    async session({ session, token }: { session: any, token: TokenSet }) {
      // this token return above jwt()
      session.accessToken = token.accessToken;
      session.user.userId = token.userId;
      //if you want to add user details info
      // console.log(session);
      return session;
    },
    async redirect() {
    const apiUrl = process.env.NEXTAUTH_URL as string;
      return apiUrl;
    },

    async signIn({
      account,
      profile,
    }: {
      account: Account | null;
      profile?: Profile | undefined; // Make profile optional if required by the library
    }) {
      if (!account) {
        return false;
      }
      if (account.provider === "google") {
        if (!profile) {
          return false;
        }
        try {
          const connect = await connectMongo();
          if (connect) {
            const user: UserType | null = await UserMongo.findOne({
              googleId: account.providerAccountId,
            });
            if (!user) {
              var newUser = new UserMongo({
                email: profile.email,
                nickname: "0",
                username: "0",
                googleId: account.providerAccountId,
                // image: profile.picture,
                image: " ",
              });

              await newUser.save(); // Ensure `save` operation is awaited
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
    }
  },

  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/register", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};
