/** biome-ignore-all lint/suspicious/noExplicitAny: values not known */

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

export type Activity = {
  resource_state: number;
  athlete: ActivityAthlete;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  sport_type: string;
  workout_type: any;
  id: number;
  external_id: string;
  upload_id: number;
  start_date: string;
  start_date_local: string;
  timezone: string;
  utc_offset: number;
  start_latlng: any;
  end_latlng: any;
  location_city: any;
  location_state: any;
  location_country: string;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map?: ActivityMap;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  flagged: boolean;
  gear_id: string;
  from_accepted_tag: boolean;
  average_speed: number;
  max_speed: number;
  average_cadence: number;
  average_watts: number;
  weighted_average_watts: number;
  kilojoules: number;
  device_watts: boolean;
  has_heartrate: boolean;
  average_heartrate: number;
  max_heartrate: number;
  max_watts: number;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
  suffer_score: number;
  elev_low: number;
  elev_high: number;
};

type ActivityAthlete = {
  id: number;
  resource_state: number;
};

type ActivityMap = {
  id: string;
  summary_polyline: string;
  resource_state: number;
};

export type Photo = {
  unique_id: string;
  athlete_id: number;
  activity_id: number;
  activity_name: string;
  post_id: any;
  resource_state: number;
  caption: string;
  type: number;
  source: number;
  status: number;
  uploaded_at: string;
  created_at: string;
  created_at_local: string;
  urls: Urls;
  placeholder_image: any;
  sizes: Sizes;
  default_photo: boolean;
  cursor: any;
};

type Urls = {
  [size: string]: string;
};

type Sizes = {
  [size: string]: number[];
};
