import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import t from 'tcomb-form-native';
import Login from './Login';
import App from '../App';

const Form = t.form.Form;
// const Age = t.refinement(t.Number, function (n) { return n >= 18; });

// Age.getValidationErrorMessage = function (value, path, context) {
//     return 'Độ tuổi không đúng quy định' ;
// };
// t.Number.getValidationErrorMessage = function (value, path, context) {
//     if (!value)
//         return 'empty number';
//     else if (!Number.isInteger(value))
//         return 'bad number';
// };

var Gender = t.enums({
    'M': 'Male',
    'F': 'Female'
});

const User = t.struct({
    email: t.String,
    matkhau: t.String,
    sodienthoai: t.Number,
    ngaysinh: t.Date,
    gioitinh: Gender,
});


const formStyles = {
    ...Form.stylesheet,
    formGroup: {
        normal:{
            marginBottom: 10
        },
    },
    controlLabel:{
        normal:{
            color: 'blue',
            fontSize: 18,
            marginBottom: 3,
            fontWeight: '600'
        },
        error:{
            color: 'red',
            fontSize: 18,
            marginBottom: 3,
            fontWeight: '600'
        }
    }
};


const options = {
    order: ['email', 'matkhau', 'sodienthoai', 'ngaysinh','gioitinh'],
    fields: {
        email: {
            placeholder: 'Nhập vào email',
            error: 'Email không đúng!!!'
        },
        matkhau: {
            placeholder: 'Nhập vào mật khẩu',
            error: 'Mật khẩu không đúng!!!',
        },
        sodienthoai: {
            placeholder: 'Nhập vào số điện thoại của bạn!!!',
        },
        ngaysinh:{
            mode: 'date',
        },
        gioitinh:{
            nullOption: {value: '', text: 'Mời bạn chọn giới tính'}
        },
    },
    stylesheet: formStyles,
};


export default class Register extends Component {
    static navigationOptions = {
        header: null,
    };
    handleSubmit = () => {
        const value = this._form.getValue();
        console.log('value: ', value);
    }
    render() {
        //const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.textContainer}>
                    Register your account
                </Text>
                <Form 
                    ref={c => this._form = c}
                    type={User}
                    options={options}
                />               
                <Button
                    style={styles.buttonContainer}
                    title="Đăng ký"
                    onPress={this.handleSubmit}
                />                
                <View style={styles.registerContent}>
                    <Text style={styles.textRegister}>Bạn đã có tài khoản?</Text>
                    <TouchableOpacity 
                        onPress={ () => this.props.navigation.navigate('Login') }>
                        <Text style={styles.textRegister}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    // _login = async () => {
    //     this.props.navigation.navigate('Login');
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: 20,
    },

    textContainer: {
        fontSize: 24,
        textAlign: 'center',
        paddingBottom: 20,
        margin: 10,
        color: '#f7c744',
        fontWeight: 'bold'
    },
    buttonContainer: {
        width: 600,
        height: 400,
        fontSize: 18
    },
    registerContent:{
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    textRegister:{
        fontSize: 18,
        color: 'black',
        marginRight: 2,
        fontWeight: "500"
    }
})