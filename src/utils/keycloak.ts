import Keycloak from 'keycloak-js';
import { ENVIRONMENT } from 'config';

let keycloak: Keycloak | null = null;
if (typeof window === 'object' && !keycloak) {
  keycloak = new Keycloak({
    url: ENVIRONMENT.KEYCLOAK_AUTH_URL,
    realm: ENVIRONMENT.KEYCLOAK_REALM as string,
    clientId: ENVIRONMENT.KEYCLOAK_CLIENT_ID as string,
  });
}

export default keycloak;
