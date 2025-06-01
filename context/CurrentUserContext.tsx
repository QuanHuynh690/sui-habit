import { myUser } from "@/shared/mocks/user";
import { Challenge } from "@/shared/type/challenge.type";
import { CurrentUser, JoinedChallenge } from "@/shared/type/profile.type";
import React, { createContext, useContext, useState } from "react";

const CurrentUserContext = createContext<{
  currentUser: CurrentUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
  updateProgress: (challengeId: number, newProgress: number) => void;
  joinChallenge: (challenge: Challenge) => void;
} | null>(null);

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }
  return context;
};

export const CurrentUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(myUser);
  const updateProgress = (challengeId: number, newProgress: number) => {
    if (!currentUser) return;
    const updated = currentUser.joinedChallenges.map((ch) =>
      ch.id === challengeId ? { ...ch, progress: newProgress } : ch
    );
    setCurrentUser({ ...currentUser, joinedChallenges: updated });
  };

  const joinChallenge = (challenge: Challenge) => {
    if (!currentUser) return;

    const alreadyJoined = currentUser.joinedChallenges.some(
      (ch) => ch.id === challenge.id
    );
    if (alreadyJoined) return;

    const joinedChallenge: JoinedChallenge = {
      ...challenge,
      progress: 0,
    };

    setCurrentUser({
      ...currentUser,
      joinedChallenges: [...currentUser.joinedChallenges, joinedChallenge],
    });
  };
  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, updateProgress, joinChallenge }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
