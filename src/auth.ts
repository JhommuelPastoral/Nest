
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import axiosInstance from "./lib/axios";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub],
  session:{
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks:{
    async signIn({ profile, account }) {
      try {
        if(!profile || !account) return false;
        const {provider} = account;
        const {email, name} = profile;
        if(!email || !name || !provider) return false;
        const response = await axiosInstance.post("/api/auth/create-user", {name, email, provider});
        if(response.status !== 200) return false;
        account.userId = response.data.userId;
        return true;
      } catch (error) {
        console.log("Sign in error:", error);
      }
      return false;
    },

    async jwt({ token, account }) {
      if(!account) return token;
      token.userId = account.userId;
      return token;

    },

    async session({ session, token }) {
      if(!token.userId) return session;
      session.user ={
        ...session.user,
        id: token.userId as string
      }
      return session;

    },

  }
});