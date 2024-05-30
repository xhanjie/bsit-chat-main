import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";

import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import React, { useState } from "react";

import { doc, setDoc } from "firebase/firestore";
import { firestoreDB } from "../config/firebase.config";

const AddToChatScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const [addChat, setAddChat] = useState("");

  const createNewChat = async () =>{
    let id = `${Date.now()}`;

    const _doc = {
        _id: id,
        user: user,
        chatName: addChat,
    };

    if(addChat !== ""){
        setDoc(doc(firestoreDB, "chats", id), _doc).then(() =>{
            setAddChat("");
            navigation.replace("HomeScreen")
        }).catch((err) =>{
            alert("Error :", err);
        });
    }
  };

  return (
    <View className="flex-1">
      <View className="w-full bg-indigo-600 px-4 py-6 flex-[0.25]">
        <View className="flex-row items-center justify-between w-full px-4 py-12">
          {/*back */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="chevron-left" size={28} color={"#fbfbfb"} />
          </TouchableOpacity>
          
          {/*mid */}

          {/*avat */}
          <View className="flex-row items-center justify-center space-x-3">
            <Image 
              source={{ uri: user?.ProfilePic }}
              className="w-12 h-12" 
              resizeMode="contain" />
          </View>
        </View>
      </View>
          <View className="w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-10">

            <View className="w-full px-4 py-4"></View>
            <View className="w-full px-4 flex-row items-center justify-between py-3 rounded-xl border border-gray-200 space-x-3">

                {/*icon */}
                <Ionicons name="chatbubbles" size={30} color={"#777"}/>
                {/*input */}
                <TextInput
                    className="flex-1 text-lg text-primaryText -mt-2 h-12 w-full"
                    placeholder="Create a chat"
                    placeholderTextColor={"#999"}
                    value={addChat}
                    onChangeText={(text) => setAddChat(text)}
                
                />

                   {/*icons */}
                <TouchableOpacity onPress={createNewChat}>
                    <FontAwesome name="send" size={30} color={"#777"}/>
                </TouchableOpacity>
            </View>
          </View>
      {/*boot */}
    
    </View>
  );
};

export default AddToChatScreen;
