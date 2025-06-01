import { Challenge } from "@/shared/type/challenge.type";
import React, { createContext, useContext, useState } from "react";

const SelectedChallengeContext = createContext<{
  selectedChallenge: Challenge | null;
  setSelectedChallenge: React.Dispatch<React.SetStateAction<Challenge | null>>;
} | null>(null);

export const useSelectedChallenge = () => {
  const context = useContext(SelectedChallengeContext);
  if (!context) {
    throw new Error(
      "useSelectedChallenge must be used within a SelectedChallengeProvider"
    );
  }
  return context;
};

export const SelectedChallengeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );

  return (
    <SelectedChallengeContext.Provider
      value={{ selectedChallenge, setSelectedChallenge }}
    >
      {children}
    </SelectedChallengeContext.Provider>
  );
};
