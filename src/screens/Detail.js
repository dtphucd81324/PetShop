import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Picker,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { Header, Left, Right, Icon, ListItem, Button, Toast, Content, Item, Input, } from 'native-base';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Carousel from 'react-native-snap-carousel';
import HTMLView from 'react-native-htmlview';
import { connect } from 'react-redux';
import axios from 'axios';

// const SIZE = [
//   {id:1,kichco:'6'},
//   {id:2,kichco:'7'},
//   {id:3,kichco:'8'},
// ];
// const BL = [{idTK:1,noidung:'đẹp'}];

class ChiTiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: [],
      valueSize: null,
      product: {},
      data: this.props.navigation.state.params.data,
      soluong: 1,
      checkItem: 0,
      showToast: false,
      bl: [],
      isLoading: true,
      ha: [],
      tk: null,
      dg: 0,
      sp: [],
      km: [],
      maxVal: 1,
      ronly: false,
      profile: [],
      percent: 0,
      comment: ''
    };
  }
  async componentDidMount() {
    await this.getData();
    if (this.state.data.TenKhuyenMai != null) {
      const km = '' + this.state.data.TenKhuyenMai;
      const sale = km.split(' ')[1];
      const percent = parseInt(sale);
      this.setState({ percent: percent });
    }
    this.setState({ data: { ...this.state.data, soluong: this.state.soluong, gia: this.stringToInt(this.state.data.gia), km: this.state.percent, giaKM: this.stringToInt(this.state.data.gia) * (100 - this.state.percent) / 100 }, isLoading: false });

  }
  stringToInt(num) {
    return parseInt(num)
  }
  currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VNĐ';
  }
  async getData() {
    try {
      let response = await fetch(
        'http://10.0.2.2:8000/chitiet/' + this.state.data.MaSanPham + '/' + this.state.tk,
      );
      let responseJson = await response.json();
      this.setState({ size: responseJson.kc_sp, ha: responseJson.ha, sp: responseJson.sp, bl: responseJson.bl });
      responseJson.dg && this.setState({ dg: responseJson.dg.NoiDungDanhGia, ronly: true });
      console.log(this.state.sp);
    } catch (error) {
      console.error(error);
    }
  }
  reloadComment = () => {
  }
  comment = () => {
    if (this.state.comment != '') {
      if (this.props.profile.length > 0) {
        const data = {
          TenTaiKhoan: this.props.profile[0].TenTaiKhoan,
          NoiDungBinhLuan: this.state.comment,
          MaSanPham: this.state.data.MaSanPham
        }
        axios.post('http://10.0.2.2:8000/api/comment', { data })
          .then(res => {
            console.log(res.data);
          }).catch(error => {
            console.log(error);
          })
      } else {
        Toast.show({
          text: "Đăng nhập để bình luận sản phẩm! ",
          buttonText: "Okay",
          position: "bottom",
          type: "warning"
        })
      }
    }
  }
  buy = () => {
    let check = false;
    if (this.state.valueSize === null) {
      Toast.show({
        text: "Vui lòng chọn kích cỡ",
        buttonText: "Okay",
        position: "bottom",
        type: "warning"
      })
    } else if (this.state.maxVal === 0) {
      Toast.show({
        text: "Kích cỡ này hết hàng",
        buttonText: "Okay",
        position: "bottom",
        type: "warning"
      })
    }
    else {
      const item = this.state.data;
      if (this.props.cart.length === 0) {
        this.props.dispatch({ type: 'THEM_MOI', payload: item });
      }
      else {
        this.props.cart.map(e => {
          if (e.id === item.id) {
            if (e.MaKichCo === item.MaKichCo) {
              check = true;
            }
          }
        })
        console.log(check);
        if (check) {
          this.props.dispatch({ type: 'TANGSO_LUONG', payload: item });
        }
        else {
          this.props.dispatch({ type: 'THEM_MOI', payload: item });
        }


      }
      Toast.show({
        text: "Thêm vào giỏ hàng thành công",
        buttonText: "Okay",
        position: "bottom",
        type: "success"
      })

    }
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Image style={{ width: 200, height: 200 }} source={{ uri: item.TenHinhAnh }} />
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#f66" />
        </View>
      )
    }
    const disableMinus = this.state.soluong === 1 ? true : false;
    const disablePlus = this.state.soluong === this.state.maxVal ? true : false;
    return (
      <View style={{ flex: 1, backgroundColor: 'lightgray' }}>
        <View style={{ flex: 11 }}>
          <ScrollView>
            <Header transparent style={{ backgroundColor: 'white' }}>
              <Left>
                <Button style={{ backgroundColor: '#f66' }} onPress={() => this.props.navigation.goBack()}>
                  <Icon name='arrow-left' type='Feather' />
                </Button>
              </Left>
              <Right />
            </Header>
            <SafeAreaView style={{ backgroundColor: 'white' }}>
              <Carousel data={this.state.ha}
                renderItem={this.renderItem}
                sliderWidth={400}
                itemWidth={250}
                keyExtractor={item => item.TenHinhAnh}
              />
            </SafeAreaView>
            <View>
              <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
                <View style={{ alignItems: 'center' }}>
                  <View style={{ textAlign: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.state.data.TenSanPham}</Text>
                  </View>
                  <View style={{ marginTop: 10, paddingBottom: 10 }}>
                    {
                      this.state.data.km != 0 && <Text style={styles.giaMoi}>{this.currencyFormat(this.state.data.gia * (100 - this.state.percent) / 100)}</Text>
                    }

                    <Text style={this.state.data.km != 0 ? styles.giaCu : styles.giaMoi}>{this.currencyFormat(this.state.data.gia)}</Text>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 10, backgroundColor: 'white' }}>
                <Text style={styles.title}>
                  Lựa chọn
                </Text>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 5, flexWrap: 'wrap', paddingRight: 10 }}>
                  {this.state.size.map(item => {
                    return (
                      <TouchableOpacity key={item.MaKichCo} style={styles.buttonContainer} onPress={() => { this.setState({ soluong: 1, maxVal: item.SoLuong, valueSize: item.MaKichCo, data: { ...this.state.data, MaKichCo: item.MaKichCo, TenKichCo: item.TenKichCo, slcl: item.SoLuong } }) }}>
                        <Text>Cỡ {item.TenKichCo}</Text>
                        <View style={styles.circle}>
                          {this.state.valueSize === item.MaKichCo && <View style={styles.checkedCircle} />}
                        </View>
                      </TouchableOpacity>
                    );
                  })
                  }
                </View>
                {
                  this.state.valueSize != null &&
                  <View style={{ alignItems: 'center', margin: 10 }}>
                    <Text>
                      Còn lại: {this.state.maxVal}
                    </Text>
                    <View >
                      <View style={{ flexDirection: 'row' }}>
                        <Button disabled={disableMinus} style={{ width: 25, height: 25, margin: 10, backgroundColor: '#f66' }} onPress={() => { this.setState({ soluong: this.state.soluong - 1, data: { ...this.state.data, soluong: this.state.soluong } }) }}>
                          <Text style={{ paddingLeft: 5 }}>
                            <Icon name='minus' type='FontAwesome' style={{ fontSize: 20 }} />
                          </Text>
                        </Button>
                        <Text style={{ marginTop: 11 }}>
                          {this.state.maxVal == 0 ? this.state.maxVal : this.state.soluong}
                        </Text>
                        <Button disabled={disablePlus} style={{ width: 25, height: 25, margin: 10, backgroundColor: '#f66' }} onPress={() => { this.setState({ soluong: this.state.soluong + 1, data: { ...this.state.data, soluong: this.state.soluong + 1 } }) }}>
                          <Text style={{ paddingLeft: 4 }}>
                            <Icon name='plus' type='FontAwesome' style={{ fontSize: 20 }} />
                          </Text>
                        </Button>
                      </View>
                    </View>
                  </View>
                }
              </View>
              <View style={{ marginTop: 10, backgroundColor: 'white' }}>
                <View>
                  <Text style={styles.title}>
                    Mô tả sản phẩm
                  </Text>
                  <View style={{ marginLeft: 5, padding: 5 }}>
                    <Text>
                      Chất liệu : {this.state.sp[0]['TenChatLieu']}
                    </Text>
                    <Text>
                      Thương hiệu : {this.state.sp[0]['TenThuongHieu']}
                    </Text>
                    <Text>
                      Xuất xứ: {this.state.sp[0]['TenXuatXu']}
                    </Text>
                    <HTMLView
                      value={this.state.data.MoTaSanPham}
                    />
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 10, backgroundColor: 'white' }}>
                <Text style={styles.title}>
                  Bình luận & Đánh giá
                </Text>
                <View style={{ marginTop: 10 }}>
                  <Rating
                    ratingCount={5}
                    imageSize={30}
                    onFinishRating={(rating) => {
                      if (this.props.profile.length > 0) {
                        const data = {
                          MaSanPham: this.state.data.MaSanPham,
                          TenTaiKhoan: this.props.profile[0].TenTaiKhoan,
                          NoiDungDanhGia: rating
                        }
                        console.log(data);
                        axios.post('http://10.0.2.2:8000/api/danhgia', { data })
                          .then(res => {
                            console.log(res.data);
                            Toast.show({
                              text: "Đánh giá sản phẩm thành công!",
                              buttonText: "Okay",
                              position: "bottom",
                              type: "success"
                            })
                          }).catch(error => {
                            console.log(error);
                          })
                      } else {
                        Toast.show({
                          text: "Đăng nhập để đánh giá sản phẩm!",
                          buttonText: "Okay",
                          position: "bottom",
                          type: "warning"
                        })
                      }
                    }}
                    startingValue={this.state.dg}
                    readonly={this.state.ronly}
                  />
                </View>
                <View style={{ margin: 10 }}>
                  <Item underline>
                    <Button rounded transparent onPress={this.comment}>
                      <Icon name="send" type="Feather" />
                    </Button>
                    <Input placeholder="Bình luận tại đây!" onChangeText={(comment) => this.setState({ comment })} />
                    <Text>
                      {this.state.comment}
                    </Text>
                  </Item>
                  <View style={{ marginTop: 10 }}>
                    {
                      this.state.bl.length > 0 &&
                      this.state.bl.map(e => {
                        return (
                          <View style={{ marginTop: 10, borderWidth: 1, borderRadius: 15, borderColor: 'lightgray', padding: 10 }}>
                            <Text style={{ fontSize: 14, color: 'grey' }}>
                              {e.TenTaiKhoan} - 3 ngày trước
                            </Text>
                            <Text style={{ fontSize: 17, marginTop: 10, marginLeft: 30 }}>
                              {e.NoiDungBinhLuan}
                            </Text>
                          </View>
                        )
                      })
                    }
                    {
                      this.state.bl.length == 0 &&
                      <View style={{ marginTop: 5, backgroundColor: 'white' }}>
                        <Text>
                          Chưa có bình luận cho sản phẩm
                    </Text>
                      </View>
                    }
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Button block onPress={this.buy} style={{ backgroundColor: '#f66' }}>
            <Text style={{ color: 'white' }}>
              Mua sản phẩm
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 10
  },
  circle: {
    marginLeft: 5,
    height: 30,
    width: 30,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    width: 20,
    height: 20,
    borderRadius: 2,
    backgroundColor: '#f66',
  },
  giaMoi: {
    color: 'red',
    fontSize: 20
  },
  giaCu: {
    color: 'black',
    fontSize: 18,
    textDecorationLine: 'line-through'
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    margin: 5
  }
});

function mapStateToProps(state) {
  return {
    cart: state.cart,
    profile: state.profile
  }
}

export default connect(mapStateToProps)(ChiTiet);