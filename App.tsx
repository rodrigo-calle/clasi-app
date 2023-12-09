import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import ClassificationDetails from "./src/screens/ClassificationDetails";
import SeedsSuplierRegister from "./src/screens/SeedsSuplierRegister";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "./src/server/FirebaseConfig";
import Register from "./src/screens/Register";
import TechnicalRegister from "./src/screens/TechnicalRegister";
import HistoricClassification from "./src/screens/HistoricClassification";
import TaskRegister from "./src/screens/TaskRegister";

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen
        name="Detalles de Clasificación de Semilla"
        component={ClassificationDetails}
      />
      <InsideStack.Screen
        name="Registro de Proveedores de Semilla"
        component={SeedsSuplierRegister}
      />
      <InsideStack.Screen
        name="Registro de Técnicos"
        component={TechnicalRegister}
      />
      <InsideStack.Screen
        name="Historial de Clasificaciónes"
        component={HistoricClassification}
      />
      <InsideStack.Screen name="Registro de Tareas" component={TaskRegister} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen
            name="Inside"
            component={InsideLayout}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
