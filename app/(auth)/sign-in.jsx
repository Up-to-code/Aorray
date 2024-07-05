import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { Login } from "../../lib/appwrite";
import { useGlobalContext } from "../../lib/GlobelProvider";
const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [Form, setForm] = useState({
    Email: "",
    Password: "",
  });
  const handleSubmit = async () => {
    if (Form.Email === "" || Form.Password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    try {
      const res = await Login(Form.Email, Form.Password);

      setUser(res);
      setIsLogged(true);
    
      if (res) {
        router.replace("/home");
      } else {
        Alert.alert("Error", "Invalid email or password");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View>
      <SafeAreaView className="px-4 my-6 bg-primary h-full">
        <ScrollView className="px-4 ">
          <KeyboardAvoidingView>
            <View className="flex-col justify-center h-[85vh]">
              <Image
                source={images.logo}
                className="w-32 h-22"
                resizeMode="contain"
              />
              <Text className="text-2xl text-white font-psemibold my-4">
                Welcome back
              </Text>

              <FormField
                title={"Email"}
                placeholder={"Enter your Email"}
                email
                keyboardType={"email"}
                name={"email"}
                value={Form.Email}
                handleChangeText={(e) => {
                  setForm({ ...Form, Email: e });
                }}
                otherStyles={"my-6"}
                errorMessage={""}
              />

              <FormField
                title={"Password"}
                placeholder={"Enter your password"}
                keyboardType={"password"}
                name={"password"}
                value={Form.Password}
                handleChangeText={(e) => {
                  setForm({ ...Form, Password: e });
                }}
                otherStyles={"my-6"}
                errorMessage={""}
              />

              <CustomButton
                title={"Sign in"}
                onPress={handleSubmit}
                styles={"bg-secondary-200 mt-6"}
              />
            </View>
          </KeyboardAvoidingView>
          <Text className="text-center text-white font-psemibold my-4">
            Don't have an account? {""}
            <Link href="/sign-up" className="text-secondary-200">
              Sign Up
            </Link>
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SignIn;
