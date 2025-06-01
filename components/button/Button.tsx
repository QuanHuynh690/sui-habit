import {
    Button,
    DimensionValue,
    StyleSheet,
    TouchableOpacity
} from "react-native";
export interface ButtonProps {
  title: string;
  variant: "primary" | "outline";
  onPress: () => void;
  width?: DimensionValue | undefined;
  height?: DimensionValue | undefined;
}
export const CustomButton = ({
  title,
  variant,
  width,
  height,
  onPress,
}: ButtonProps) => {
  const styles = StyleSheet.create({
    buttonContainer: {
      backgroundColor: variant === "primary" ? "#4ca2ff" : "white",
      borderRadius: 40,
      width: width,
      height: height,
      paddingHorizontal: 10,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Button title={title} color={variant === "primary" ? "white" : "gray"} />
    </TouchableOpacity>
  );
};
