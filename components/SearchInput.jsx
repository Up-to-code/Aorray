import { useState } from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ placeholder, initialValue }) => {
  const PathName = usePathname();
  const [query, setQuery] = useState(initialValue || "");

  return (
    <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
      <TextInput
        className="flex-1 text-white font-psemibold text-base"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => {
          setQuery(e);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          if (query == "") {
            return alert("Error", " Please enter a search  text to search") 
          }
          if (PathName.startsWith("/search/"))
            router.setParams({  query });
          else router.push(`/search/${query}`);
        }}
      >
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
