import React from 'react';
import { SafeAreaView, ImageBackground, Text } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux'
import constants from 'expo-constants'

export default Finish = ({ navigation }) => {
    const winStatus = useSelector(state => state.status)
    let image = {}
    let message = ''
    if ( winStatus == 'solved' ) {
        image = { uri: 'https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/1168877931578467064-512.png'};
        message = 'Congratulation!'
    } else {
        image = { uri: 'https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/12090257911547545090-512.png'};
        message = `Don't be sad Just try again!`
    }
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: constants.statusBarHeight }}>
            <Layout style={{ flex: 2 }}>
                <ImageBackground 
                    source={image}
                    style={{ 
                        flex: 1,
                        width: 300, height: 300
                    }}
                >
                </ImageBackground>
            </Layout>
            <Layout style={{ flex: 1 }}>
                <Text style={{ fontSize: 30, fontFamily: 'font1', color: 'white' }}>{message}</Text>
                <Button onPress={() => navigation.navigate('Home')} style={{ marginBottom: 20 }}>Go Home</Button>
            </Layout>
        </Layout>
        </SafeAreaView>
    );
};