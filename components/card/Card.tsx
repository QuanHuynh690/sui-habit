import { ChallengeType } from "@/shared/type/challenge.type";
import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../icon-button/IconButton";
import CircularProgress from "../progress/CircularProgress";
import { ThemedText } from "../ThemedText";

interface CardProps {
  title: string;
  subTitle?: number | string;
  image?: string;
  actionButton?: () => void;
  actionIcon?: ReactElement;
  progress?: number;
  target: number;
  type: ChallengeType;
}
const Card = (props: CardProps) => {
  const { title, actionIcon, actionButton, progress, target, type } = props;
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <CircularProgress progress={progress} target={target} type={type} />
        <View>
          <ThemedText style={styles.title}>{title}</ThemedText>
          <ThemedText style={styles.subTitle}>
            {progress}/{target}{" "}
            {type === "yoga" || type === "meditation" ? "minutes" : "km"}
          </ThemedText>
        </View>
      </View>
      {actionIcon && (
        <View>
          <IconButton
            icon={actionIcon}
            onPress={actionButton}
            height={36}
            width={36}
          />
        </View>
      )}
    </View>
  );
};

export default Card;
const styles = StyleSheet.create({
  container: {
    height: 64,
    borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    padding: 16,
    borderRadius: 16,
    borderColor: "#E5E7EB", // border-black-10
    backgroundColor: "#FFFFFF",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
  },
  title: {
    fontSize: 14,
    color: "#111827", // text-black-100
    fontWeight: "500",
  },
  subTitle: {
    fontSize: 12,
    color: "#9CA3AF", // text-black-40
  },
});
