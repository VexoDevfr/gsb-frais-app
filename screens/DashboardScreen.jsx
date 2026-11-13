import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
View,
Text,
FlatList,
TextInput,
Switch,
ActivityIndicator,
StyleSheet,
Alert,
Platform
} from "react-native";
import FraisCard from "../components/FraisCard";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { getFraisList, deleteFrais } from "../services/fraisService";
export default function DashboardScreen({ navigation }) {
    const { user, token } = useAuth();
    const [fraisList, setFraisList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [filterNonNull, setFilterNonNull] = useState(true);
    const [minMontant, setMinMontant] = useState("");
    const [error, setError] = useState("");
    useFocusEffect(
        useCallback(() =>{
            const fetchFrais = async () => {
                try {
setFraisList(await getFraisList(user.id_visiteur, token));
setError("");
} catch (err) {
console.error("Erreur lors de la récupération des frais :", err);
setError(err.message);
} finally {
setLoading(false);
}
        };
        fetchFrais();
    }, [user, token])
    );
    function handleEdit(id) {
        navigation.navigate("FraisEdit", { id });
    };
    async function removeFrais(id) {
try {
await deleteFrais(id, token);
setFraisList((prev) => prev.filter((f) => f.id_frais !== id));
} catch (error) {
Alert.alert("Erreur lors de la suppression :", error.message);
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
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <FlatList
                    data={filteredFrais}
                    keyExtractor={(item) => item.id_frais.toString()}
                    renderItem={({ item }) => <FraisCard frais={item} onEdit={handleEdit} onDelete={handleDelete} />}
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
    error: {
        color: "red",
        marginBottom: 12,
    },
});