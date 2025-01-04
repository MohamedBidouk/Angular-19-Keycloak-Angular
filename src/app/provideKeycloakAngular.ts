import {
  AutoRefreshTokenService,
  KeycloakService,
  provideKeycloak,
  UserActivityService,
  withAutoRefreshToken
} from 'keycloak-angular';
import {environment} from "../environments/environment.development";

export const provideKeycloakAngular = () =>
  provideKeycloak({
    config: {
      url: environment.keycloakUrl,
      realm: environment.realm,
      clientId: 'angular-app'
    },
    initOptions: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    },
    features: [
      withAutoRefreshToken({
        onInactivityTimeout: 'logout',
        sessionTimeout: 60000
      })
    ],
    providers: [AutoRefreshTokenService, UserActivityService, KeycloakService]
  });
