import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import MainStack from "./src/navigation/MainStack";
import AuthStack from "./src/navigation/AuthStack";
import SplashScreen from "./src/screens/splash/SplashScreen";

export default function App() {

  const [token, setToken] = useState(null); // dummy token
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // simulate app loading
    setTimeout(() => {
      setLoading(false);
    }, 2000);

  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>

      {token ? (
        <MainStack />
      ) : (
        <AuthStack setToken={setToken} />
      )}

    </NavigationContainer>
  );
}