
import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    TouchableOpacity, Image, TextInput, StatusBar,
    AsyncStorage, ActivityIndicator, ScrollView
} from 'react-native';
import { Icon, Button, Header, Left, Right } from 'native-base';
//import {createSwitchNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import Homepage from './Homepage';


const userInfo = {
    email: 'admin',
    password: '123456'
}

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        //this._loadData();
    };

    // _loadData = async () => {
    //     const logged = await AsyncStorage.getItem('logged');
    //     this.props.navigation.navigate(logged !== '1' ? 'Login' : 'Homepage');
    // }

    render() {
        return (
            <ScrollView>
                <Header transparent>
                    <Left>
                        <Button onPress={() => this.props.navigation.navigate('ThongTinScreen')} style={{ backgroundColor: '#ff00ff' }}>
                            <Icon name="undo" type="Ionicons" />
                        </Button>
                    </Left>
                    <Right />
                </Header>
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image style={styles.logo} source={require('../images/petshopt.png')} ></Image>
                    </View>
                    <View style={styles.container}>
                        <TextInput style={styles.inputBox}
                            placeholder="Email"
                            placeholderTextColor="#ffffff"
                            keyboardType="email-address"
                            returnKeyType='next'
                            autoCorrect={false}
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}
                            onSubmitEditing={() => this.refs.txtPassword.focus()}
                        />
                        <TextInput style={styles.inputBox}
                            placeholder="Password"
                            returnKeyType='go'
                            secureTextEntry={true}
                            placeholderTextColor="#ffffff"
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password}
                            autoCorrect={false}
                            ref={"txtPassword"}
                        />
                        <TouchableOpacity style={styles.button}
                            onPress={this._login}>
                            <Text style={styles.buttonText}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.registerContent}>
                            <Text style={{ fontSize: 18, marginRight: 5 }}>Chưa có tài khoản?</Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('DangKy')}>
                                <Text style={styles.textRegister}>Đăng ký</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }

    _login = async () => {
        if (userInfo.email === this.state.email && userInfo.password === this.state.password) {
            alert('Login successful!!!');
            await AsyncStorage.setItem('logged', '1');
            this.props.navigation.navigate('Homepage');
        } else {
            alert('Login failed!!!');
        }
    }

}


// class AuthLoadingScreen extends Component {

//     constructor(props) {
//         super(props);

//     }

//     render() {
//         return (
//             <View style={styles.container}>
//                 <ActivityIndicator />
//                 <StatusBar barStyle="default" />
//             </View>
//         );
//     }


// }


const styles = StyleSheet.create({
    container: {
        //backgroundColor: '#455a64',
        backgroundColor: 'white',
        //flexGrow: 1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40
    },
    viewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        margin: 10
    },

    logoContainer: {
        justifyContent: 'flex-end',
        //justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 120,
        //flexGrow: 1,
        flex: 1,
    },
    logo: {
        width: '100%',
        height: 120,
    },

    title: {
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
        opacity: 0.9
    },

    inputBox: {
        width: 300,
        //backgroundColor: 'rgba(255,255,255,0.3)',
        backgroundColor: '#1c313a',
        borderRadius: 25,
        paddingHorizontal: 16,
        color: '#ffffff',
        marginVertical: 10
    },
    button: {
        backgroundColor: '#1c313a',
        borderRadius: 25,
        width: 300,
        paddingVertical: 13,
        marginVertical: 10
    },

    buttonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    registerContent: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    textRegister: {
        fontSize: 18,
        color: '#ff00ff',
        marginRight: 2,
        fontWeight: 'bold'
    }
}); 