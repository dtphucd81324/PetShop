import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Header, Item, Icon, Input, DatePicker, Left, Right, Button, CheckBox, Body, ListItem } from 'native-base';
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
  // sendData = async () => {
  //   const data = {
  //     kh_taiKhoan: this.state.userName,
  //     kh_matKhau: this.state.passWord,
  //     kh_hoTen: this.state.name,
  //     //kh_gioiTinh: 1,
  //     kh_email: this.state.mail,
  //     kh_ngaySinh: this.state.birthDate,
  //     kh_dienThoai: this.state.phone,
  //     kh_diaChi: this.state.address,
  //   };

  // axios.post('http://petshopct.herokuapp.com/public/dangky/create', { data })
  //   .then(res => {
  //     console.log(res.data);
  //   }).catch(error => {
  //     console.log(error);
  //     console.log(res.data);
  //   })

  sendData = async () => {
    var kh_taiKhoan = this.state.userName;
    var kh_matKhau = this.state.passWord;
    var kh_diaChi = this.state.address;
    var kh_hoTen = this.state.name;
    var kh_dienThoai = this.state.phone;
    //var kh_ngaySinh: this.state.birthDate;
    var kh_email = this.state.mail;
    var kh_gioiTinh = 1;
    axios.post('http://10.0.2.2:8000/dangky/create', {
      kh_taiKhoan: kh_taiKhoan,
      kh_matKhau: kh_matKhau,
      kh_diaChi: kh_diaChi,
      kh_hoTen: kh_hoTen,
      kh_dienThoai: kh_dienThoai,
      kh_email: kh_email,
      kh_gioiTinh: 1,
      kh_ngaySinh: '2019-10-20'
    })
      .then(res => {
        console.log(res.data);
      }).catch(error => {
        console.log(error);
      })
  }





  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <View>
          <Text style={styles.textContainer}>Đăng ký tài khoản</Text>
        </View> */}
        <View style={{ flex: 1, justifyContent: 'center', textAlign: 'center', paddingHorizontal: 10, }}>
          <Text style={styles.textContainer}>Đăng Ký Tài Khoản</Text>
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
          <ListItem style={{ flexDirection: 'row' }}>
            <CheckBox checked={false} style={{ paddingRight: 10 }} />
            <Body>
              <Text style={{ marginRight: 5 }}>Nam</Text>
            </Body>
            <CheckBox checked={false} />
            <Body>
              <Text>Nữ</Text>
            </Body>
          </ListItem>
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
        <View style={styles.registerContent}>
          <Text style={{ fontSize: 18, marginRight: 5 }}>Bạn đã có tài khoản?</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.textRegister}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  }
});
