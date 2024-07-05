import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const Trending = ({posts}) => {
    return (
        <View>
            <FlatList
                horizontal
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <Text className="text-white"> {item.title}</Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({})

export default Trending;
