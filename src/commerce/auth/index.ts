/**
 * @hanzo/sdk - Authentication helpers
 */

import type { HanzoClient } from '../client'
import type { AuthToken, AuthSession, Customer, LoginCredentials, RegisterCredentials } from '../types'

export class Auth {
  constructor(private client: HanzoClient) {}

  /** Register a new customer account */
  async register(credentials: RegisterCredentials): Promise<AuthToken> {
    return this.client.post<AuthToken>('/auth/customer/emailpass/register', credentials)
  }

  /** Log in with email and password */
  async login(credentials: LoginCredentials): Promise<AuthToken> {
    return this.client.post<AuthToken>('/auth/customer/emailpass', credentials)
  }

  /** Refresh the current session token */
  async refreshToken(): Promise<AuthToken> {
    return this.client.post<AuthToken>('/auth/token/refresh')
  }

  /** Log out the current session */
  async logout(): Promise<void> {
    await this.client.delete('/auth/session')
  }

  /** Get the current authenticated session */
  async getSession(): Promise<AuthSession> {
    return this.client.get<AuthSession>('/auth/session')
  }

  /** Get the currently authenticated customer */
  async me(): Promise<Customer> {
    return this.client.get<Customer>('/auth/customer')
  }

  /** Request a password reset email */
  async requestPasswordReset(email: string): Promise<void> {
    await this.client.post('/auth/customer/emailpass/reset-password', { email })
  }

  /** Complete password reset with token */
  async resetPassword(token: string, password: string): Promise<void> {
    await this.client.post('/auth/customer/emailpass/reset-password/confirm', { token, password })
  }

  /** Verify email with confirmation token */
  async verifyEmail(token: string): Promise<void> {
    await this.client.post('/auth/customer/emailpass/verify', { token })
  }
}
