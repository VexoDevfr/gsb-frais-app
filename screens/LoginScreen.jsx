import Navbar from "../components/Navbar";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { loginStyles } from "../styles/loginStyles";

export default function LoginScreen() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const { loginUser } = useAuth();
    const navigation = useNavigation();
        async function handleSubmit(){
            try {
                await loginUser(login, password);
            } catch (error) {
            Alert.alert("Identifiants incorrects");
            console.log("Erreur de connexion :", error.message);
        }
    };
    return (
        <View style={loginStyles.container}>
            <Navbar />
            <Text style={loginStyles.title}>Connexion</Text>
            <View>
                <Text>Login :</Text>
                <TextInput
                style={loginStyles.input}
                    value={login}
                    onChangeText={setLogin}
                />
                <View>
                    <Text>Password :</Text>
                    <TextInput
                        style={loginStyles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>
                <Pressable style={loginStyles.button} onPress={handleSubmit}>
                    <Text style={loginStyles.buttonText}>Se connecter</Text>
                </Pressable>
            </View>
        </View>
);
}