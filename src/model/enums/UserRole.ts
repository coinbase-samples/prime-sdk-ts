/**
 * - USER_ROLE_UNKNOWN: nil value  - AUDITOR: An auditor  - SIGNATORY: A signatory  - ADMIN: An admin  - INITIATOR: An initiator  - REVIEWER: A reviewer  - TRADER: A trader  - FULL_TRADER: A trader with full permissions  - TEAM_MANAGER: A team manager  - APPROVER: An approver
 */
export enum UserRole {
  UserRoleUnknown = 'USER_ROLE_UNKNOWN',
  Auditor = 'AUDITOR',
  Signatory = 'SIGNATORY',
  Admin = 'ADMIN',
  Initiator = 'INITIATOR',
  Reviewer = 'REVIEWER',
  Trader = 'TRADER',
  FullTrader = 'FULL_TRADER',
  TeamManager = 'TEAM_MANAGER',
  Approver = 'APPROVER',
}
