import type { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
   // Within authOptions.callbacks.signIn

    async signIn({ user, account, profile }) {
      const allowedAdminEmail = process.env.ADMIN_EMAIL;
    
        if (user.email === allowedAdminEmail) {
          return true;
        }
        return false;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // Set isAdmin flag in JWT based on user email
      const adminEmail = process.env.ADMIN_EMAIL;
      if (user?.email === adminEmail) {
        token.isAdmin = true;
      } else {
        token.isAdmin = false;
      }
      return token;
    },
      async session({ session, token, user }) {
          // Attach a flag to session to indicate admin status

          session.user.isAdmin = token.isAdmin as boolean;
          return session;
      },
  },
};