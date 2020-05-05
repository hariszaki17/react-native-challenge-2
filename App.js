import 'react-native-gesture-handler';
import *  as Font from 'expo-font'
import React, { useState, useEffect } from 'react';
import { Provider } from "react-redux";
import store from './store/index'
import * as eva from '@eva-design/eva';
import { AppLoading } from "expo";
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AppNavigator from './Navigation/Navigator';

const fetchFont = () => {
  return Font.loadAsync({
    //font1 or 2 can be any name. This'll be used in font-family
    font1: require('./assets/fonts/BalooBhaina2-Regular.ttf')
});
}


export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false)
    if ( !fontsLoaded ) {
      return (
        <AppLoading
        startAsync={fetchFont}
        onFinish={() => setFontsLoaded(true)}
        >
        </AppLoading>
      )
    }
    // useEffect(async () => {
    //   await Font.loadAsync({
    //     //font1 or 2 can be any name. This'll be used in font-family
    //     font1: require('./assets/fonts/BalooBhaina2-Regular.ttf')
    // });
    // setFontsLoaded(true)
    // }, [])
    return (
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack}/>
        <ApplicationProvider {...eva} theme={eva.dark}>
          <AppNavigator/>
        </ApplicationProvider>
      </Provider>
    )
}