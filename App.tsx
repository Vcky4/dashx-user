import React, { useEffect, useContext, useState } from "react";
import { View, Text, StatusBar, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';


import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import AuthStack from "./src/navigation/stacks/AuthStack";
import MainStack from "./src/navigation/stacks/MainStack";
import Splash from "./src/screens/onboarding/Splash";
import colors from "./assets/colors/colors";


const RootNavigator: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Broken!</Text>
    </View>
  }
  const { token, } = authContext
  const [isLoading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 2000) });

  return (
    <NavigationContainer>
      {
        isLoading ? <Splash /> :
          token ? <MainStack /> :
            <AuthStack />}
    </NavigationContainer>
  )
}
export default function App() {
  if (Platform.OS == 'ios') {
    StatusBar.setBarStyle('light-content', true);	//<<--- add this
  }
  return (
    <>
    <View style={{flex:1,backgroundColor:colors.dark.primary,paddingTop:Platform.OS == 'ios'?50:0}}>

      <AuthContextProvider>
        <StatusBar backgroundColor={"#000"} />
        <RootNavigator />
      </AuthContextProvider>
      <Toast />
    </View>
    </>
  );
}