import React, { useEffect } from 'react';
import { SafeAreaView, ImageBackground, Text, StyleSheet } from 'react-native';
import { Button, Layout, Spinner } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux'
import { setFirstTouch, setLeaderBoard, count, setName } from "../../store/actions";
import constants from 'expo-constants'
import ListWinner from '../../components/ListWinner/ListWinner'

export default Finish = ({ navigation }) => {
    const dispatch = useDispatch()
    const winStatus = useSelector(state => state.status)
    const loading = useSelector(state => state.fetchBoardLoading)
    const leaderBoard = useSelector(state => state.leaderBoard)
    const count1 = useSelector(state => state.count1)
    const count2 = useSelector(state => state.count2)
    const name = useSelector(state => state.name)
    let image = {}
    let message = ''
    useEffect(() => {
        if (winStatus == 'solved' && name != '') {
            const data = {
                name,
                description: `Time Remaining ${count2}:${count1}`
            }
            leaderBoard.push(data)
            dispatch(setLeaderBoard(leaderBoard))
            setName('')
        }
    }, [dispatch])
    if ( winStatus == 'solved' ) {
        image = { uri: 'https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/1168877931578467064-512.png'};
        message = 'Congratulation!'
    } else {
        image = { uri: 'https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/12090257911547545090-512.png'};
        message = `Don't be sad Just try again!`
    }
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            { loading ? 
            <Layout style={styles.container}><Spinner style={{ alignSelf: 'center' }} size='giant'/></Layout>
            :
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: constants.statusBarHeight*3 }}>
                <Layout style={{ flex: 2 }}>
                    <ImageBackground 
                        source={image}
                        style={{ 
                            flex: 1,
                            width: 200, height: 200
                        }}
                    >
                    </ImageBackground>
                    <Text style={{ fontSize: 30, fontFamily: 'font1', color: 'white', textAlign: "center" }}>Leaderboard</Text>
                    <ListWinner></ListWinner>
                </Layout>
                <Layout style={{ flex: 1 }}>
                    <Text style={{ fontSize: 30, fontFamily: 'font1', color: 'white' }}>{message}</Text>
                    <Button onPress={() => {setFirstTouch(false); dispatch(count('off'));navigation.replace('Home')}} style={{ marginBottom: 20 }}>Go Home</Button>
                </Layout>
            </Layout>
        }
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: constants.statusBarHeight*3 }
});