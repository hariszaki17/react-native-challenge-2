import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { setBoard } from "../../store/actions";

export default ButtonList = (props) => {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.fetchBoardLoading)
    const firstTouch = useSelector(state => state.firstTouch)
    const items = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j' ]
    const currentTile = useSelector((state) => state.currentTile)
    const board = useSelector((state) => state.board)
    const handlePress = (index) => {
        if ( firstTouch && !loading) {
            let boardTemp = [...board]
            boardTemp[currentTile.x][currentTile.y] = index
            dispatch(setBoard(boardTemp))
        }
    }
    return (
        <View style={styles.container}>
            { items.map((item, index) => {
                return <TouchableOpacity onPress={() => { handlePress(index) }} style={styles.btnStyle} key={item}>
                    <Text style={styles.text}>{index}</Text>
                    </TouchableOpacity>
            }) }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 15,
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingTop: 3,
        padding: 2

    },
    btnStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3,
        width: '18%',
        height: '45%',
        backgroundColor: 'yellow',
        borderRadius: 5
    },
    text: {
        fontSize: 20,
        fontFamily: 'font1',
        textAlign: 'center',
        width: '100%',
        paddingTop: 4
    }
});