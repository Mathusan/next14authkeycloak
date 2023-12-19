import { encrypt } from "@/utils/encryption";
import axios from "axios";
import { DefaultSession, DefaultUser, NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { decode } from "jsonwebtoken";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string;
    refreshToken: string;
  }
  interface User extends DefaultUser {
    sub: string;
  }
  interface ITokenResult {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}

export async function refreshAccessToken(refreshToken: string) {
  const payload = new URLSearchParams({
    client_id: process.env.KEYCLOAK_CLIENT_ID as string,
    client_secret: process.env.KEYCLOAK_CLIENT_SECRET as string,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await axios.post(
    `${process.env.KEYCLOAK_REFRESH_TOKEN_URL}`,
    payload,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  if (!response.data) throw new Error("Unknown error occurred");
  const refreshedTokens = await response.data;

  return accessTokenResults({
    accessToken: refreshedTokens.access_token,
    refreshToken: refreshedTokens.refresh_token,
    idToken: refreshedTokens.id_token,
  });
}

const accessTokenResults = ({
  accessToken,
  refreshToken,
  idToken,
}: {
  accessToken: string;
  refreshToken: string;
  idToken: string;
}) => {
  const decoded: any = decode(accessToken);

  return {
    accessToken,
    refreshToken,
    idToken,
    accessTokenExpires: decoded.exp as number,
  };
};

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID as string,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      issuer: `${process.env.KEYCLOAK_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}`,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // https://next-auth.js.org/configuration/callbacks#jwt-callback
      if (account && profile) {
        const results = accessTokenResults({
          accessToken: account.access_token as string,
          refreshToken: account.refresh_token as string,
          idToken: account.id_token as string,
        });
        // token = {token , ...results}
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
        token.accessTokenExpires = results.accessTokenExpires;
      }

      if (Date.now() < (token.accessTokenExpires as number) * 1000) {
        return token;
      }
      return (await refreshAccessToken(token?.refreshToken as string)) as any;
    },
    async session({ session, token }) {
      const { accessToken } = token as {
        accessToken: string;
      };
      session.accessToken = encrypt(accessToken);
      return session;
    },
  },
  events: {
    signOut: async ({ token }) => {
      const url = new URL(process.env.NEXTAUTH_LOGOUT_URL || "");
      url.searchParams.append("id_token_hint", token.idToken);
      url.searchParams.append(
        "post_logout_redirect_uri",
        process.env.NEXTAUTH_URL || ""
      );
      await axios.get(url.href);
    },
  },
};
