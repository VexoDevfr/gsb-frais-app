import { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../services/authService";

export default function DashboardScreen() {
    const { user, token } = useAuth();
    const [fraisList, setFraisList] = useState([]);
    const [loading, setLoading] = useState(true);
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
  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      <Text>Frais de {user?.prenom_visiteur}</Text>
      <FlatList
        data={fraisList}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => (
          <Text>{item.anneemois} : {item.montantvalide} €</Text>
        )}
      />
    </View>
  );
}
