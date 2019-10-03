import React, { Component } from 'react';
import { Icon, Item, Input, Header, Left, Right, Body, Button } from 'native-base';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


export default class SearchScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ScrollView>
                <Header searchBar rounded >
                    <Item>
                        <Icon name="search" />
                        <Input placeholder="Tìm kiếm sản phẩm" />
                        <Icon name="people" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <View style={{ flex: 1 }}>
                    <View style={styles.container}>

                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginHorizontal: 10
    },
    viewSearch: {
        backgroundColor: 'white',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        //flex : 1
    }
})