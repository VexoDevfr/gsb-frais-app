import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator, Switch } from "react-native";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import fraisData from "../data/frais.json";
import FraisCard from "../components/FraisCard";
import { useState, useEffect } from "react";
export default function DashboardScreen() {
    const [fraisList, setFraisList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [filterNonNull, setFilterNonNull] = useState(true);
    const [minMontant, setMinMontant] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setFraisList(fraisData);
            setLoading(false);
        }, 500);
    }, []);
    if (loading) {
        return (
            <ActivityIndicator
                size="large"
                style={{ marginTop: 40 }}
            />
        );
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
    <View style={styles.container}>
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
                renderItem={({ item }) => (
                    <FraisCard frais={item} />
                )}
            />
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