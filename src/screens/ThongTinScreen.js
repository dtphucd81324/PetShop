import React, { Component } from 'react';
import { Icon } from 'native-base';
import { StyleSheet, View, TouchableOpacity, Text, ImageBackground } from 'react-native';


export default class ThongTinScreen extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../images/husky.jpg')} style={{ width: '100%', height: '100%' }}>

                </ImageBackground>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    textCont: {
        fontSize: 18,
        color: 'white',
        marginLeft: 2,
        fontWeight: 'bold'
    },
    viewContent: {
        flexDirection: 'row',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
});