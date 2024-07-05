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
import { CreateUser } from "../../lib/appwrite";
import {  useGlobalContext } from "../../lib/GlobelProvider";
const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    UserName: "",
    Email: "",
    Password: "",
  });
  const handleSubmit = async () => {
    if (form.UserName === "" || form.Email === "" || form.Password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setLoading(true);
    try {
      const res = await CreateUser(form.Email, form.Password, form.UserName);
      setLoading(false);
      /// set the user in l  ocal storage
      setUser(res);
      setIsLogged(true);
      router.replace("/home");
    } catch (error) {
      setLoading(false);
      Alert("Error", error.message);
    }
  };

  return (
    <View>
      <SafeAreaView className="px-4 my-6 bg-primary h-full">
        <ScrollView>
          <KeyboardAvoidingView>
            <View className="flex-col justify-center h-[85vh]">
              <Image
                source={images.logo}
                className="w-32 h-22"
                resizeMode="contain"
              />
              <Text className="text-2xl text-white font-psemibold my-4">
                Create an account
              </Text>

              <FormField
                title={"UserName"}
                placeholder={"Enter your UserName"}
                name={"UserName"}
                value={form.UserName}
                handleChangeText={(e) => {
                  setForm({ ...form, UserName: e });
                }}
                errorMessage={""}
              />

              <FormField
                title={"Email"}
                placeholder={"Enter your Email"}
                email
                keyboardType={"email"}
                name={"email"}
                value={form.Email}
                handleChangeText={(e) => {
                  setForm({ ...form, Email: e });
                }}
                errorMessage={""}
                otherStyles={"my-4"}
              />

              <FormField
                title={"Password"}
                placeholder={"Enter your password"}
                keyboardType={"password"}
                name={"password"}
                value={form.Password}
                handleChangeText={(e) => {
                  setForm({ ...form, Password: e });
                }}
                otherStyles={"mb-4"}
                errorMessage={""}
              />

              <CustomButton
                title={"Sign up"}
                onPress={handleSubmit}
                styles={"bg-secondary-200 mt-6"}
                loading={loading}
              />
            </View>
          </KeyboardAvoidingView>
          <Text className="text-center text-white font-psemibold my-4 mb-8">
            Don't have an account?{" "}
            <Link href="/sign-in" className="text-secondary-200">
              Sign-in
            </Link>
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SignUp;
