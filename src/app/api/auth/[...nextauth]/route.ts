import { encrypt } from "@/utils/encryption";
import axios from "axios";
import KeycloakProvider from "next-auth/providers/keycloak";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** Oauth access token */
      token?: object;
    } & DefaultSession["user"];
  }
}

async function refreshAccessToken(token) {
  const resp = await fetch(`${process.env.REFRESH_TOKEN_URL}`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: token.refresh_token,
    } as any),
    method: "POST",
  });
  const refreshToken = await resp.json();
  if (!resp.ok) throw refreshToken;

  return {
    ...token,
    access_token: refreshToken.access_token,
    decoded: jwt_decode(refreshToken.access_token),
    id_token: refreshToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token,
  };
}

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: `${process.env.KEYCLOAK_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}`,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // const currentTimeStamp = Math.floor(Date.now() / 1000);
      if (account) {
        token = { ...account };
        return token;
      }
    },
    async session({ session, token }) {
      if (token) {
        session.access_token = encrypt(token.access_token);
        session.id_token = encrypt(token.id_token);
      }
      return session;
    },
  },
  events: {
    signOut: async ({ token }) => {
      const url = new URL(process.env.NEXTAUTH_LOGOUT_URL || "");
      url.searchParams.append("id_token_hint", token.id_token);
      url.searchParams.append(
        "post_logout_redirect_uri",
        process.env.NEXTAUTH_URL || ""
      );
      await axios.get(url.href);
    },
  },
});

export { handler as GET, handler as POST };

export { handler as authOptions };
