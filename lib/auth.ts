import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials?.email });
        console.log("user found",user)
        if (!user) {
          console.log("no user found")
          return null;
        }
        const valid = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!valid) {
          console.log("invalid password")
          return null
        };

        return { id: user._id, email: user.email };
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },

    async session({ session, token }) {
      if (token) session.user.id = token.id;
      return session;
    }
  },

  secret: process.env.NEXTAUTH_SECRET,
};
