import { Challenge } from "./challenge.type";

export interface Friend {
  id: number;
  name: string;
  point: number;
  profilePicture: string;
}

export interface JoinedChallenge extends Challenge {
  progress: number;
}

export interface CurrentUser {
  id: string;
  firstName: string;
  lastName: string;
  joinedChallenges: JoinedChallenge[];
}
