import { View, TextInput, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

const UserTextInput = ({ placeholder, isPass, setStatValue, setGetEmailValidationStatus }) => {
  const [value, setValue] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [icon, setIcon] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(false);
  
  const handleTextChange = (text) => {
    setValue(text);
    setStatValue(text);  // Use the new text value directly
  
    if (placeholder === 'Email') {  // Correct comparison
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const status = emailRegex.test(text);  // Use text instead of value
        setIsEmailValid(status);
        setGetEmailValidationStatus(status);
    }
  };

  useLayoutEffect(() => {
    switch (placeholder) {
      case "Full Name": 
        setIcon("person");
        break;
      case "Email":
        setIcon("email");
        break;
      case "Password":  // Correct capitalization
        setIcon("lock");
        break;
      default:
        setIcon(null);
        break;
    }
  }, [placeholder]);
  
  return (
    <View 
      className={`border rounded-2xl px-4 py-6 flex-row items-center justify-between 
      space-x-4 my-2 ${!isEmailValid && placeholder === "Email" && value.length > 0 ?
      "border-red-800" : "border-gray-200"
      }`}>
      <MaterialIcons name={icon} size={24} color={"#6c6d83"} />
      <TextInput  
        className="flex-1 text-base text-primaryText font-semibold -mt-1"
        placeholder={placeholder}
        secureTextEntry={isPass && showPass}  // Conditionally set secureTextEntry if it is a password input
        value={value}
        onChangeText={handleTextChange}
        autoCapitalize="none"
      />

      {isPass && (
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <Entypo name={showPass ? "eye" : "eye-with-line"} size={24} color={"#6c6d83"} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UserTextInput;
