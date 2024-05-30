import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { logo } from "../assets";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { firestoreDB } from "../config/firebase.config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const HomeScreen = () => {
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState(null);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    const chatQuery = query(
      collection(firestoreDB, "chats"),
      orderBy("_id", "desc")
    );

    const unsubscribe = onSnapshot(chatQuery, (querySnapShot) => {
      const chatRooms = querySnapShot.docs.map((doc) => doc.data());
      setChats(chatRooms);
      setIsLoading(false);
    });

    //  Return the unsubscribe funciton to stop listening to the updates
    return unsubscribe;
  }, []);

  return (
    <View className="flex-1">
      <SafeAreaView>
        <View className="w-full flex-row items-center justify-between px-4 py-6">
          <Image source={logo} className="w-12 h-12" resizeMode="contain" />
          <TouchableOpacity className="w-12 h-12 rounded-full border border-indigo-600 flex items-center justify-center">
            <Image source={{ uri: user?.ProfilePic }} className="w-full h-full" resizeMode="cover" />
          </TouchableOpacity>
        </View>
        <ScrollView className="w-full px-4 pt-4">
          <View className="w-full">
            <View className="w-full flex-row items-center justify-between px-2">
              <Text className="text-primaryText text-base font-extrabold pb-2">
                Messages
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("AddToChatScreen")}>
                <Ionicons name="chatbox" size={28} color="#555" />
              </TouchableOpacity>
            </View>
            {isLoading ? (
              <View className="w-full flex items-center justify-center">
                <ActivityIndicator size="large" color="#43C651" />
              </View>
            ) : (
              <>
              {chats && chats?.length > 0 ? (<>
              {chats?.map(room =>(
                <MessageCard key={room._id} room={room} />
              ))}
              </>) : (<></>)}
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const MessageCard = ({room}) => {
  const navigation = useNavigation();
  return (
   <TouchableOpacity  onPress={()=> navigation.navigate("ChatScreen", {room : room})}
   className="w-full flex-row items-center justify-start px-2">
    {/*image */}
    <View className="w-16 h-16 rounded-full flex items-center border-2 border-indigo-600 p-1 justify-center">
      <FontAwesome name="users" size={30} color="#555" />
    </View>
    {/*cont */}
    <View className="flex-1 flex items-start justify-center ml-4">
      <Text className="text-[#333] text-base font-semibold capitalize">{room.chatName}</Text>
      <Text className="text-primaryText text-sm">lami na matolog</Text>

    </View>
    {/*time */}
    <Text className="text-primary px-4 text-base font-semibold">32 min</Text>
    
   </TouchableOpacity>
  );
};

export default HomeScreen;
