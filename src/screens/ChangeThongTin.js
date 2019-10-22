import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView } from 'react-native';
import { CardItem, Card, Icon, Button, Header, Left, Right } from 'native-base';

export default class ChangeThongTin extends Component {

    constructor(props) {
        super(props);
        //const { name, address, phone } = props.user;
        this.state = {
            txtName: '',
            txtAddress: '',
            txtPhone: ''
        }
    }

    goBackToMain() {
        const { navigator } = this.props;
        navigator.pop();
    }

    render() {
        const { txtName, txtAddress, txtPhone } = this.state;
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
                        <Text style={styles.headerTitle}>Thay đổi thông tin</Text>
                        {/* <View style={styles.edit}>
                            <Icon name="edit" type="AntDesign" size={48} color="#ff00ff" style={{ marginTop: 6, marginLeft: 2 }} />
                        </View> */}
                    </View>
                    <View style={styles.body}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your name"
                            autoCapitalize="none"
                            value={txtName}
                            onChangeText={text => this.setState({ ...this.state, txtName: text })}
                            underlineColorAndroid="transparent"
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your address"
                            autoCapitalize="none"
                            value={txtAddress}
                            onChangeText={text => this.setState({ ...this.state, txtAddress: text })}
                            underlineColorAndroid="transparent"
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your phone number"
                            autoCapitalize="none"
                            value={txtPhone}
                            onChangeText={text => this.setState({ ...this.state, txtPhone: text })}
                            underlineColorAndroid="transparent"
                        />
                        <TouchableOpacity style={styles.signInContainer}>
                            <Text style={styles.signInTextStyle}>Thay đổi</Text>
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
        fontSize: 20,
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
        color: '#FFF', fontFamily: 'Avenir', fontWeight: '600', paddingHorizontal: 20
    },
    signInContainer: {
        marginHorizontal: 20,
        backgroundColor: '#2ABB9C',
        borderRadius: 20,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    signInStyle: {
        flex: 3,
        marginTop: 50
    }
})