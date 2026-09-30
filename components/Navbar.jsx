import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
// On renomme l'importation du style pour simplifier l'utilsation dans le code du composant Navbar.
import { navbarStyles as styles } from "../styles/navbarStyles";

function Navbar() {
  // Navbar n'est pas un écran : elle ne reçoit pas la prop navigation
  // automatiquement, d'où l'usage du hook useNavigation().
  const navigation = useNavigation();
  const { user, logoutUser } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Text style={styles.link}>Accueil</Text>
        </Pressable>

        {/* Le bouton Tableau de bord n'apparaît que si l'utilisateur est connecté */}
        {user && (
          <Pressable onPress={() => navigation.navigate("Dashboard")}>
            <Text style={styles.link}>Tableau de bord</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.group}>
        {/* Un seul des deux boutons Connexion / Déconnexion s'affiche */}
        {user ? (
          <Pressable onPress={logoutUser}>
            <Text style={styles.link}>Déconnexion</Text>
          </Pressable>
        ) : (
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Connexion</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default Navbar;
