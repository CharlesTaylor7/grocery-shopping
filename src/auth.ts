import * as Sentry from "@sentry/browser";
import { NEON_AUTH_URL } from "@/config";

// TODO:
export async function getAccessToken(): Promise<string | null> {
  return await authClient.getJWT();
}

interface Session {
  isPending: boolean,
  data?: {
    session: {},
    user: { name: string }
  }
  error?: {
  }
}

class AuthClient {
  private headers: Headers;
  constructor() {
    this.headers = new Headers({
      'Content-Type': "application/json",
    });
  }

  // TODO: hook
  useSession(): Session {
    return {
      isPending: false,
      error: "Not implemented"
    };
  }

  // TODO: use session storage
  async getJWT(): Promise<string> {
    const url = `${NEON_AUTH_URL}/token`;
    const response = await fetch(url, {
      method: "GET",
      headers: this.headers,
      credentials: "include",
    })
    console.log(response.status);
    Sentry.logger.info(response.statusText)
    const body = await response.text()
    Sentry.logger.info(body)
    return JSON.parse(body).token;
  }

  // TODO: use session storage
  async getSession() {
    const url = `${NEON_AUTH_URL}/get-session`;
    const response = await fetch(url, {
      method: "GET",
      headers: this.headers,
      credentials: "include",
    })
    return await response.json()
  }

  async loginWithEmail(args: { email: string, password: string }) {
    const url = `${NEON_AUTH_URL}/sign-in/email`;

    const response = await fetch(url,
      {
        method: "POST",
        headers: this.headers,
        credentials: "include",
        body: JSON.stringify({
          email: args.email,
          password: args.password,
          rememberMe: true,
        })
      });

    return response.statusText;
  }

  async signupWithEmail(args: { name: string, email: string, password: string }) {
    const url = `${NEON_AUTH_URL}/sign-up/email`;

    const response = await fetch(url,
      {
        method: "POST",
        headers: this.headers,
        credentials: "include",
        body: JSON.stringify({
          name: args.name,
          email: args.email,
          password: args.password,
        })
      });
    return response.statusText;
  }

  async resetPassword(args: { newPassword: string, token: string }) {
    const url = `${NEON_AUTH_URL}/sign-out`;
    const response = await fetch(url,
      {
        method: "POST",
        headers: this.headers,
        credentials: "include",
        body: JSON.stringify({
          newPassword: args.newPassword,
          token: args.token,
        })
      });
    return response.statusText;
  }

  async requestPasswordReset(args: { email: string }) {
    const url = `${NEON_AUTH_URL}/request-password-reset`;
    const response = await fetch(url,
      {
        method: "POST",
        headers: this.headers,
        credentials: "include",
        body: JSON.stringify({
          email: args.email,
          redirectTo: "/grocery-shopping/#/auth/password-reset",
        })
      });
    return response.statusText;
  }

  async signOut() {
    const url = `${NEON_AUTH_URL}/sign-out`;
    const response = await fetch(url,
      {
        method: "POST",
        headers: this.headers,
        credentials: "include",
        body: JSON.stringify({})
      });
    return response.statusText;
  }
}
export type { AuthClient };
export const authClient = new AuthClient();
