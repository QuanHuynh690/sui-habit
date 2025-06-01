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
      id: 3,
      name: "Evening Meditation",
      type: "meditation",
      reward: {
        sui: 0.01,
        badge: "Meditation badge",
      },
      location: {
        name: "Duoc Su Pagoda",
        coordinate: {
          latitude: 10.7992,
          longitude: 106.6649,
        },
      },
      target: 60,
      participantFee:0.001,
      progress: 2.4,
    },
  ],
};
