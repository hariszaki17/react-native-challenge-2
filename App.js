import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import constants from 'expo-constants'
import Board from './components/Board/Board'
import ButtonList from './components/ButtonList/ButtonList'
import OptionList from './components/OptionList/OptionList'
import { Provider, useDispatch } from "react-redux";
import store from './store/index'

export default function App() {
  
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Board></Board>
        <ButtonList></ButtonList>
        <OptionList></OptionList>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c1f1d',
    alignItems: 'center',
    justifyContent: 'center',
    top: constants.statusBarHeight,
    padding: 10
  },
  text: {
    flex: 1,
    color: 'white'
  }
});
