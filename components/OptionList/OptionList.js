import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import { solveBoard, answerBoard, fetchBoard, setFirstTouch, count, setNotification, setAnswered } from "../../store/actions"
import ModalNotification from '../ModalNotification/ModalNotification'

export default OptionList = ({ navigation }) => {
    const dispatch = useDispatch()
    const [ answeredState, setAnsweredState ] = useState(false)
    const [ validate, setValidate ] = useState(false)
    const difficulty = useSelector(state => state.difficulty)
    const loading = useSelector(state => state.fetchBoardLoading)
    const board = useSelector(state => state.board)
    const status = useSelector(state => state.status)
    const boardBase = useSelector(state => state.boardBase)

    useEffect(() => {
        setValidate(false)
        setAnsweredState(false)
        dispatch(setAnswered(false))
        dispatch(setNotification(false))
    }, [dispatch])
    
    useEffect(() => {
        if (status == 'unsolved' && !loading && validate) {
            setValidate(false)
            dispatch(setNotification(true))
        } else if (status == 'solved' && !loading && validate) {
            setValidate(false)
            navigation.replace('Finish')
        }
    }, [dispatch, status, validate, loading])

    const solve = () => {
        if (!loading) {
            console.log(status)
            console.log('test')
            if (!answeredState) {
                const boardSolve = { board: board }
                dispatch(solveBoard(boardSolve))
                setValidate(true)
            } else {
                dispatch(setNotification(true))
            }
        }
    }
    const answer = () => {
        if (!loading) {
            console.log(boardBase, '<<<<<<<<<<<<<<<<<<<<<<<<<')
            dispatch(setAnswered(true))
            dispatch(answerBoard(boardBase))
            setAnsweredState(true)
        }
    }
    const reset = () => {
        if (!loading) {
            dispatch(setAnswered(false))
            dispatch(setFirstTouch(false))
            dispatch(count('off'))
            dispatch(fetchBoard(difficulty))
            setAnsweredState(false)
        }
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
           <ModalNotification navigation={navigation}></ModalNotification>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '15%',
        marginTop: 20,
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
        height: '80%',
        borderRadius: 10
    },
    text: {
        fontFamily: 'font1',
        fontSize: 18,
        color: 'white'
    }
})