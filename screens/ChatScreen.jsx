import { View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView, ActivityIndicator } from "react-native";

import { Entypo, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import React, { useState, useRef, useLayoutEffect } from "react";

import { QuerySnapshot, addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc, snapshotEqual } from "firebase/firestore";
import { firestoreDB } from "../config/firebase.config";
const ChatScreen = ({ route }) => {
    const { room } = route.params;
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user.user);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState(null);

    const textInputRef = useRef(null)

    const handleKeyboardOpen = () =>{

    };

    const sendMessage = async() =>{
        const timeStamp = serverTimestamp()
        const id = `${Date.now()}`
        const _doc= {
            _id : id,
            roomId : room._id,
            timeStamp : timeStamp,
            message : message,
            user : user
        }
        setMessage("");
        await addDoc(collection(doc(firestoreDB, "chats", room._id), "messages"), _doc)
        .then(() =>{}).catch(err => alert(err));
    };

    useLayoutEffect(() => {
    const msgQuery = query(
      collection(firestoreDB, "chats", room?._id, "messages"),
      orderBy("timeStamp", "asc")
    );

    const unsubscribe = onSnapshot(msgQuery, (querySnap) => {
      const upMsg = querySnap.docs.map((doc) => doc.data());
      setMessages(upMsg);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);
  
  return (
     <View className="flex-1">
      <View className="w-full bg-indigo-600 px-4 py-6 flex-[0.2]">
        <View className="flex-row items-center justify-between w-full px-4 py-12">
          {/*back */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="chevron-left" size={28} color={"#fbfbfb"} />
          </TouchableOpacity>
          
          {/*mid */}
            <View className="flex-row items-center justify-center space-x-3">
                <View className="w-12 h-12 rounded-full border border-white flex items-center justify-center">
                    <FontAwesome name="users" size={24} color="#fbfbfb"/>

                </View>
                <View>
                    <Text className="text-gray-50 text-base font-semibold capitalize">
                        {room.chatName.lenght > 16 
                        ? `${room.chatName.slice(0, 16)}..` 
                    : room.chatName}{""}
                    </Text>
                    <Text className="text-gray-100 text-base font-semibold capitalize">online</Text>
                </View>
            </View>
          {/*avat */}
          <View className="flex-row items-center justify-center space-x-3">
         
          </View>
        </View>
      </View>
          <View className="w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-10">
        <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={160}>

            <>
            <ScrollView>
                {isLoading ? (<>
                <View className="w-full flex items-center justify-center">
                    <ActivityIndicator size={"large"} color={"#43C651"}/>
                </View>
                
                </>
                ) : (
                 <>
                {messages?.map((msg, i) => 
                    msg.user.providerData.email === user.providerData.email ? (
                    <>
                <View className="m-1" key={i}>
                    <View style={{ alignSelf: "flex-end" }} 
                    className="px-4 py-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-indigo-300 w-auto relative">
                        <Text className="text-base font-semibold text-white"> {msg.message}</Text>
                    </View>
                   <View style={{ alignSelf: 'flex-end' }}>
      {msg?.timeStamp?.seconds && (
        <Text className="text-[12px] text-black font-semibold">
          {new Date(parseInt(msg.timeStamp.seconds, 10) * 1000).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </Text>
      )}
    </View>
                </View>
                </>)
                : (
             
                <View key={i} style={{ alignSelf: 'flex-start' }} className="flex itens-center justify-start space-x-2">
                    <View className="flex-row items-center justify-center space-x-2">
                        <Image
                        className="w-12 h-12 rounded-full"
                        resizeMode="cover"
                        source={ { uri: msg?.user?.ProfilePic}} />

                         <View className="m-1">
                    <View  
                    className="px-4 py-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-gray-200 w-auto relative">
                        <Text className="text-base font-semibold text-black"> {msg.message}</Text>
                    </View>
                   <View style={{ alignSelf: 'flex-start' }}>
      {msg?.timeStamp?.seconds && (
        <Text className="text-[12px] text-black font-semibold">
          {new Date(parseInt(msg.timeStamp.seconds, 10) * 1000).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </Text>
      )}
    </View>
                </View>
                    </View>
                </View>
                
            ))}
                    
                </>)}
            </ScrollView>

            <View className="w-full flex items-center justify-center px-8">
                <View className="bg-gray-200 rounded-2xl px-4 space-x-4 py-2 flex-row items-center justify-between">
                    <TouchableOpacity onPress={handleKeyboardOpen}>
                        <Entypo name="emoji-happy" size={24} color="#555" />

                    </TouchableOpacity>
                     <TextInput 
                     className="flex-1 h-8 text-base text-primaryText font-semibold"
                     placeholder="Type here..."
                     placeholderTextColor={"#999"}
                     value={message}
                     onChangeText={(text) => setMessage(text)}
                     />   

                     <TouchableOpacity>
                        <Entypo name="mic" size={24} color="#43C651"/>
                     </TouchableOpacity>

                    <View>
                        <TouchableOpacity className="pl-4" onPress={sendMessage} >
                        <FontAwesome name="send" size={24} color="#555" />
                    </TouchableOpacity>
                    </View>
                </View>
                    
            </View>
            </>
        </KeyboardAvoidingView>
           
      {/*boot */}
    </View>
    </View>
  );
};

export default ChatScreen;