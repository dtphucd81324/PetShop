import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
import { Icon } from 'native-base';


export default class DangKy extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            matkhau: '',
            nhaplaimatkhau: '',
            status: '',
            wholeResult: '',
        }
    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: 20, justifyContent: 'center' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: 20 }}>
                    <Text style={styles.headerTitle}>Đăng ký tài khoản</Text>
                </View>
                <View style={styles.body}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(email) => this.setState({email})}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Mật khẩu"
                        autoCapitalize="none"
                        value={matkhau}
                        onChangeText={(matkhau) => this.setState({matkhau})}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Nhập lại mật khẩu"
                        autoCapitalize="none"
                        value={nhaplaimatkhau}
                        onChangeText={(nhaplaimatkhau) => this.setState({nhaplaimatkhau})}
                        underlineColorAndroid="transparent"
                    />
                    <TouchableOpacity style={styles.signInContainer} onPress={this.onbtnSavePress}>
                        <Text style={styles.signInTextStyle}>Thay đổi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signInContainer}>
                        <Text style={styles.signInTextStyle}>Hủy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}