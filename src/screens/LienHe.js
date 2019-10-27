import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Icon, Button, Header, Left, Right } from 'native-base';


export default class LienHe extends Component {
    render() {
        return (
            <ScrollView>
                <Header transparent>
                    <Left>
                        <Button onPress={() => this.props.navigation.goBack()} style={{ backgroundColor: '#2ABB9C' }}>
                            <Icon name="undo" type="Ionicons" />
                        </Button>
                    </Left>
                    <Right />
                </Header>
                <View>
                    
                </View>
            </ScrollView>
        )
    }
}