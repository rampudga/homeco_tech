import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
    Animated,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

// screens
import { Clothes, Home, Electronics, Cart, Login } from "./screens/";
import { images, icons, COLORS, FONTS, SIZES } from './constants';
import { useFonts } from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent",
    },
};

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="App" component={MainApp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const MainApp = ({navigation}) => {

    const [currentTab, setCurrentTab] = useState("Sofas");
    const [showMenu, setShowMenu] = useState(false);
    const offsetValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(1)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;
    const [loaded] = useFonts({
        "CarmenSans-Regular" : require('./assets/fonts/CarmenSans-Regular.otf'),
        "CarmenSans-SemiBold" : require('./assets/fonts/CarmenSans-SemiBold.otf'),
        "CarmenSans-Thin" : require('./assets/fonts/CarmenSans-Thin.otf'),
        "CocoGothic-Bold" : require('./assets/fonts/CocoGothic-Bold.ttf'),
        "CocoGothic": require('./assets/fonts/CocoGothic.ttf'),
    })

    if(!loaded){
        return null;
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ justifyContent: 'flex-start' , padding: 15 }}>
                <Image source={images.profile} style={{
                    width: 100,
                    height: 100,
                    marginTop: 50,
                    marginLeft: 20,
                    borderRadius: 50,
                    borderColor: COLORS.white,
                    borderWidth: 3
                }}></Image>
                 <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                    marginTop: 20
          }}>Welcome</Text>
          <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                    marginTop: 3
                    }}>Grahika Rampudi,</Text>
            <TouchableOpacity>
                    </TouchableOpacity>
                    <View style={{ flexGrow: 1, marginTop: 50 }}>
            {
                // Tab Bar Buttons....
            }
            {TabButton(currentTab, setCurrentTab, "Sofas", images.home, navigation)}
            {TabButton(currentTab, setCurrentTab, "Tables", images.search, navigation)}
            {TabButton(currentTab, setCurrentTab, "Clocks", images.bell, navigation)}
            {TabButton(currentTab, setCurrentTab, "Cart", images.settings, navigation)}
            </View>
            <View>
            {TabButton(currentTab, setCurrentTab, "LogOut", images.logout, navigation)}
            </View>
        </View>
        
      <Animated.View style={{
  flexGrow: 1,
  backgroundColor: 'white',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  paddingHorizontal: 15,
  paddingVertical: 20,
  borderRadius: showMenu ? 15 : 0,
  // Transforming View...
  transform: [
    { scale: scaleValue },
    { translateX: offsetValue }
  ]
}}>
  {
    // Menu Button...
  }
  
  <Animated.View style={{
    transform: [{
      translateY: closeButtonOffset
    }]
    }}>
    <TouchableOpacity onPress={() => {
      Animated.timing(scaleValue, {
        toValue: showMenu ? 1 : 0.88,
        duration: 300,
        useNativeDriver: true
      }).start();

      Animated.timing(offsetValue, {
        // Your Random Value...
        toValue: showMenu ? 0 : 230,
        duration: 300,
        useNativeDriver: true
      }).start();

      Animated.timing(closeButtonOffset, {
        // Your Random Value...
        toValue: !showMenu ? -30 : 0,
        duration: 300,
        useNativeDriver: true
      }).start();

      setShowMenu(!showMenu);
    }}>
      <Image source={showMenu ? images.close : images.menu} style={{
        width: 20,
        height: 20,
        tintColor: 'black',
        marginTop: 40,
      }} />
    </TouchableOpacity>

    {/* <Text style={{
      fontSize: 30,
      fontWeight: 'bold',
      color: 'black',
      paddingTop: 10
    }}>{currentTab}</Text> */}

    <GestureHandlerRootView style={{ flex: 1 }}>
              {currentTab === 'Sofas' && <Home />}
              {currentTab === 'Tables' && <Clothes />}
              {currentTab === 'Clocks' && <Electronics />}
              {currentTab === 'Cart' && <Cart />}
    </GestureHandlerRootView>
  </Animated.View>
</Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b05f37',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
});

const TabButton = (currentTab, setCurrentTab, title, image,navigation) => {
  return (
    <TouchableOpacity onPress={() => {
      if (title == "LogOut") {
        navigation.navigate('Login');
      } else {
        setCurrentTab(title)
      }
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>
        <Image source={image} style={{
          width: 25, height: 25,
          tintColor: currentTab == title ? "#5359D1" : "white"
        }}></Image>
        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab == title ? "#5359D1" : "white"
        }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}



export default () => {
    return <App />;
};
