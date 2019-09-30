import React, { Component } from 'react';
import { Icon } from 'native-base';
import { StyleSheet, View, TouchableOpacity, Text, ImageBackground } from 'react-native';


export default class GioHangScreen extends Component {
    static navigationOptions = {
        title: 'Giỏ Hàng',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="cart" style={{ color: tintColor ? '#e91e63' : 'slategray' }} />
        }
    };
    constructor(props) {
        super(props);
        this.state = {};
    }
    goBack() {
        const { navigation } = this.props;
        navigation.pop();
    }

    render() {
        //const { goBack } = this.props.navigation;
        return (
            <View style={{ flex: 1, textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>
                <ImageBackground source={require('../images/shoppingcart.png')} style={styles.background}>
                    <Text style={styles.viewContent}>Chưa có sản phẩm trong giỏ hàng</Text>
                </ImageBackground>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    viewContent: {
        textAlign: 'center',
        color: 'blue',
        fontSize: 24,
        justifyContent: 'center'
    }
});