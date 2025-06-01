import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { CustomButton } from "@/components/button/Button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useCurrentUser } from "@/context/CurrentUserContext";
import { useSelectedChallenge } from "@/context/SelectedChallengeContext";
import { renderChallengeIcon } from "@/shared/utilities/renderChallengeIcon";
import { useRouter } from "expo-router";

export default function ChallengeScreen() {
  const user = useCurrentUser();
  const router = useRouter();
  const challenge = useSelectedChallenge();
  return (
    <View style={styles.modal}>
      <IconSymbol
        name={renderChallengeIcon(
          challenge.selectedChallenge?.type || "walking"
        )}
        color="#4ca2ff"
        size={56}
      />
      <Text style={{ fontWeight: "bold", fontSize: 28, marginTop: 20 }}>
        {challenge.selectedChallenge?.name}
      </Text>
      <Text style={{ fontSize: 16 }}>
        {challenge.selectedChallenge?.location?.name}
      </Text>
      <Text style={{ marginTop: 30 }}>
        You&apos;ll earn{" "}
        <Text style={styles.reward}>
          {challenge.selectedChallenge?.reward?.sui} SUI
        </Text>{" "}
        and{" "}
        <Text style={styles.badgeReward}>
          {challenge.selectedChallenge?.reward?.badge}
        </Text>{" "}
        when you completed this challenge!
      </Text>

      <Text style={{ marginTop: 10 }}>
        You need to spend{" "}
        <Text style={styles.spend}>
          {challenge.selectedChallenge?.participantFee} SUI
        </Text>{" "}
        to join this challenge.
      </Text>

      <View style={{ marginTop: 40 }}>
        <CustomButton
          title="Join challenge"
          variant="primary"
          onPress={() => {
            user.joinChallenge(challenge.selectedChallenge);
            router.push("/");
          }}
          width={250}
          height={46}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  modal: {
    padding: 32,
    borderRadius: 12,
    alignItems: "center",
  },
  spend: {
    color: "red",
    fontWeight: "bold",
  },
  reward: {
    color: "#4ca2ff",
    fontWeight: "bold",
  },
  badgeReward: {
    textTransform: "capitalize",
    fontWeight: "bold",
    color: "#FEA800",
  },
  subTitle: {
    fontSize: 16,
  },
});
