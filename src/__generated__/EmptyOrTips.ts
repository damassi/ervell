/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EmptyOrTips
// ====================================================

export interface EmptyOrTips_User {
  __typename: "User";
  id: number | null;
  is_me: boolean | null;
}

export interface EmptyOrTips_Group {
  __typename: "Group";
  id: number | null;
  is_current_user_a_member: boolean | null;
}

export type EmptyOrTips = EmptyOrTips_User | EmptyOrTips_Group;
