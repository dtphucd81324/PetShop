import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Icon, Button, Header, Left, Right } from 'native-base';

export default class ChangeThongTin extends Component {

    constructor(props) {
        super(props);
        //const { name, address, phone } = props.user;
        this.state = {
            matkhaucu: '',
            matkhaumoi: '',
            nhaplaimatkhau: ''
        }
    }

    onbtnSavePress() {
        if (this.state.matkhaucu.trim().length == 0) {
            alert('Vui lòng nhập mật khẩu cũ');
            console.log("Vui lòng nhập mật khẩu cũ");
        } else if (this.state.matkhaumoi.trim().length == 0) {
            alert('Vui lòng nhập mật khẩu mới');
            console.log("Vui lòng nhập mật khẩu mới");
        } else if (this.state.matkhaumoi != this.state.nhaplaimatkhau) {
            alert('Vui lòng kiểm tra lại mật khẩu vừa nhập')
            console.log("Vui lòng kiểm tra lại mật khẩu vừa nhập");
        } else if (this.state.matkhaumoi === this.state.matkhaucu){
            alert('Mật khẩu này đã được sử dụng. Vui lòng nhập lại mật khẩu khác !!!');
            console.log("Error");
        }
         else {
            Keyboard.dismiss();
            this.changePassword();
        }
    }

    changePassword = () => {
        if(this.state.nhaplaimatkhau === this.state.matkhaumoi && this.state.matkhaumoi != this.state.matkhaucu){
            this.setState({ matkhaucu: matkhaumoi })
        } else{
            alert("Vùi lòng kiểm tra lại mật khẩu !!!")
        }
    }

    
    render() {
        const { matkhaucu, matkhaumoi, nhaplaimatkhau } = this.state;
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
                <View style={{ flex: 1, marginTop: 20, justifyContent: 'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: 20 }}>
                        <Text style={styles.headerTitle}>Thay đổi mật khẩu</Text>
                    </View>
                    <View style={styles.body}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Mật khẩu cũ"
                            autoCapitalize="none"
                            value={matkhaucu}
                            onChangeText={text => this.setState({ ...this.state, matkhaucu: text })}
                            underlineColorAndroid="transparent"
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Mật khẩu mới"
                            autoCapitalize="none"
                            value={matkhaumoi}
                            onChangeText={text => this.setState({ ...this.state, matkhaumoi: text })}
                            underlineColorAndroid="transparent"
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Nhập lại mật khẩu mới"
                            autoCapitalize="none"
                            value={nhaplaimatkhau}
                            onChangeText={text => this.setState({ ...this.state, nhaplaimatkhau: text })}
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
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    header: {
        flex: 1, 
        backgroundColor: '#2ABB9C',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    headerTitle: {
        fontFamily: 'Avenir',
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold'
    },
    edit: {
        backgroundColor: "#ff00ff",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    body: {
        flex: 10,
        backgroundColor: '#F6F6F6',
        justifyContent: 'center'
    },
    textInput: {
        height: 45,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Avenir',
        paddingLeft: 20,
        borderRadius: 20,
        marginBottom: 20,
        borderColor: '#2ABB9C',
        borderWidth: 1
    },
    signInTextStyle: {
        color: '#FFF', 
        fontFamily: 'Avenir',
        fontSize: 20, 
        fontWeight: 'bold', 
        paddingHorizontal: 20
    },
    signInContainer: {
        marginHorizontal: 20,
        backgroundColor: '#2ABB9C',
        borderRadius: 20,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        marginBottom: 10
    },
    signInStyle: {
        flex: 3,
        marginTop: 50
    }
})