import Navbar from "../components/Navbar";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { loginStyles as styles } from "../styles/loginStyles.js";
export default function LoginScreen() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { loginUser } = useAuth();
    const handleSubmit = async() => {
        setSubmitting(true);
        setError("");
        try {
            const data = await loginUser(login, password);
        } catch (e) {
            setError(e.message);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <View style={{ flex: 1 }}>
        <Navbar />
        <View style={styles.container}>
        <Text style={styles.title}>Connexion</Text>
        <View>
        <Text>Login :</Text>
        <TextInput
                style={styles.input}
                    value={login}
                    autoCapitalize="non"
                    onChangeText={setLogin}
                /></View>
                <View>
                    <Text>Mot de passe :</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Se connecter</Text>
                </Pressable>
                {error ? <Text style={{ "color": "red" }}>{error}</Text> : null}
            </View>
        </View>
);
}