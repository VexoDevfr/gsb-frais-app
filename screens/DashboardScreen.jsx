import { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator, Switch, Alert, Platform } from "react-native";
import Navbar from "../components/Navbar";
import FraisCard from "../components/FraisCard";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function DashboardScreen() {
    const { user, token } = useAuth();
    const [fraisList, setFraisList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [filterNonNull, setFilterNonNull] = useState(true);
    const [minMontant, setMinMontant] = useState("");
    useFocusEffect(
        useCallback(() =>{
            const fetchFrais = async () => {
                try {
              const response = await fetch(`${API_URL}frais/liste/${user.id_visiteur}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                console.log("Statut :", response.status, "Frais :", data);
                setFraisList(data);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors du chargement des frais : ", error);
                setLoading(false);
            }
        };
        fetchFrais();
    }, [user, token])
    );
    function handleEdit(id) {
        navigation.navigate("FraisEdit", { id });
    };
    async function deleteFrais(id) {
        try {
            const token = await AsyncStorage.getItem("token");
            await fetch(`${API_URL}frais/suppr`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ id_frais: id }),
            });
            setFraisList(fraisList.filter((f) => f.id_frais !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
        }
    }
    const handleDelete = (id) => {
    const message = "Êtes-vous sûr de vouloir supprimer cette note de frais ?";
    if (Platform.OS === "web") {
        if (window.confirm(message)) deleteFrais(id);
        } else {
            Alert.alert(
            "Confirmation",
                message,
                [
                    { text: "Annuler", style: "cancel" },
                    {
                        text: "Supprimer",
                        style: "destructive",
                        onPress: () => deleteFrais(id),
                    },
                ]
            );
        }
    };
    if (loading) {
      return <ActivityIndicator size="large" style={{ flex: 1 }} />;
    }

    const filteredFrais = fraisList
    .filter((frais) =>
        !filterNonNull || frais.montantvalide !== null
    )
    .filter((frais) =>
        frais.anneemois.includes(searchTerm) ||
         String(frais.id_visiteur).includes(searchTerm)
    )
    .filter((frais) => {
            if (minMontant === "") {
                return true;
            }

            if (frais.montantvalide === null) {
                return false;
            }

            return frais.montantvalide >= Number(minMontant);
        }
      );
    return (
        <View style={{ flex: 1 }}>
            <Navbar />
          <View style={styles.container}>
                <Text>Frais de {user?.prenom_visiteur}</Text>
                <TextInput
                    placeholder="Rechercher par année, mois ou ID visiteur..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    style={styles.searchInput}
                />
                <View style={styles.filterRow}>
                     <Switch
                        value={filterNonNull}
                        onValueChange={setFilterNonNull}
                    />
                    <Text>
                        Afficher seulement les frais avec un montant validé
                    </Text>
                </View>
                <TextInput
                    placeholder="Montant minimum en €"
                    value={minMontant}
                    onChangeText={setMinMontant}
                    style={styles.searchInput}
                />
                <FlatList
                    data={filteredFrais}
                    keyExtractor={(item) => item.id_frais.toString()}
                    renderItem={({ item }) => <FraisCard frais={item} onEdit={handleEdit}/>}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#F4F5F7",
    },
    searchInput: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#DDDDDD",
    },
    filterRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        gap: 8,
    },
});