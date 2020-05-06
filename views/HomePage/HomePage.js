import React, { useState, useEffect } from 'react';
import { SafeAreaView, ImageBackground, Text } from 'react-native';
import { Button, Layout, Input } from '@ui-kitten/components';
import { useDispatch } from 'react-redux'
import { setName, setDifficulty, count } from "../../store/actions";
import constants from 'expo-constants'

export default HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const image = { uri: 'https://cdn2.iconfinder.com/data/icons/minimalism/512/Sudoku.png'};
    const [ value, setValue ] = useState('');
    const [ difficulty ] = useState([ 'easy', 'medium', 'hard', 'random' ]);
    useEffect(() => {
        dispatch(count('off'))
    }, [dispatch])
    const navigateGame = (data) => {
        if ( value !=='' ) {
            dispatch(setName(value))
            dispatch(setDifficulty(data))
            setValue('')
            navigation.replace('Game');
        }
    };

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
                <Text style={{ fontSize: 40, fontFamily: 'font1', color: 'white' }}>Sudoku The Game</Text>
            </Layout>
            <Layout
             style={{
                  flex: 1,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  borderRadius: 5
                  }}>
                    <Input
                    placeholder='Input Your Name'
                    value={value}
                    status='warning'
                    onChangeText={nextValue => setValue(nextValue)}
                    style={{ margin: 5, width: '90%' }}
                    />
                    <Layout style={{ display: 'flex', flexDirection: 'row' }}>
                        { difficulty.map(el => <Button status='warning' onPress={() => navigateGame(el)} style={{ margin: 5 }} key={el}>{el}</Button> ) }
                    </Layout>
                
            </Layout>
        </Layout>
        </SafeAreaView>
    );
};