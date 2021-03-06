/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProfilePage
// ====================================================

export interface ProfilePage_identity_identifiable_Group_can {
  __typename: "GroupCan";
  update: boolean | null;
  follow: boolean | null;
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface ProfilePage_identity_identifiable_Group_user {
  __typename: "User";
  name: string | null;
  href: string | null;
  id: number | null;
  label: string | null;
}

export interface ProfilePage_identity_identifiable_Group_counts {
  __typename: "GroupCounts";
  followers: number | null;
  channels: number | null;
}

export interface ProfilePage_identity_identifiable_Group_users {
  __typename: "User";
  id: number | null;
  label: string | null;
  href: string | null;
}

export interface ProfilePage_identity_identifiable_Group {
  __typename: "Group";
  id: number | null;
  avatar: string | null;
  can: ProfilePage_identity_identifiable_Group_can | null;
  name: string | null;
  href: string | null;
  visibility: string | null;
  /**
   * Are *any* users in the group upgradeable to Premium?
   */
  is_upgradeable: boolean | null;
  about: string | null;
  user: ProfilePage_identity_identifiable_Group_user | null;
  counts: ProfilePage_identity_identifiable_Group_counts | null;
  users: (ProfilePage_identity_identifiable_Group_users | null)[] | null;
  is_current_user_a_member: boolean | null;
  title: string | null;
  description: string | null;
  canonical: string | null;
}

export interface ProfilePage_identity_identifiable_User_can {
  __typename: "UserCan";
  follow: boolean | null;
  manage: boolean | null;
  message: boolean | null;
}

export interface ProfilePage_identity_identifiable_User_counts {
  __typename: "UserCounts";
  followers: number | null;
  following: number | null;
  groups: number | null;
  following_channels: number | null;
  following_users: number | null;
  following_groups: number | null;
  channels: number | null;
  blocks: number | null;
}

export interface ProfilePage_identity_identifiable_User {
  __typename: "User";
  name: string | null;
  href: string | null;
  badge: string | null;
  custom_badge: string | null;
  id: number | null;
  can: ProfilePage_identity_identifiable_User_can | null;
  about: string | null;
  counts: ProfilePage_identity_identifiable_User_counts | null;
  is_me: boolean | null;
  title: string | null;
  description: string | null;
  canonical: string | null;
  is_indexable: boolean | null;
}

export type ProfilePage_identity_identifiable = ProfilePage_identity_identifiable_Group | ProfilePage_identity_identifiable_User;

export interface ProfilePage_identity {
  __typename: "Identity";
  identifiable: ProfilePage_identity_identifiable;
}

export interface ProfilePage {
  identity: ProfilePage_identity | null;
}

export interface ProfilePageVariables {
  id: string;
}
