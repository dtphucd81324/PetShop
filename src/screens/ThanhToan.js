import React, { Component } from 'react';
import RNPaypal from 'react-native-paypal-android';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Item, Input, Header, Left, Right, Button, Icon, Toast } from 'native-base';
import { connect } from 'react-redux';
import axios from 'axios';


const client = {
  sandbox: 'Ab8TrmGWdj0gBEMT-ScrcED4uZFwv9pbesmu2lex5ey3isdJzOFIrqwuxJh99yLB2EivWaa1y0lMzC6Y',
}

class ThanhToan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //dataSource: [],
      paypal: false,
      httt: null,
      ht:[],
      diachi: '',
      dienthoai: '',
      khachhang: '',
      isLoading: false,
    };
  }

  async componentDidMount() {
    await this.getHinhThuc();
    //console.log(this.props.cart);
    this.setState({ khachhang: this.props.hoso[0].kh_taiKhoan, diachi: this.props.hoso[0].kh_diaChi, dienthoai: this.props.hoso[0].kh_dienThoai })
  }

  async getHinhThuc() {
    try {
      await fetch("http://petshopct.herokuapp.com/public/admin/list_hinhthucthanhtoan")
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            ht: responseJson,
            isLoading: false,
          });
          console.log(responseJson);
        })
    } catch (error) {
      console.error(error);
    }
  }

  sendData = () => {
    const data = {
      kh_taiKhoan: this.props.hoso[0].kh_taiKhoan,
      dh_nguoiNhan: this.state.khachhang,
      dh_dienThoai: this.state.dienthoai,
      dh_tongGia: this.props.total,
      dh_diaChi: this.state.diachi,
      httt_id: this.state.httt,
      ttdh_id: 1,
      cart: this.props.cart
    }
    axios.post('http://petshopct.herokuapp.com/public/dathang', { data })
      .then(res => {
        console.log(res.data);
        //console.log(res.data.donhang);
        if (res.error) {
          Toast.show({
            text: "Đặt hàng không thành công !",
            buttonText: "Okay",
            type: 'danger',
          })
        }
        else {
          Toast.show({
            text: "Đặt hàng thành công !",
            buttonText: "Okay",
            type: 'success',
          });
          this.props.dispatch({ type: 'THANH_TOAN' });
          this.props.navigation.navigate('GioHangScreen');
        }
      }).catch(error => {
        console.log(error);
        Toast.show({
          text: "Đặt hàng không thành công !",
          buttonText: "Okay",
          type: 'danger',
        })
      })
  }

  render() {
    //const { params } = this.props.navigation.state;
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
        <View style={{ margin: 10, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#f74877' }}>THANH TOÁN</Text>
        </View>
        <View style={{ margin: 20 }}>
          <Text style={styles.txtTT}>Khách hàng</Text>
          <Item disabled inlineLabel style={{ marginBottom: 10 }}>
            <Input value={this.state.khachhang} onChangeText={(khachhang) => this.setState({ khachhang })} />
          </Item>
          <Text style={styles.txtTT}>Địa chỉ nhận hàng</Text>
          <Item inlineLabel>
            <Input value={this.state.diachi} onChangeText={(diachi) => this.setState({ diachi })} />
          </Item>
          <Text style={styles.txtTT}>Số điện thoại</Text>
          <Item inlineLabel>
            <Input value={this.state.dienthoai} onChangeText={(dienthoai) => this.setState({ dienthoai })} />
          </Item>
        </View>
        <View style={{ margin: 10, padding: 10 }}>
          <View style={{ margin: 5 }}>
            <Text style={{ fontSize: 16, color: 'blue' }}>
              Chọn hình thức thanh toán
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', margin: 10 }}>
            {
              this.state.isLoading && <ActivityIndicator size="large" color="#f74877" />
            }
            {
              !this.state.isLoading && this.state.ht.map(e => {
                return (
                  <TouchableOpacity key={e.httt_id} style={styles.buttonContainer} onPress={() => this.setState({ httt: e.httt_id })}>
                    <View style={styles.circle}>
                      {this.state.httt === e.httt_id && <View style={styles.checkedCircle} />}
                    </View>
                    <Text>{e.httt_ten}</Text>
                  </TouchableOpacity>
                );
              })
            }
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={{ alignItems: 'center', marginBottom: 10 }}>
              {
                this.state.httt === 1 &&
                <Button rounded style={styles.btnPaypal}
                  onPress={async () => {
                    try {
                      await RNPaypal.config({
                        clientId: client.sandbox,
                        environment: RNPaypal.constants.env.SANDBOX
                      })
                      const pay = await RNPaypal.buy({
                        value: this.props.total/23000,
                        productName: 'Thanh toán',
                        currency: 'USD',
                        mode: RNPaypal.constants.mode.PAYMENT_INTENT_SALE
                      });
                      const data = {
                        kh_taiKhoan: this.props.hoso[0].kh_taiKhoan,
                        dh_nguoiNhan: this.state.khachhang,
                        dh_dienThoai: this.state.dienthoai,
                        dh_tongGia: this.props.total,
                        dh_diaChi: this.state.diachi,
                        httt_id: this.state.httt,
                        ttdh_id: 1,
                        cart: this.props.cart
                      }
                      axios.post('http://petshopct.herokuapp.com/public/dathang', { data })
                        .then(res => {
                          console.log(res.data);
                          //console.log(res.data.donhang);
                          if (res.error) {
                            Toast.show({
                              text: "Đặt hàng không thành công !",
                              buttonText: "Okay",
                              type: 'danger',
                            })
                          }
                          else {
                            Toast.show({
                              text: "Đặt hàng thành công !",
                              buttonText: "Okay",
                              type: 'success',
                            });
                            this.props.dispatch({ type: 'THANH_TOAN' });
                            this.props.navigation.navigate('GioHangScreen');
                          }
                        }).catch(error => {
                          console.log(error);
                          Toast.show({
                            text: "Đặt hàng không thành công !",
                            buttonText: "Okay",
                            type: 'danger',
                          })
                        })
                      //console.log(pay);// SUCESSS
                    } catch (e) {
                      console.log(e);// NO MONEY :()
                      Toast.show({
                        text: "Đặt hàng không thành công !",
                        buttonText: "Okay",
                        type: 'danger',
                      })// NO MONEY :()
                    }
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Thanh toán Paypal</Text>
                </Button>
              }
            </View>
            <View style={{ alignItems: 'center' }}>
              {
                this.state.httt === 2 &&
                <Button rounded
                  onPress={this.sendData}
                  style={styles.btnPaypal}
                >
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Thanh toán tại cửa hàng</Text>
                </Button>
              }
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5
  },
  viewButton: {
    flex: 1,
    alignItems: 'center'
  },
  btnPaypal: {
    width: 300,
    paddingVertical: 10,
    marginHorizontal: 16,
    borderRadius: 25,
    marginBottom: 5,
    height: 50,
    justifyContent: 'space-around',
    alignContent: 'center',
    backgroundColor: '#f74877',
  },
  circle: {
    height: 25,
    width: 25,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#f74877',
  },
});

function mapStateToProps(state) {
  return {
    cart: state.cart,
    total: state.total,
    hoso: state.hoso
  }
}
export default connect(mapStateToProps)(ThanhToan);