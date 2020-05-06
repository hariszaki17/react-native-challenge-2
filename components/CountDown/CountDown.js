import React from 'react'
import { Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default CountDown = () => {
    const count1 = useSelector(state => state.count1)
    const count2 = useSelector(state => state.count2)
    let second = '0'
    if (count1 < 10) {
        second = `0${count1}`
    } else {
        second = count1
    }
    return (
        <Text style={styles.text}>{ `0${count2}:${second}` }</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'font2',
        fontSize: 20,
        color: 'white',
        textAlignVertical: 'center',
        paddingTop: 10
    }
})