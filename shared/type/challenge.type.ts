import { Float } from "react-native/Libraries/Types/CodegenTypes";

export type ChallengeType =
  | "walking"
  | "yoga"
  | "running"
  | "meditation"
  | "swimming";

export interface Reward {
  sui: Float;
  badge?: string;
}
export interface ChallengeLocation {
  name: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}
export interface Challenge {
  id: number;
  name: string;
  type: ChallengeType;
  reward: Reward;
  location: ChallengeLocation;
  target: number;
  participantFee: Float;
}
