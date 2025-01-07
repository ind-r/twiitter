import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { Account, Profile, Session, TokenSet, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import connectMongoDB from "@/lib/MongooseConnect";
import { IUser } from "@/types/models/user";
import MUser from "@/lib/models/userModel";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
      nickname?: string | null | undefined;
      bio?: string | null | undefined;
    };
    bio?: string; // for updating bio
    name?: string; // for updating name
    nickname?: string; // for updating nickname
  }
  interface User {
    id: string;
    name: string;
    nickname: string;
    email: string;
    image: string;
    bio: string;
  }
  interface Profile {
    picture?: string;
  }
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
        try {
          if (!credentials) {
            return null;
          }

          const db = await connectMongoDB();

          if (!db) {
            return null;
          }

          let user: IUser | null = null;

          if (credentials.email !== " ") {
            user = await MUser.findOne({
              email: credentials.email,
            });
          } else {
            user = await MUser.findOne({
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

          const userToSubmit: User = {
            id: user._id.toString(),
            name: user.username,
            nickname: user.nickname,
            email: user.email,
            image: user.image,
            bio: user.bio,
          };

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
      session?: Session;
    }) {
      if (account) {
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.userId = user.id;
        token.nickname = user.nickname;
        token.bio = user.bio;

        if (profile) {
          try {
            const db = await connectMongoDB();
            if (!db) {
              console.log("MongoDB connection failed");
            }
            const dbUser: IUser | null = await MUser.findOne({
              email: profile.email,
            });

            if (dbUser) {
              token.userId = dbUser._id;
              token.name = dbUser.username;
              token.nickname = dbUser.nickname;
              token.picture = dbUser.image;
              token.bio = dbUser.bio;
            } else {
              console.log("User not found");
            }
          } catch (error) {
            console.log("Error accessing MongoDB:", error);
          }

          token.email = profile.email;
        }
      }
      if (trigger === "update") {
        if (session && session.name) {
          token.name = session.name;
        }
        if (session && session.nickname) {
          token.nickname = session.nickname;
        }
        if (session && session.bio) {
          token.bio = session.bio;
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: TokenSet }) {
      session.user.name = token.name as string;
      session.user.userId = token.userId as string;
      session.user.nickname = token.nickname as string;
      session.user.bio = token.bio as string;
      session.user.image = token.picture as string;
      return session;
    },

    async redirect() {
      return `/`;
    },

    async signIn({
      account,
      profile,
    }: {
      account: Account | null;
      profile?: Profile | undefined;
    }): Promise<boolean> {
      if (!account) {
        return false;
      }
      if (account.provider === "google") {
        if (!profile) {
          return false;
        }
        try {
          const connect = await connectMongoDB();

          if (!connect) {
            return false;
          }

          const user: IUser | null = await MUser.findOne({
            // googleId: account.providerAccountId,
            email: profile.email,
          });

          if (!user) {
            const newUser = new MUser({
              email: profile.email,
              nickname: "0",
              username: "0",
              bio: "",
              googleId: account.providerAccountId,
              image: profile.picture,
            });

            await newUser.save();
          } else if (!user.googleId) {
            user.googleId = account.providerAccountId;
            user.save();
          }
          return true;
        } catch (error) {
          console.log(error);
          return false;
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
