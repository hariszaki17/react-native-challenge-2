import React from 'react';
import { StyleSheet } from 'react-native';
import { List, ListItem } from '@ui-kitten/components';
import { useSelector } from 'react-redux';

// const data = new Array(8).fill({
//   title: 'Item',
// });

export default ListSimpleUsageShowcase = () => {
    const leaderBoard = useSelector(state => state.leaderBoard)
    const renderItem = ({ item }) => (
    <ListItem title={`${item.name}`} description={item.description} style={{ borderRadius: 5, margin: 4 }}/>
    );

    return (
    <List
        style={styles.container}
        data={leaderBoard}
        renderItem={renderItem}
    />
    );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 200,
    marginBottom: 20,
    // paddingHorizontal: 10,
    // paddingBottom: 10,
    borderRadius: 5
  },
});