/**
 * @hanzo/sdk/team — typed client for Hanzo Team.
 *
 * Upstream Go service: https://github.com/hanzoai/team
 *
 * Team membership, roles, invites. Minimal scaffold.
 */

import { BaseClient, ServiceConfig } from '../_shared/client'

export interface TeamConfig extends ServiceConfig {}

export interface Member {
  userId: string
  email: string
  role: 'owner' | 'admin' | 'member' | string
  joinedAt: string
}

export interface Invite {
  id: string
  email: string
  role: string
  invitedBy: string
  expiresAt: string
}

export class TeamClient extends BaseClient {
  constructor(cfg: TeamConfig) {
    super(cfg)
  }

  async listMembers(orgId: string): Promise<Member[]> {
    return this.get<Member[]>('/v1/team/members', { query: { orgId } })
  }

  async invite(orgId: string, email: string, role: string): Promise<Invite> {
    return this.post<Invite>('/v1/team/invites', {
      body: { orgId, email, role },
    })
  }
}
