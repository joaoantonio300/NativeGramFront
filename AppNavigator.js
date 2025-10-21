import React, {useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromStorage } from "./slices/authSlice";

// Criando um sistema de navegacao onde temos que exportar o navigatorContainer e o createNativeStackNavigator

// Hooks
import { useAuth } from "./hooks/useAuth";

// Redux
import { logout, reset } from "./slices/authSlice";

// Pages
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import EditProfile from "./pages/EditProfile/EditProfile";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CustomHeader({ navigation }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigation.navigate("Login");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginTop: 35,
        paddingVertical: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "#000" }}>
        {user?.name}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons
            name="home-outline"
            size={24}
            color="#000"
            style={{ marginHorizontal: 8 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile", { userId: user._id })}
        >
          <Ionicons
            name="camera-outline"
            size={24}
            color="#000"
            style={{ marginHorizontal: 8 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <Ionicons
            name="person-outline"
            size={24}
            color="#000"
            style={{ marginHorizontal: 8 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color="#000"
            style={{ marginHorizontal: 8 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: (props) => <CustomHeader {...props} />,
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "#999",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const dispatch = useDispatch();
  const { auth, loading } = useAuth();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {auth ? (
          <>
            <Stack.Screen name="Main" component={AppTabs} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
