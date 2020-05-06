import React from 'react'
import { TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTile, setFirstTouch } from "../../store/actions";


export default Tile = (props) => {
    const { style, index, disabled, value, text } = props
    const dispatch = useDispatch()
    const currentTile = useSelector(state => state.currentTile)
    const firstTouch = useSelector(state => state.firstTouch)
    if (`${currentTile.x},${currentTile.y}` == index && !disabled && firstTouch) {
        style.backgroundColor = 'orange'
    } else if (`${currentTile.x},${currentTile.y}` != index && !disabled && firstTouch) {
        style.backgroundColor = 'yellow'
    } else if (!firstTouch && !disabled) {
        style.backgroundColor = 'yellow'
    }
    const handlePress = (index) => {
        dispatch(setFirstTouch(true))
        const axis = index.split(',')
        console.log(index)
        const payload = {
            x: +axis[0],
            y: +axis[1]
        }
        dispatch(setCurrentTile(payload))
    }
    return (
        <TouchableOpacity onPress={ () => {handlePress(index)} } disabled={disabled} style={style}>
            <Text style={text}>{value}</Text>
        </TouchableOpacity>
    )
}