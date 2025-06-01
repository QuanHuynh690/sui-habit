import { useRouter } from "expo-router";
import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import IconButton from "../icon-button/IconButton";
import { IconSymbol } from "../ui/IconSymbol";
interface HeaderProps {
  title: string;
  rightIcon?: ReactElement;
  headerButtonAction?: () => void;
  isBackable?: boolean;
  className?: string;
}
const Header = (props: HeaderProps) => {
  const { title, rightIcon, isBackable, headerButtonAction } = props;
  const router = useRouter();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        {isBackable && (
          <IconButton
            icon={<IconSymbol name="arrow.backward" color="black" />}
            onPress={() => router.back()}
            width={48}
            height={48}
          />
        )}
        <ThemedText type="title">{title}</ThemedText>
      </View>
      {rightIcon && (
        <IconButton
          icon={rightIcon}
          onPress={headerButtonAction}
          width={48}
          height={48}
        />
      )}
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: 144,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: 24,
  },
  headerContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
