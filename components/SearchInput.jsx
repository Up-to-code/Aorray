import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (


      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={(e) => {
            handleChangeText(e);
          }}
       
        />
  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={icons.search}
              resizeMode="contain"
              tintColor="#7B7B8B"
              className="w-6 h-5"
            />
          </TouchableOpacity>
      </View>
 
  );
};

export default SearchInput;
