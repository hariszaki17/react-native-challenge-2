import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Modal, Card, Button } from '@ui-kitten/components'
import { count, setNotification } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

export default ModalNotification = (props) => {
    const dispatch = useDispatch()
    const status = useSelector(state => state.notification)
    const answered = useSelector(state => state.answered)
    const { navigation } = props
    return (
        <Modal
            visible={status}
            onBackdropPress={() => dispatch(setNotification(false))}>
            <Card disabled={true} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                { answered ? 
                <View style={styles.view}>
                    <Text style={styles.text}>You've Just see the Answer, Please Reset!</Text>
                </View> 
                : 
                <View style={styles.view}>
                    <Text style={styles.text}>Your Answer is still incorrect.</Text>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Button style={{ margin: 5 }} onPress={() => dispatch(setNotification(false))}>
                            Try Again
                        </Button>
                        <Button style={{ margin: 5 }} onPress={() => {dispatch(count('off')); dispatch(setNotification(false)); navigation.replace('Finish')}}>
                            Next
                        </Button>
                    </View>
                </View> }
                
            </Card>
        </Modal>
    )
}

const styles = StyleSheet.create({
    view: { 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'font1'
    }
})