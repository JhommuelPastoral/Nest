
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
        const {email, name} = profile;
        if(!email || !name) return false;
        const response = await axiosInstance.post("/api/auth/create-user", {name, email});
        console.log("Sign in response:", response.data);
        return true;
      } catch (error) {
        console.log("Sign in error:", error);
      }
      return false;
    },
  }
});