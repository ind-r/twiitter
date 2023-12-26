import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";
import connectMongo from "../../../../libs/MongooseConnect";
import UserMongo, { UserType } from "../../../../libs/models/userModel";
import { compare } from "bcryptjs";
import { Account, Profile, TokenSet, User } from "next-auth";

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
          const db = await connectMongo(); // Make sure connectMongo returns a database connection
          if (credentials.email !== ' ') {
            var user: UserType | null = await UserMongo.findOne({
              email: credentials.email,
            }); // Use findOne instead of find
          } else {
            var user: UserType | null = await UserMongo.findOne({
              username: credentials.username
            }); // Use findOne instead of find

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
      account: Account;
      user: User;
      profile: GoogleProfile;
    }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        // console.log(account)
        // console.log(user)
        token.accessToken = account.access_token;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.userId = user.id;
      }
      if (profile) {
        // console.log(account)
        // console.log(profile)
        try {
          const db = await connectMongo(); // Make sure connectMongo returns a database connection
          const user: UserType | null = await UserMongo.findOne({
            email: profile.email,
          }); // Use findOne instead of find
          token.name = "0";
          if (user) {
            token.userId = user._id;
            token.name = user.username;
            token.picture = user.image;
          } else {
            console.log("User not found")
          }
        } catch (error) {
          console.log(error);
        }
        token.accessToken = account.access_token;
        token.email = profile.email;
      }
      // console.log(account)
      // console.log(profile)
      // console.log(user)
      // console.log(token)
      return token;
    },
    async session({ session, token }: { session: any, token: TokenSet }) {
      // this token return above jwt()
      session.accessToken = token.accessToken;
      session.user.userId = token.userId;
      //if you want to add user details info
      // console.log(session);
      return session;
    },
    async redirect() {
      return "http://localhost:3000/";
    },

    async signIn({
      account,
      profile,
    }: {
      account: Account | null;
      profile: Profile | undefined;
    }) {
      if (!account) {
        return false
      }
      if (account.provider === "google") {
        if (!profile) {
          return false
        }
        // console.log(account)
        try {
          // console.log("connecting to mongo database")
          const connect = await connectMongo();

          if (connect) {
            // console.log("connected to mongo database")
            const user: UserType | null = await UserMongo.findOne({
              googleId: account.providerAccountId,
            });
            if (!user) {
              // add your user in DB here with profile data (profile.email, profile.name)
              var newUser = new UserMongo({
                email: profile.email,
                nickname: "0",
                username: "0",
                googleId: account.providerAccountId,
                // image: profile.picture,
              });

              newUser.save();
            } else {
              // console.log(user)
            }
            return true;
          }
          return true;
        } catch (error) {
          console.log(error);
        }
      } else if (account.provider === "credentials") {
        return true;
      }
    },
  },

  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/register", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};
