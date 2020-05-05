import React from 'react'
import Board from '../../components/Board/Board'
import ButtonList from '../../components/ButtonList/ButtonList'
import OptionList from '../../components/OptionList/OptionList'
import { SafeAreaView, StyleSheet } from 'react-native';
import { Layout, TopNavigation, Spinner  } from '@ui-kitten/components';
import { useSelector } from "react-redux";

export default Game = ({ navigation }) => {
    const name = useSelector(state => state.name)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title={name} alignment='center'/>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                <Board></Board>
                <ButtonList></ButtonList>
                <OptionList navigation={navigation}></OptionList>
            </Layout>
        </SafeAreaView>
    )
}