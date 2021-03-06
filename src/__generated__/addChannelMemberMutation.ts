/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MemberTypes } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addChannelMemberMutation
// ====================================================

export interface addChannelMemberMutation_add_channel_members_channel_counts {
  __typename: "ChannelCounts";
  collaborators: number | null;
}

export interface addChannelMemberMutation_add_channel_members_channel_collaborators_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface addChannelMemberMutation_add_channel_members_channel_collaborators_Group_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface addChannelMemberMutation_add_channel_members_channel_collaborators_Group_users {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface addChannelMemberMutation_add_channel_members_channel_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface addChannelMemberMutation_add_channel_members_channel_collaborators_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
  visibility: string | null;
  user: addChannelMemberMutation_add_channel_members_channel_collaborators_Group_user | null;
  description: string | null;
  users: (addChannelMemberMutation_add_channel_members_channel_collaborators_Group_users | null)[] | null;
  can: addChannelMemberMutation_add_channel_members_channel_collaborators_Group_can | null;
}

export type addChannelMemberMutation_add_channel_members_channel_collaborators = addChannelMemberMutation_add_channel_members_channel_collaborators_User | addChannelMemberMutation_add_channel_members_channel_collaborators_Group;

export interface addChannelMemberMutation_add_channel_members_channel_memberships_member_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface addChannelMemberMutation_add_channel_members_channel_memberships_member_Group_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface addChannelMemberMutation_add_channel_members_channel_memberships_member_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
  visibility: string | null;
  user: addChannelMemberMutation_add_channel_members_channel_memberships_member_Group_user | null;
}

export type addChannelMemberMutation_add_channel_members_channel_memberships_member = addChannelMemberMutation_add_channel_members_channel_memberships_member_User | addChannelMemberMutation_add_channel_members_channel_memberships_member_Group;

export interface addChannelMemberMutation_add_channel_members_channel_memberships_can {
  __typename: "ChannelMembershipCan";
  manage: boolean | null;
}

export interface addChannelMemberMutation_add_channel_members_channel_memberships {
  __typename: "ChannelMembership";
  id: number | null;
  member: addChannelMemberMutation_add_channel_members_channel_memberships_member | null;
  can: addChannelMemberMutation_add_channel_members_channel_memberships_can | null;
}

export interface addChannelMemberMutation_add_channel_members_channel_can {
  __typename: "ChannelCan";
  manage_collaborators: boolean | null;
}

export interface addChannelMemberMutation_add_channel_members_channel {
  __typename: "Channel";
  id: number | null;
  counts: addChannelMemberMutation_add_channel_members_channel_counts | null;
  collaborators: (addChannelMemberMutation_add_channel_members_channel_collaborators | null)[] | null;
  memberships: (addChannelMemberMutation_add_channel_members_channel_memberships | null)[] | null;
  can: addChannelMemberMutation_add_channel_members_channel_can | null;
}

export interface addChannelMemberMutation_add_channel_members {
  __typename: "AddChannelMembersPayload";
  channel: addChannelMemberMutation_add_channel_members_channel | null;
}

export interface addChannelMemberMutation {
  add_channel_members: addChannelMemberMutation_add_channel_members | null;
}

export interface addChannelMemberMutationVariables {
  channel_id: string;
  member_id: string;
  member_type?: MemberTypes | null;
}
