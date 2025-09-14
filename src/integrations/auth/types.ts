export type Athlete = {
  id: number;
  username: string;
  resource_state: number;
  firstname: string;
  lastname: string;
  bio: string;
  city: string;
  state: string;
  country: string;
  sex: string;
  premium: boolean;
  summit: boolean;
  created_at: string;
  updated_at: boolean;
  badge_type_id: number;
  weight: number | null;
  profile_medium: string;
  profile: string;
  friend: null;
  follower: null;
};

export type AuthTokenResponse = {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: Athlete;
};
