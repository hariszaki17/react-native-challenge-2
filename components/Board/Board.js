import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { fetchBoard, setCurrentTile } from "../../store/actions";


export default function Board(props) {
    const dispatch = useDispatch()
    const [tiles, setTiles] = useState([])
    const handlePress = (index) => {
        const axis = index.split(',')
        console.log(index)
        const payload = {
            x: +axis[0],
            y: +axis[1]
        }
        dispatch(setCurrentTile(payload))
    }
    const board = useSelector((state) => state.board) || [[1]]
    useEffect(() => {
        console.log('haiii <<<<<<<<<<<<<<<<<<<')
        dispatch(fetchBoard())
    }, [dispatch])
    useEffect(() => {
        let tilesTemp = []
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                let disabled = false
                let style = {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 2,
                    width: '10%',
                    height: '10%',
                    backgroundColor: 'yellow'
                }
                if (board[i][j] == 0) {
                    disabled = false
                } else {
                    style.backgroundColor = 'white'
                    disabled = true
                }
                tilesTemp.push(<TouchableOpacity disabled={disabled} onPress={(event) => {event.preventDefault(); handlePress(`${i},${j}`)}} style={style} key={`${i},${j}`}><Text>{board[i][j]}</Text></TouchableOpacity>)
            }
        }
        setTiles(tilesTemp)
    }, [board])
    return ( 
        <View style={styles.container}>{tiles}</View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 1,
        marginBottom: 5
    },
    btnStyle: {
        
    }
});