
import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    TouchableOpacity, Image, TextInput,
    AsyncStorage, ActivityIndicator, ScrollView
} from 'react-native';
import { Icon, Button, Header, Left, Right, Toast } from 'native-base';
//import {createSwitchNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import { connect } from 'react-redux';
import axios from 'axios';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            passWord: '',
            loading: false,
            errorUserName: false,
            errorPassWord: false,
            showToast: false,
            back: '',
            //tk: null
        }
    };

    check = () => {
        this.state.userName === '' ? this.setState({ errorUserName: true }) : this.setState({ errorUserName: false });
        this.state.passWord === '' ? this.setState({ errorPassWord: true }) : this.setState({ errorPassWord: false });
    }

    componentDidMount(){
        this.setState({back: this.props.navigation.state.params.back});
        
    }

    _signInAsync = async () => {
        this.check();
        if (this.state.userName != '' && this.state.passWord != '') {
            this.setState({ errorUserName: false, errorPassWord: false, });
            const data = {
                kh_taiKhoan: this.state.userName,
                kh_matKhau: this.state.passWord,
            }
             axios.post('http://10.0.2.2:8000/login', { data })
                .then(res => {
                    //console.log(res.data.tk)
                    //console.log(res);
                    if (res.data.error) {
                        this.setState({ errorUserName: true, errorPassWord: true });
                        this.setState({ loading: true });
                        Toast.show({
                            text: "Sai tên đăng nhập hoặc mật khẩu !!!",
                            buttonText: "Okay",
                            buttonTextStyle: { color: "white" },
                            buttonStyle: { backgroundColor: "red" },
                            position: "bottom",
                            type: "danger"
                        })
                    } else {
                        console.log(res.data.kh)
                        Toast.show({
                            text: "Đăng nhập thành công !!!",
                            buttonText: "Okay",
                            buttonTextStyle: { color: "white" },
                            buttonStyle: { backgroundColor: "green" },
                            position: "bottom",
                            type: "success"
                        })
                        this.props.dispatch({ type: 'DANG_NHAP', payload: res.data.kh });
                        this.setState({ loading: true });
                        if(this.state.back === 'ThongTinScreen'){
                            this.props.navigation.navigate('ThongTinScreen')
                        }else if(this.state.back === 'GioHangScreen'){
                            this.props.navigation.navigate('ThanhToan')
                        }
                    }
                }).catch(error => {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <ScrollView>
                <Header transparent>
                    <Left>
                        <Button onPress={() => {
                            if(this.state.back === 'ThongTinScreen'){
                                this.props.navigation.navigate('ThongTinScreen')
                            }else if(this.state.back === 'GioHangScreen'){
                                this.props.navigation.navigate('GioHangScreen')
                            }
                        }} style={{ backgroundColor: '#ff00ff' }}>
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
                            placeholder="Tài khoản"
                            placeholderTextColor="#ffffff"
                            keyboardType="email-address"
                            returnKeyType='next'
                            autoCorrect={false}
                            onChangeText={(userName) => this.setState({ userName })}
                            value={this.state.userName}
                            onSubmitEditing={() => this.refs.txtPassword.focus()}
                        />
                        <TextInput style={styles.inputBox}
                            placeholder="Mật khẩu"
                            returnKeyType='go'
                            secureTextEntry={true}
                            placeholderTextColor="#ffffff"
                            onChangeText={(passWord) => this.setState({ passWord })}
                            value={this.state.passWord}
                            autoCorrect={false}
                            ref={"txtPassword"}
                        />
                        <TouchableOpacity style={styles.button}
                            onPress={this._signInAsync} disabled={this.state.loading}>
                                {
                                    !this.state.loading && <Text style={styles.buttonText}>Đăng nhập</Text>
                                }
                                {
                                    this.state.loading && <ActivityIndicator size="large" color="white" />
                                }
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
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
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
        alignItems: 'center',
        width: '100%',
        height: 120,
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
        marginVertical: 10,
        //marginTop: 50
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

function mapStateToProps(state){
    return{
        hoso: state.hoso
    }
}

export default connect(mapStateToProps)(Login);