import { auth } from "@/components/common/auth/auth";
import { decrypt } from "./encryption";

export async function getAccessToken() {
  const session = await auth();
  if (session) {
    const accessTokenDecrypted = decrypt(session.accessToken);
    return accessTokenDecrypted;
  }
  return null;
}

export async function getIdToken() {
  const session = await auth();
  if (session) {
    const idTokenDecrypted = decrypt(session.idToken);
    return idTokenDecrypted;
  }
  return null;
}
