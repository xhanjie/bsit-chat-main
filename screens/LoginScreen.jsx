import { View, Text, Image, Dimensions, useAnimatedValue, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { BGImage, logo } from "../assets"
import { UserTextInput } from "../components";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const screenWidht = Math.round(Dimensions.get("window").width);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] = useState(false);

  const navigation = useNavigation();
  

  return (
    <View className="flex-1 items-center justify-start">
      <Image source={BGImage} resizeMode="cover" className="h-96" style={{ width: screenWidht }} />
     

     {/* main main */}
      <View className="w-full h-full bg-blue-50 rounded-tl-[90px] -mt-44 flex items-center justify-start py-6 px-6 space-y-6">
        <Image source={logo} className="w-24 h-24" resizeMode="contain" />
        <Text className="py-2 text-primaryText text-xl font-semibold">You Need to Log-in</Text>

        <View className="w-full flex items-center justify-center">
          {/* alert */}

          {/*user email */}
         <UserTextInput placeholder="Email" isPass={false} setStatValue={setEmail}
          setGetEmailValidationStatus={setGetEmailValidationStatus} />
          
            {/*user pass */}
         <UserTextInput placeholder="password" isPass={false} setStatValue={setPassword} />
          {/* button */}
         <TouchableOpacity className="w-full px-4 py-2 rounded-xl bg-indigo-600 my-3 
    flex items-center justify-center">
            <Text className="py-2 text-white text-xl font-semibold">Sign In</Text>
         </TouchableOpacity>
         <View className="w-full py12 flex-row items-center justify-center space-x-2">
          <Text className="text-base text-primaryText">Don't have an account</Text>

          <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen") }>
              <Text className="text-base font-semibold text-primaryBold">Create Here</Text>
          </TouchableOpacity>
         </View>
          
         
        </View>
      </View>
    </View>
  );
};
export default LoginScreen;