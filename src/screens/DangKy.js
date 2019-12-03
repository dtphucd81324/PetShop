import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { Header, Item, Icon, Input, DatePicker, Button, CheckBox, Body, ListItem, Left, Right, Toast } from 'native-base';
import axios from 'axios';

export default class DangKy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      passWord: '',
      name: '',
      //birthDate: new Date(),
      sex: null,
      phone: '',
      mail: '',
      address: '',
      status: '',
      wholeResult: '',
      checked: null,
    };
  }


  sendData = async () => {
    var kh_taiKhoan = this.state.userName;
    var kh_matKhau = this.state.passWord;
    var kh_diaChi = this.state.address;
    var kh_hoTen = this.state.name;
    var kh_dienThoai = this.state.phone;
    //var kh_ngaySinh: this.state.birthDate;
    var kh_email = this.state.mail;
    var kh_gioiTinh = this.state.sex;
    axios.post('http://10.0.2.2:8000/dangky/create', {
      kh_taiKhoan: kh_taiKhoan,
      kh_matKhau: kh_matKhau,
      kh_diaChi: kh_diaChi,
      kh_hoTen: kh_hoTen,
      kh_dienThoai: kh_dienThoai,
      kh_email: kh_email,
      kh_gioiTinh: kh_gioiTinh,
      kh_ngaySinh: '1997-10-20'
    })
      .then(res => {
        if (res.data.kh) {
          console.log(res.data);
          Toast.show({
            text: "Đăng ký thành công !!!",
            buttonText: "Okay",
            buttonTextStyle: { color: "white" },
            buttonStyle: { backgroundColor: "green" },
            position: "bottom",
            type: "success"
          })
          this.props.dispatch({ type: 'DANG_XUAT' });
          this.props.navigation.navigate('Login');
        }
        else{
          Toast.show({
            text: "Đăng ký không thành công !!!",
            buttonText: "Okay",
            buttonTextStyle: { color: "white" },
            buttonStyle: { backgroundColor: "red" },
            position: "bottom",
            type: "danger"
          })
        }
      }).catch(error => {
        console.log(error);
        Toast.show({
          text: "Đăng ký không thành công !!!",
          buttonText: "Okay",
          buttonTextStyle: { color: "white" },
          buttonStyle: { backgroundColor: "red" },
          position: "bottom",
          type: "danger"
        })
      })
  }





  render() {
    return (
      <ScrollView>
        <Header transparent>
          <Left>
            <Button onPress={() => this.props.navigation.navigate('Login')} style={{ backgroundColor: '#ff00ff' }}>
              <Icon name="undo" type="Ionicons" />
            </Button>
          </Left>
          <Right />
        </Header>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', textAlign: 'center' }}>
            <Image source={require('../images/petshopt.png')} style={{ width: 160, height: 50 }} />
            <Text style={styles.textContainer}>Đăng Ký</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', textAlign: 'center', paddingHorizontal: 10, }}>
            <Item regular style={styles.Item}>
              <Icon name="user" type="Feather" style={styles.Icon} />
              <Input placeholder="Tên đăng nhập" onChangeText={(userName) => this.setState({ userName })} />
            </Item>
            <Item regular style={styles.Item}>
              <Icon name="lock" type="Feather" style={styles.Icon} />
              <Input secureTextEntry placeholder="Mật khẩu" onChangeText={(passWord) => this.setState({ passWord })} />
            </Item>
            <Item regular style={styles.Item}>
              <Icon name="smile" type="Feather" style={styles.Icon} />
              <Input placeholder="Họ tên" onChangeText={(name) => this.setState({ name })} />
            </Item>
            <Item regular style={styles.Item}>
              <Icon name="at-sign" type="Feather" style={styles.Icon} />
              <Input placeholder="Email" onChangeText={(mail) => this.setState({ mail })} />
            </Item>
            <Item regular style={styles.Item}>
              <Icon name="phone" type="Feather" style={styles.Icon} />
              <Input placeholder="Số điện thoại" onChangeText={(phone) => this.setState({ phone })} />
            </Item>
            <Item regular style={styles.Item}>
              <Icon name="home" type="Feather" style={styles.Icon} />
              <Input placeholder="Địa chỉ" onChangeText={(address) => this.setState({ address })} />
            </Item>
            <Item regular style={styles.Item}>
              <Icon type='Feather' name='gift' style={styles.Icon} />
              <DatePicker
                locale={"vi"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"spinner"}
                placeHolderText="Ngày sinh"
                onDateChange={(birthDate) => this.setState({ birthDate })}
                disabled={false}
              />
            </Item>
            <Item regular style={{ paddingTop: 10, paddingBottom: 10, flexDirection: 'row', borderRadius: 50, }}>
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
            <View style={{ paddingHorizontal: 10 }} >
              <Button onPress={this.sendData} style={styles.btnDangky}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
                  Đăng ký
              </Text>
              </Button>
              <Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  btnDangky: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#ff00ff'
  },
  textContainer: {
    fontSize: 28,
    textAlign: 'center',
    paddingBottom: 20,
    margin: 10,
    color: '#f7c744',
    fontWeight: 'bold'
  },
  Item: {
    borderRadius: 50,
    marginBottom: 10,
  },
  Icon: {
    color: '#ff00ff'
  },
  registerContent: {
    //flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  textRegister: {
    fontSize: 18,
    color: '#ff00ff',
    marginRight: 2,
    fontWeight: "bold"
  },
  checkedCircle: {
    width: 10,
    height: 10,
    borderRadius: 7,
    backgroundColor: '#f66',
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
});
