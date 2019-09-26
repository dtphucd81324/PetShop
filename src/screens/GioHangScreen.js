import React, { Component } from 'react';
//import { Header, Left, Right, Container, Body, Icon } from 'native-base';
import { StyleSheet, View, TouchableOpacity, Text, ImageBackground } from 'react-native';


export default class GioHangScreen extends Component {
    static navigationOptions = {
        title: 'Giỏ Hàng',
        // fontWeight: 'bold',
        // tabBarIcon: ({ tintColor }) => {
        //     return <Icon name="cart" style={{ color: tintColor ? '#e91e63' : 'slategray' }}/>
        // }
    };
    constructor(props) {
        super(props);
        this.state = {};
    }
    goBack() {
        const { navigator } = this.props;
        navigator.pop();
    }

    render() {
        //const { goBack } = this.props.navigation;
        return (
            <View>
                <View style={styles.container}>
                    <ImageBackground source={require('../images/shoppingcart.png')} style={{ width: '100%', height: '100%', textAlign: 'center' }}>
                        <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 24 }}>Chưa có sản phẩm trong giỏ hàng</Text>
                    </ImageBackground>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    // textCont: {
    //     fontSize: 20,
    //     color: 'white',
    //     marginLeft: 2,
    //     fontWeight: 'bold'
    // },
    // viewContent: {
    //     flexDirection: 'row',
    //     margin: 5,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     textAlign: 'center'
    // },

});