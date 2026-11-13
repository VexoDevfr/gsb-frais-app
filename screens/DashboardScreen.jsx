import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator, Switch } from "react-native";
import Navbar from "../components/Navbar";
import FraisCard from "../components/FraisCard";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";
export default function DashboardScreen() {
    const { user, token } = useAuth();
    const [fraisList, setFraisList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [filterNonNull, setFilterNonNull] = useState(true);
    const [minMontant, setMinMontant] = useState("");
    useEffect(() => {
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
    }, []);
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
                    renderItem={({ item }) => <FraisCard frais={item} />}
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