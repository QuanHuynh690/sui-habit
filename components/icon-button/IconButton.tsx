import { ReactElement } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
interface IconButtonProps {
  icon: ReactElement;
  width?: number;
  height?: number;
  bgColor?: string;
  onPress?: () => void;
}
const IconButton = (props: IconButtonProps) => {
  const { icon, onPress, width, height, bgColor } = props;
  const styles = StyleSheet.create({
    iconButton: {
      width: width,
      height: height,
      backgroundColor: bgColor,
      borderRadius: width ? width / 3 : 12,
      borderWidth: 1,
      borderColor: "rgba(0, 0, 0, 0.1)",
      padding: 6,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return (
    <TouchableOpacity
      style={styles.iconButton}
      onPress={onPress}
    >
      {icon}
    </TouchableOpacity>
  );
};

export default IconButton;
