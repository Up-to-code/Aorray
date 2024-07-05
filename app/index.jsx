import { Link, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../lib/GlobelProvider";
export default function App() {
  const { loading, isLogged } = useGlobalContext();
  if (!loading && isLogged) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={styles.container}>
        <View className="  items-center">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-32 h-32"
          />
          <Image
            source={images.cards}
            resizeMode="contain"
            className="max-w-[380px] max-h-[300px] w-full"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
          <CustomButton
            title="Get Started"
            onPress={() => {
              router.push("/sign-in");
            }}
            styles="mt-10 w-3/4"
            textStyles="font "
          />
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            © 2023 Aora. All rights reserved.
          </Text>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    maxHeight: "120%",
    padding: 20,
    paddingTop: 20,
  },
});
