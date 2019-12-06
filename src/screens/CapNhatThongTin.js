import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView, Toast, ActivityIndicator } from 'react-native';
import { Icon, Button, Header, Left, Right, Item, Input, DatePicker } from 'native-base';
import { connect } from 'react-redux';
import axios from 'axios';


class CapNhatThongTin extends Component {
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
        return fetch("http://petshopct.herokuapp.com/public/thongtinkh/" + this.props.hoso[0].kh_taiKhoan, {
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
            axios.post('http://petshopct.herokuapp.com/public/capnhatthongtin', { data })
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
        }else{
            this.setState({ loading: false });
            Toast.show({
                text: "Cập nhật không thành công",
                buttonText: "Okay",
                buttonTextStyle: { color: "white" },
                buttonStyle: { backgroundColor: "red" },
                position: "bottom",
                type: "danger"
            })
        }
    }
    render() {
        return (
            <ScrollView>
                <Header transparent>
                    <Left>
                        <Button onPress={() => this.props.navigation.goBack()} style={{ backgroundColor: '#f74877' }}>
                            <Icon name="undo" type="Ionicons" />
                        </Button>
                    </Left>
                    <Right />
                </Header>
                {
                    this.state.isLoading &&
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#f74877" />
                    </View>
                }
                {
                    !this.state.isLoading &&
                    <View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: 20 }}>
                            <Text style={styles.headerTitle}>Thay đổi thông tin</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', textAlign: 'center', paddingHorizontal: 10, }}>
                            <Item regular style={styles.Item}>
                                <Icon name="user" type="Feather" style={styles.Icon} />
                                <Input placeholder="Tên đăng nhập" value={this.state.userName} onChangeText={(userName) => this.setState({ userName })} />
                            </Item>
                            <Item regular style={styles.Item}>
                                <Icon name="lock" type="Feather" style={styles.Icon} />
                                <Input secureTextEntry placeholder="Mật khẩu" value={this.state.passWord} onChangeText={(passWord) => this.setState({ passWord })} />
                            </Item>
                            <Item regular style={styles.Item}>
                                <Icon name="smile" type="Feather" style={styles.Icon} />
                                <Input placeholder="Họ tên" value={this.state.name} onChangeText={(name) => this.setState({ name })} />
                            </Item>
                            <Item regular style={styles.Item}>
                                <Icon name="at-sign" type="Feather" style={styles.Icon} />
                                <Input placeholder="Email" value={this.state.mail} onChangeText={(mail) => this.setState({ mail })} />
                            </Item>
                            <Item regular style={styles.Item}>
                                <Icon name="phone" type="Feather" style={styles.Icon} />
                                <Input placeholder="Số điện thoại" value={this.state.phone} onChangeText={(phone) => this.setState({ phone })} />
                            </Item>
                            <Item regular style={styles.Item}>
                                <Icon name="home" type="Feather" style={styles.Icon} />
                                <Input placeholder="Địa chỉ" value={this.state.address} onChangeText={(address) => this.setState({ address })} />
                            </Item>
                            <Item regular style={styles.Item}>
                                <Icon type='FontAwesome' name='calendar' style={styles.Icon} />
                                <DatePicker
                                    locale={"vi"}
                                    defaultDate={new Date(this.state.birthDate)}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"spinner"}
                                    placeHolderText="Ngày sinh"
                                    onDateChange={(birthDate) => this.setState({ birthDate })}
                                    disabled={false}
                                />
                            </Item>
                            <Item regular style={{ borderRadius: 20, marginBottom: 5, borderColor: '#f74877',borderWidth: 1, backgroundColor: '#FFFFFF', height: 45}}>
                                <View style={{ flexDirection: 'row', marginRight: 40 }}>
                                    <Icon name='transgender-alt' type='FontAwesome' style={styles.Icon} />
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
                            <TouchableOpacity style={styles.signInContainer} onPress={this.sendData} disabled={this.state.loading}>
                                {
                                    !this.state.loading && <Text style={{ color: 'white', fontSize: 18 }}>Cập nhật</Text>
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
    Item: {
        borderRadius: 20,
        marginBottom: 5,
        borderColor: '#f74877',
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
    },
    Icon: {
        color: '#f74877'
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
        backgroundColor: '#f74877',
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
        borderColor: '#f74877',
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

export default connect(mapStateToProps)(CapNhatThongTin);