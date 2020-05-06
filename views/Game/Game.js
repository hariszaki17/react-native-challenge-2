import React from 'react'
import Board from '../../components/Board/Board'
import ButtonList from '../../components/ButtonList/ButtonList'
import OptionList from '../../components/OptionList/OptionList'
import CountDown from '../../components/CountDown/CountDown'
import { SafeAreaView } from 'react-native';
import { Layout, TopNavigation, Divider  } from '@ui-kitten/components';
import { useSelector, useDispatch } from "react-redux";
import { solveBoard, setNotification } from "../../store/actions";

export default Game = ({ navigation }) => {
    const dispatch = useDispatch()
    const name = useSelector(state => state.name)
    const count1 = useSelector(state => state.count1)
    const count2 = useSelector(state => state.count2)
    const BoardSolved = useSelector(state => state.board)
    if (count1 == 0 && count2 == 0) {
        dispatch(setNotification(false))
        const solved = { board: BoardSolved }
        dispatch(solveBoard(solved))
        navigation.replace('Finish')
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title={name} alignment='center'/>
            <Divider/>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                <Board></Board>
                <CountDown></CountDown>
                <ButtonList></ButtonList>
                <OptionList navigation={navigation}></OptionList>
            </Layout>
        </SafeAreaView>
    )
}