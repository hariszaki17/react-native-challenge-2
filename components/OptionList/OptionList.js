import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { solveBoard, answerBoard, fetchBoard } from "../../store/actions";

export default OptionList = () => {
    const dispatch = useDispatch()
    const board = useSelector(state => state.board)
    const boardBase = useSelector(state => state.boardBase)
    const status = useSelector(state => state.status)
    const solve = () => {
        console.log('test')
        dispatch(solveBoard(board))
    }
    const answer = () => {
        dispatch(answerBoard(boardBase))
    }
    const reset = () => {
        dispatch(fetchBoard())
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={solve} style={styles.btnSolve}>
                <Text>Validate</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={answer} style={styles.btnSolve}>
                <Text>Answer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={reset} style={styles.btnSolve}>
                <Text>Reset</Text>
            </TouchableOpacity>
            <View style={styles.status}>
                <Text>{status}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        width: '100%',
        height: '100%',
        marginVertical: 20,
        bottom: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 6

    },
    status: {
        flex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        height: '20%'
    },
    btnSolve: {
        flex: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
        margin: 5,
        height: '60%',
        borderRadius: 10
    }
})