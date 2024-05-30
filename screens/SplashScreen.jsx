import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useLayoutEffect } from "react";
import { logo } from "../assets";
import { firebaseAuth, firestoreDB } from "../config/firebase.config";  // Ensure firestoreDB is imported correctly
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { SET_USER } from "../context/actions/userActions";

const SplashScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        checkLoggedUser();
    }, []);  // Ensure the dependency array is empty

    const checkLoggedUser = async () => {
        firebaseAuth.onAuthStateChanged(async (userCred) => {
            if (userCred?.uid) {
                try {
                    const docSnap = await getDoc(doc(firestoreDB, "users", userCred.uid));
                    if (docSnap.exists()) {
                        console.log("User Data:", docSnap.data());
                        dispatch(SET_USER(docSnap.data()));
                    }
                    setTimeout(() => {
                        navigation.replace("HomeScreen");
                    }, 2000);
                } catch (error) {
                    console.error("Error fetching user data: ", error);
                }
            } else {
                navigation.replace("LoginScreen");
            }
        });
    };

    return (
        <View className="flex-1 items-center justify-center space-y-24">
            <Image source={logo} className="w-24 h-24" resizeMode="contain" />
            <ActivityIndicator size={"large"} color={"#43C651"} />
        </View>
    );
};

export default SplashScreen;
