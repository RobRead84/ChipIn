import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import * as AuthSession from 'expo-auth-session';
import { LinkedInUser } from '../types';

const LINKEDIN_CLIENT_ID = process.env.EXPO_PUBLIC_LINKEDIN_CLIENT_ID || '';
const LINKEDIN_REDIRECT_URI = AuthSession.makeRedirectUri({ scheme: 'chipin' });

export const linkedInAuth = {
  async login(): Promise<LinkedInUser | null> {
    const authRequest = new AuthSession.AuthRequest({
      clientId: LINKEDIN_CLIENT_ID,
      scopes: ['openid', 'profile', 'email'],
      redirectUri: LINKEDIN_REDIRECT_URI,
      usePKCE: true,
    });

    const discovery = {
      authorizationEndpoint: 'https://www.linkedin.com/oauth/v2/authorization',
      tokenEndpoint: 'https://www.linkedin.com/oauth/v2/accessToken',
    };

    const result = await authRequest.promptAsync(discovery);

    if (result.type === 'success' && result.params.code && authRequest.codeVerifier) {
      const tokenResponse = await AuthSession.exchangeCodeAsync(
        {
          code: result.params.code,
          redirectUri: LINKEDIN_REDIRECT_URI,
          clientId: LINKEDIN_CLIENT_ID,
          extraParams: {
            code_verifier: authRequest.codeVerifier,
          },
        },
        discovery
      );

      await SecureStore.setItemAsync('access_token', tokenResponse.accessToken);

      const userResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
        headers: { Authorization: `Bearer ${tokenResponse.accessToken}` },
      });
      const userInfo = await userResponse.json();

      return {
        sub: userInfo.sub,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
      };
    }

    return null;
  },

  async logout(): Promise<void> {
    await SecureStore.deleteItemAsync('access_token');
  },

  async getStoredToken(): Promise<string | null> {
    return await SecureStore.getItemAsync('access_token');
  },
};
