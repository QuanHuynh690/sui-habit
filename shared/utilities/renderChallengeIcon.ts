import { ChallengeType } from "../type/challenge.type";

export const renderChallengeIcon = (type: ChallengeType) => {
  switch (true) {
    case type === "walking":
      return "figure.walk";
    case type === "yoga":
      return "figure.yoga";
    case type === "running":
      return "figure.run";
    case type === "meditation":
      return "figure.yoga";
    case type === "swimming":
      return "figure.pool.swim";
    default:
      return "figure.walk";
  }
};
