import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";

import MapScreen from "@/components/map-view/MapView";
import { challenges } from "@/shared/mocks/challenges";
import { Challenge } from "@/shared/type/challenge.type";
import { haversineDistance } from "@/shared/utilities/map";

export default function ChallengeScreen() {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [nearby, setNearby] = useState<Challenge[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      const nearbyChallenges = challenges.filter((challenge) => {
        const d = haversineDistance(
          loc.coords.latitude,
          loc.coords.longitude,
          challenge.location.coordinate.latitude,
          challenge.location.coordinate.longitude
        );
        return d <= 3;
      });
      setNearby(nearbyChallenges);
    })();
  }, []);

  if (!location) return <ActivityIndicator style={{ flex: 1 }} />;
console.log(location);

  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>
        Drag the map below to see the nearby challenges and tap to see details
        of the challenge
      </Text>
      <MapScreen
        location={location}
        nearby={nearby}
        onSelectMarker={(challenge) =>
          router.push({
            pathname: "/challenge/[id]",
            params: { id: challenge.id },
          })
        }
      />
      <Modal visible={!!selectedMarker} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000066",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.modal}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {selectedMarker?.name}
            </Text>
            <Text style={{ marginTop: 10 }}>
              You&apos;ll earn{" "}
              <Text style={styles.reward}>
                {selectedMarker?.reward?.sui} SUI
              </Text>{" "}
              and{" "}
              <Text style={styles.badgeReward}>
                {selectedMarker?.reward?.badge}
              </Text>{" "}
              when you completed this challenge!
            </Text>

            <Text style={{ marginTop: 10 }}>
              You need to spend <Text style={styles.reward}>0.001 SUI</Text> to
              join this challenge. Would you like to join this challenge?
            </Text>

            <View style={{ marginTop: 20 }}>
              <Button title="Join challenge" onPress={() => alert("Joined!")} />
              <Button
                title="Cancel"
                onPress={() => setSelectedMarker(null)}
                color={"red"}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    width: "90%",
    alignItems: "center",
  },
  reward: {
    color: "#4ca2ff",
    fontWeight: "bold",
  },
  badgeReward: {
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16,
  },
});
