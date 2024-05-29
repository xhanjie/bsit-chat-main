import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { BGImage, logo } from "../assets";
import { UserTextInput } from "../components";
import { useNavigation } from "@react-navigation/native";
import { avatars } from "../utils/supports";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../config/firebase.config"; // Correct import

const SignUpScreen = () => {
  const screenWidht = Math.round(Dimensions.get("window").width);
  const screenHeight = Math.round(Dimensions.get("window").height);

  const [email, setEmail] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(avatars[0]?.image.asset.url);
  const [isAvatarMenu, setIsAvatarMenu] = useState(false);

  const navigation = useNavigation();

  const handleAvatar = (item) => {
    setAvatar(item?.image.asset.url);
    setIsAvatarMenu(false);
  };

  const handleSignUp = async () => {
    if (getEmailValidationStatus && email !== "") {
      await createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then(userCred => {
          console.log(userCred.user);
        })
        .catch(error => {
          console.error("Sign up error", error);
        });
    }
  };

  return (
    <View className="flex-1 items-center justify-start">
      <Image source={BGImage} resizeMode="cover" className="h-96" style={{ width: screenWidht }} />
      
      {isAvatarMenu && (
        <View className="absolute inset-0 z-10" style={{ width: screenWidht, height: screenHeight }}>
          <ScrollView>
            <BlurView className="w-full h-full px-4 py-16 flex-row flex-wrap items-center justify-evenly" tint="light" intensity={40} style={{ width: screenWidht, height: screenHeight }}>
              {avatars?.map((item) => (
                <TouchableOpacity onPress={() => handleAvatar(item)} key={item._id} className="w-20 m-3 h-20 p-1 rounded-full border-2 border-indigo-600 relative">
                  <Image source={{ uri: item?.image.asset.url }} className="w-full h-full" resizeMode="contain" />
                </TouchableOpacity>
              ))}
            </BlurView>
          </ScrollView>
        </View>
      )}

      <View className="w-full h-full bg-blue-50 rounded-tl-[90px] -mt-44 flex items-center justify-start py-6 px-6 space-y-6">
        <Image source={logo} className="w-16 h-16" resizeMode="contain" />
        <Text className="py-2 text-primaryText text-xl font-semibold">Sign-up</Text>
        <View className="w-full items-center justify-center relative -my-4">
          <TouchableOpacity onPress={() => setIsAvatarMenu(true)} className="w-16 h-16 p-1 rounded-full border-2 border-indigo-600 relative">
            <Image source={{ uri: avatar }} className="w-full h-full" resizeMode="contain" />
            <View className="w-6 h-6 bg-indigo-600 rounded-full absolute top-0 flex item-center justify-center">
              <MaterialIcons name="edit" size={18} color={"#fff"} />
            </View>
          </TouchableOpacity>
        </View>
        <View className="w-full flex items-center justify-center">
          <UserTextInput placeholder="Full Name" isPass={false} setStatValue={setName} />
          <UserTextInput placeholder="Email" isPass={false} setStatValue={setEmail} setGetEmailValidationStatus={setGetEmailValidationStatus} />
          <UserTextInput placeholder="Password" isPass={true} setStatValue={setPassword} />
          <TouchableOpacity onPress={handleSignUp} className="w-full px-4 py-2 rounded-xl bg-indigo-600 my-3 flex items-center justify-center">
            <Text className="py-2 text-white text-xl font-semibold">Sign Up</Text>
          </TouchableOpacity>
          <View className="w-full py12 flex-row items-center justify-center space-x-2">
            <Text className="text-base text-primaryText">Have an account</Text>
            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
              <Text className="text-base font-semibold text-primaryBold">Login Here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
