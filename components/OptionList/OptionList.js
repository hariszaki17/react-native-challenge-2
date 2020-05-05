import React, { useState } from 'react'
import { Modal, Card, Button } from '@ui-kitten/components'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import { solveBoard, answerBoard, fetchBoard } from "../../store/actions"

export default OptionList = ({ navigation }) => {
    const dispatch = useDispatch()
    const [ visible, setVisible ] = useState(false)
    const difficulty = useSelector(state => state.difficulty)
    const board = useSelector(state => state.board)
    const boardBase = useSelector(state => state.boardBase)
    const status = useSelector(state => state.status)
    const solve = () => {
        console.log('test')
        setVisible(true)
        dispatch(solveBoard(board))
    }
    const answer = () => {
        console.log(boardBase, '<<<<<<<<<<<<<<<<<<<<<<<<<')
        setVisible(true)
        dispatch(answerBoard(boardBase))
    }
    const reset = () => {
        dispatch(fetchBoard(difficulty))
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={solve} style={styles.btnSolve}>
                <Text style={styles.text}>Validate</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={answer} style={styles.btnSolve}>
                <Text style={styles.text}>Answer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={reset} style={styles.btnSolve}>
                <Text style={styles.text}>Reset</Text>
            </TouchableOpacity>
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}>
                <Card disabled={true} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, color: 'white', margin: 5, width: '100%', textAlign: 'center' }}>{status}</Text>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', margin: 5 }}>
                        <Button style={{ margin: 2 }} onPress={() => setVisible(false)}>
                            Try Again
                        </Button>
                        <Button style={{ margin: 2 }} onPress={() => {setVisible(false); navigation.navigate('Finish')}}>
                            Next
                        </Button>
                    </View>
                </Card>
            </Modal>
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
        marginTop: 10,
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
        height: '20%',  
        fontFamily: 'font1',
        fontSize: 20
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
    },
    text: {
        fontFamily: 'font1',
        fontSize: 18,
        color: 'white'
    }
})