import { ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import { AuthProvider, useAuth } from "./context/AuthContext";
import FraisAddScreen from "./screens/FraisAddScreen";
import FraisEditScreen from "./screens/FraisEditScreen";
const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user, sessionLoading } = useAuth();
  if (sessionLoading) {
    return <ActivityIndicator size="large" style={{ flex:1}} />;
  }
  return (
    <Stack.Navigator>
      {user ? (
          <Stack.Group navigationKey="connecte">
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="FraisAdd" component={FraisAddScreen} />
          <Stack.Screen name="FraisEdit" component={FraisEditScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group navigationKey="invite">
          <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
