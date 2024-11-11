import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { AUTHOR_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

interface GitHubProfile {
  id?: string;
  login?: string;
  bio?: string;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user: { name, email, image }, profile }) {
      const { id, login, bio } = profile as GitHubProfile;
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_GITHUB_ID_QUERY, {
          id,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      // console.log("Token before:", token);
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_GITHUB_ID_QUERY, {
            id: profile?.id,
          });

        if (user) {
          token.id = user?._id;
        }
      }

      // console.log("Token after:", token);

      return token;
    },
    async session({ session, token }) {
      if (typeof token.id === "string") {
        session.id = token.id;
      }
      return session;
    },
  },
});
