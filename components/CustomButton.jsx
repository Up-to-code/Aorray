import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomButton = ({ title, onPress, styles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`bg-secondary-200 rounded-xl  min-h-[62px] items-center justify-center px-4   ${styles}  ${
        isLoading ? "opacity-50" : ""
      }`}
    >
      <View>
        <Text className={`text-primary font-pmedium text-lg ${textStyles}`}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default CustomButton;
