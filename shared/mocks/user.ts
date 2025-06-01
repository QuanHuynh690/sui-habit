import { CurrentUser } from "../type/profile.type";

export const myUser: CurrentUser = {
  id: "user_123",
  firstName: "Quan",
  lastName: "Huynh",
  joinedChallenges: [
    {
      id: 5,
      name: "Swimming Challenge",
      type: "swimming",
      reward: {
        sui: 0.04,
        badge: "swimming badge",
      },
      location: {
        name: "Cong Hoa Pool",
        coordinate: {
          latitude: 10.80595,
          longitude: 106.6527,
        },
      },
      target: 5,
      participantFee: 0.0023,
      progress: 2.4,
    },
    {
      id: 2,
      name: "Walking Challenge",
      type: "walking",
      reward: {
        sui: 0.02,
        badge: "Walking badge",
      },
      location: {
        name: "Van Lang University",
        coordinate: { latitude: 10.8022, longitude: 106.6565 },
      },
      target: 5,
      participantFee: 0.002,
      progress: 3.5,
    },
  ],
};
