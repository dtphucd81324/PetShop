import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView, Toast } from 'react-native';
import { Icon, Button, Header, Left, Right, Item, Input, DatePicker } from 'native-base';
import { connect } from 'react-redux';
import axios from 'axios';


class LienHe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            passWord: '',
            address: '',
            name: '',
            phone: '',
            mail: '',
            birthDate: new Date(),
            sex: null,
            errorPassword: false,
            errorAddress: false,
            errorName: false,
            errorMail: false,
            errorPhone: false,
            isLoading: true,
            loading: false
        }
    }

    kiemtra = () => {
        let error = true;

        this.state.passWord === '' ? this.setState({ errorPassword: true }) : this.setState({ errorPassword: false });
        this.state.address === '' ? this.setState({ errorAddress: true }) : this.setState({ errorAddress: false });
        this.state.name === '' ? this.setState({ errorName: true }) : this.setState({ errorName: false });
        this.state.phone === '' ? this.setState({ errorPhone: true }) : this.setState({ errorPhone: false });
        this.state.mail === '' ? this.setState({ errorMail: true }) : this.setState({ errorMail: false });
        if (this.state.address == '' || this.state.name == '' || this.state.phone == '' || this.state.mail == '') {
            return error
        } else {
            error = false;
            return error;
        }
    }

    getData = () => {
        return fetch("http://10.0.2.2:8000/thongtinkh/" + this.props.hoso[0].kh_taiKhoan, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            return response.json();
        }).then((responseJson) => {
            console.log(responseJson)
            this.setState({
                userName: responseJson.kh['kh_taiKhoan'],
                //matkhaumoi: responseJson.kh['kh_matKhau'],
                name: responseJson.kh['kh_hoTen'],
                birthDate: responseJson.kh['kh_ngaySinh'],
                sex: responseJson.kh['kh_gioiTinh'],
                phone: responseJson.kh['kh_dienThoai'],
                mail: responseJson.kh['kh_email'],
                address: responseJson.kh['kh_diaChi']
            })
        }).catch((error) => {
            console.log(error);
            this.getData();
        })
    }

    async componentDidMount() {
        await this.getData();
        this.setState({ isLoading: false })
    }

    sendData = () => {
        const validation = this.kiemtra();
        if (validation == false) {
            this.setState({ loading: true })
            const data = {
                kh_taiKhoan: this.state.userName,
                kh_matKhau: this.state.passWord,
                kh_hoTen: this.state.name,
                kh_diaChi: this.state.address,
                kh_email: this.state.mail,
                kh_dienThoai: this.state.phone,
                kh_ngaySinh: this.state.birthDate,
                kh_gioiTinh: this.state.sex,
            }
            axios.post('http://10.0.2.2:8000/capnhatthongtin', { data })
                .then(res => {
                    console.log(res.data.kh);
                    if (res.error) {
                        //console.log(res.data.kh);
                        this.setState({ loading: false })
                        Toast.show({
                            text: "Cập nhật không thành công",
                            buttonText: "Okay",
                            buttonTextStyle: { color: "white" },
                            buttonStyle: { backgroundColor: "red" },
                            position: "bottom",
                            type: "danger"
                        })
                        //this.props.dispatch({ type: 'DANG_XUAT' });

                    }
                    else {
                        Toast.show({
                            text: "Cập nhật thành công",
                            buttonText: "Okay",
                            buttonTextStyle: { color: "white" },
                            buttonStyle: { backgroundColor: "green" },
                            position: "bottom",
                            type: "success"
                        })
                        this.props.navigation.navigate('ThongTinScreen');
                    }

                }).catch(error => {
                    console.log(error);
                    this.setState({ loading: false });
                    Toast.show({
                        text: "Cập nhật không thành công",
                        buttonText: "Okay",
                        buttonTextStyle: { color: "white" },
                        buttonStyle: { backgroundColor: "red" },
                        position: "bottom",
                        type: "danger"
                    })
                })
        }
    }
    render() {
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
                {
                    this.state.isLoading &&
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#ff00ff" />
                    </View>
                }
                {
                    !this.state.isLoading &&
                    <View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: 20 }}>
                            <Text style={styles.headerTitle}>Thay đổi thông tin</Text>
                        </View>
                        <View style={styles.body}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Tên đăng nhập"
                                autoCapitalize="none"
                                value={this.state.userName}
                                onChangeText={(userName) => this.setState({ userName })}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Mật khẩu mới"
                                autoCapitalize="none"
                                value={this.state.passWord}
                                onChangeText={(passWord) => this.setState({ passWord })}
                                secureTextEntry={true}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Họ tên"
                                autoCapitalize="none"
                                value={this.state.name}
                                onChangeText={(name) => this.setState({ name })}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Email"
                                autoCapitalize="none"
                                value={this.state.mail}
                                onChangeText={(mail) => this.setState({ mail })}

                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Số điện thoại"
                                autoCapitalize="none"
                                value={this.state.phone}
                                onChangeText={(phone) => this.setState({ phone })}

                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Địa chỉ"
                                autoCapitalize="none"
                                value={this.state.address}
                                onChangeText={(address) => this.setState({ address })}
                            />
                            <Item regular style={styles.textInput}>
                                <View style={{ flexDirection: 'row', marginRight: 40 }}>
                                    <Icon name='heart' type='Entypo' style={styles.Icon} />
                                    <Text style={{ fontSize: 16, marginLeft: 5 }}>
                                        Giới tính
                                </Text>
                                </View>
                                <TouchableOpacity onPress={() => this.setState({ sex: 1 })}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginRight: 40 }}>
                                        <View style={styles.circle}>
                                            {this.state.sex === 1 && <View style={styles.checkedCircle} />}
                                        </View>
                                        <Text style={{ fontSize: 16 }}>
                                            Nam
                                    </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ sex: 0 })}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <View style={styles.circle}>
                                            {this.state.sex === 0 && <View style={styles.checkedCircle} />}
                                        </View>
                                        <Text style={{ fontSize: 16 }}>
                                            Nữ
                                    </Text>
                                    </View>
                                </TouchableOpacity>
                            </Item>
                            <Item regular style={styles.textInput}>
                                <Icon type='Feather' name='gift' />
                                <DatePicker
                                    defaultDate={new Date(this.state.birthDate)}
                                    locale={"vi"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"spinner"}
                                    onDateChange={(birthDate) => this.setState({ birthDate })}
                                    disabled={false}
                                />
                            </Item>
                            <TouchableOpacity style={styles.signInContainer} onPress={this.sendData} disabled={this.state.loading}>
                                {
                                    !this.state.loading && <Text style={{ color: 'white' }}>Xác nhận</Text>
                                }
                                {
                                    this.state.loading && <ActivityIndicator size="large" color="white" />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                }
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
        marginBottom: 5,
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
    },
    circle: {
        marginLeft: 5,
        height: 20,
        width: 20,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#ACACAC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkedCircle: {
        width: 10,
        height: 10,
        borderRadius: 7,
        backgroundColor: '#f66',
    },
})

function mapStateToProps(state) {
    return {
        hoso: state.hoso
    }
}

export default connect(mapStateToProps)(LienHe);