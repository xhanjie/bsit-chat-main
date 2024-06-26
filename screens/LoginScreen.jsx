import { View, Text, Image, Dimensions, useAnimatedValue, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { BGImage, logo } from "../assets"
import { UserTextInput } from "../components";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firestoreDB } from "../config/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { SET_USER } from "../context/actions/userActions";

const LoginScreen = () => {
  const screenWidht = Math.round(Dimensions.get("window").width);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const navigation = useNavigation();

  const dispatch = useDispatch();


  const handleLogin = async() =>{
    if (getEmailValidationStatus && email !== "") {
      await signInWithEmailAndPassword(firebaseAuth, email, password).then(
        (userCred) =>{
        if(userCred){
          console.log("User Id:", userCred?.user.uid);
          getDoc(doc(firestoreDB, "users", userCred?.user.uid)).then(
            (docSnap) => {
            if(docSnap.exists()){
              console.log("User Data : ", docSnap.data());
              dispatch(SET_USER(docSnap.data()));
            }
          }
        );
        }
      }
    )
    .catch((err) => {
      console.log("Error : ", err.message);
      if(err.message.includes("invalid-credential")){
        setAlert(true)
        setAlertMessage("Mismatch Credential")
      }else{
        setAlert(true)
        setAlertMessage("Invalid Email Address")
      }
      setInterval(() => {
        setAlert(false);
      }, 2000);
    });
    }
  };
  

  return (
    <View className="flex-1 items-center justify-start">
      <Image source={BGImage} resizeMode="cover" className="h-96" style={{ width: screenWidht }} />
     

     {/* main main */}
      <View className="w-full h-full bg-blue-50 rounded-tl-[90px] -mt-44 flex items-center justify-start py-6 px-6 space-y-6">
        <Image source={logo} className="w-24 h-24" resizeMode="contain" />
        <Text className="py-2 text-primaryText text-xl font-semibold">You Need to Log-in</Text>

        <View className="w-full flex items-center justify-center">
          {/* alert */}

          {alert && (
            <Text className="text-base text-red-600">{alertMessage}</Text>

          )}
          {/*user email */}
         <UserTextInput placeholder="Email" isPass={false} setStatValue={setEmail}
          setGetEmailValidationStatus={setGetEmailValidationStatus} />
          
            {/*user pass */}
         <UserTextInput placeholder="password" isPass={true} setStatValue={setPassword} />
          {/* button */}
         <TouchableOpacity onPress={handleLogin}
          className="w-full px-4 py-2 rounded-xl bg-indigo-600 my-3 
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