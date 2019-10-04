
import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Button,
    TouchableOpacity, Image, TextInput, StatusBar, AsyncStorage, ActivityIndicator
} from 'react-native';
//import {createSwitchNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import Homepage from './Homepage';
import Register from './Register';



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
    };

    static navigationOptions = {
        header: null
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}> 
                    <Image style={styles.logo} source={require('../images/logo.jpg')} ></Image>
                    <Text style={styles.title}>Account Infomation</Text>
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
                        <Text style={styles.textRegister}>Chưa có tài khoản?</Text>
                        <TouchableOpacity 
                            onPress={ () => this.props.navigation.navigate('Register') }>
                            <Text style={styles.textRegister}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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

class HomeScreen extends Component {
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <View style={styles.viewContainer}>
                <Homepage />
                <Button onPress={this._logout} title="Logout" />
            </View>
        );
    }

    _logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }
}

class AuthLoadingScreen extends Component {

    constructor(props) {
        super(props);
        this._loadData();
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }

    _loadData = async () => {
        const logged = await AsyncStorage.getItem('logged');
        this.props.navigation.navigate(logged !== '1' ? 'Login' : 'Homepage');
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#455a64',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewContainer:{
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
        alignItems: 'center',
        flexGrow: 1,
    },
    logo: {
        width: 120,
        height: 120
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
        backgroundColor: 'rgba(255,255,255,0.3)',
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
    registerContent:{
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    textRegister:{
        fontSize: 18,
        color: 'white',
        marginRight: 2
    }
}); 