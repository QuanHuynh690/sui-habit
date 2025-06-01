import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { CustomButton } from "@/components/button/Button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Challenge } from "@/shared/type/challenge.type";
import { renderChallengeIcon } from "@/shared/utilities/renderChallengeIcon";

const mockDetail: Challenge = {
  id: 2,
  name: "Walking Challenge",
  type: "walking",
  reward: {
    sui: 0.02,
    badge: "Walking badge",
  },
  location: {
    name: "Van Lang University",
    coordinate: {
      latitude: 10.8022,
      longitude: 106.6565,
    },
  },
  target: 5,
  participantFee: 0.002,
};
export default function ChallengeScreen() {
  return (
    <View style={styles.modal}>
      <IconSymbol
        name={renderChallengeIcon(mockDetail?.type)}
        color="#4ca2ff"
        size={56}
      />
      <Text style={{ fontWeight: "bold", fontSize: 28, marginTop: 20 }}>
        {mockDetail?.name}
      </Text>
      <Text style={{ fontSize: 16 }}>{mockDetail?.location?.name}</Text>
      <Text style={{ marginTop: 30 }}>
        You&apos;ll earn{" "}
        <Text style={styles.reward}>{mockDetail?.reward?.sui} SUI</Text> and{" "}
        <Text style={styles.badgeReward}>{mockDetail?.reward?.badge}</Text> when
        you completed this challenge!
      </Text>

      <Text style={{ marginTop: 10 }}>
        You need to spend{" "}
        <Text style={styles.spend}>{mockDetail.participantFee} SUI</Text> to
        join this challenge.
      </Text>

      <View style={{ marginTop: 40 }}>
        <CustomButton
          title="Join challenge"
          variant="primary"
          onPress={() => alert("Joined!")}
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
