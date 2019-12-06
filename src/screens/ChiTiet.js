import React, { Component } from 'react';
import { CardItem, Card, Icon, Button, Header, Left, Right, Content, Textarea, Form, Toast, Item, Input } from 'native-base';
import { StyleSheet, View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
//import Video from 'react-native-video';
//import { parse } from '@babel/parser';
import Carousel from 'react-native-snap-carousel';

class ChiTiet extends Component {
    static navigationOptions = {
        title: 'Chi tiết'
    };
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.navigation.state.params.item,
            dataSource: [],
            binhluan: [],
            hoso: [],
            danhsachhinhanhlienquan: [],
            comment: '',
            modalVisible: false,
            km: [],
            isLoading: true,
            percent: 0,
            //tk: null
            //hinhanh: []
        }

    }
    async componentDidMount() {
        await this.getData();
        if (this.state.item.giatri != null) {
            const km = this.state.item.giatri;
            const percent = parseInt(km);
            this.setState({ percent: percent });
        }
        this.setState({ item: { ...this.state.item, tc_giaBan: this.stringToInt(this.state.item.tc_giaBan), km: this.state.percent, giaKM: this.stringToInt(this.state.item.tc_giaBan) * (100 - this.state.percent)/100}, isLoading: false })
        console.log(this.state.percent);
        console.log(this.state.item.giaKM)
    }

    async getData() {
        try {
            await fetch("http://petshopct.herokuapp.com/public/thu-cung-api/" + this.state.item.tc_id)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        dataSource: responseJson.thucung,
                        binhluan: responseJson.binhluan,
                        danhsachhinhanhlienquan: responseJson.danhsachhinhanhlienquan,
                        //isLoading: false,
                    });
                    //console.log(responseJson);
                    //console.log(this.state.dataSource);
                    //console.log(this.state.danhsachhinhanhlienquan);
                })
        } catch (error) {
            console.error(error);
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    stringToInt(num) {
        return parseInt(num);
    }

    currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VNĐ';
    }

    buy = () => {
        let check = false;
        if (this.props.cart.length === 0) {
            const item = this.state.item
            this.props.dispatch({ type: 'ADD_TO_CART', payload: item });
            Toast.show({
                text: "Thêm thành công",
                buttonText: "Okay",
                buttonTextStyle: { color: "white" },
                buttonStyle: { backgroundColor: "green" },
                position: "bottom",
                type: "success"
            })
            setTimeout(() => {
                this.props.navigation.navigate('GioHangScreen');
            }, 2000);
            //console.log(this.props.cart)
        }
        else {
            this.props.cart.map(e => {
                if (e.tc_id === this.state.item.tc_id) {
                    check = true;
                }
            })
            if (check) {
                Toast.show({
                    text: "Sản phẩm đã tồn tại trong giỏ hàng",
                    buttonText: "Okay",
                    buttonTextStyle: { color: "white" },
                    buttonStyle: { backgroundColor: "red" },
                    position: "bottom",
                    type: "danger"
                })
            }
            else {
                const item = this.state.item
                this.props.dispatch({ type: 'ADD_TO_CART', payload: item });
                Toast.show({
                    text: "Thêm thành công",
                    buttonText: "Okay",
                    buttonTextStyle: { color: "white" },
                    buttonStyle: { backgroundColor: "green" },
                    position: "bottom",
                    type: "success"
                })
                setTimeout(() => {
                    this.props.navigation.navigate('GioHangScreen');
                }, 3000);

            }
        }

    }
    sendData = () => {
        
    }

    comment = () => {
        if (this.state.comment != '') {
            if (this.props.hoso.length > 0) {
                const data = {
                    kh_taiKhoan: this.props.hoso[0].kh_taiKhoan,
                    bl_noiDung: this.state.comment,
                    tc_id: this.state.item.tc_id
                }
                axios.post('http://petshopct.herokuapp.com/public/binhluan', { data })
                    .then(res => {
                        console.log(res.data.binhluan);
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

    // renderItem = ({ item }) => {
    //     <View style={styles.container}>
    //         <TouchableOpacity>
    //             <Image style={{ width: 200, height: 200 }} source={{ uri: 'http://res.cloudinary.com/petshop/image/upload/' + item.ha_ten + '.png' }} />
    //         </TouchableOpacity>
    //     </View>
    //     //console.log(item)
    // }


    render() {
        if (this.state.isLoading) {
            return (
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#f74877" />
              </View>
            )
          }
        const { params } = this.props.navigation.state;
        const gender = this.state.item.tc_gioiTinh === 1 ? "Đực" : "Cái";
        const tiemchung = this.state.item.tc_trangThaiTiemChung === 1 ? "Đã tiêm chủng" : "Chưa tiêm chủng";
        const trangthai = this.state.item.tc_trangThai === 1 ? "Chưa bán" : "Đã bán";
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 11 }}>
                    <ScrollView>
                        <Header transparent>
                            <Left>
                                <Button onPress={() => this.props.navigation.goBack()} style={{ backgroundColor: '#f74877' }}>
                                    <Icon name="undo" type="Ionicons" />
                                </Button>
                            </Left>
                            <Right />
                        </Header>
                        <SafeAreaView>
                            {/* <Carousel data={this.state.danhsachhinhanhlienquan}
                                renderItem={this.renderItem}
                                sliderWidth={400}
                                itemWidth={250}
                                keyExtractor={item => item.ha_ten}
                            /> */}
                            <Card>
                                <CardItem>
                                    <Image style={{ height: 250, width: '100%' }} source={{ uri: 'http://res.cloudinary.com/petshop/image/upload/' + this.state.item.ha_ten + '.png' }} />
                                </CardItem>
                                <View>
                                    <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={{ textAlign: 'center' }}>
                                                <Text style={styles.txtChitiet}>{this.state.item.tc_ten}</Text>
                                            </View>
                                            <View style={{ marginTop: 10, paddingBottom: 10 }}>
                                                <Text style={(this.state.item.km != 0 && this.state.item.km != null ) ? styles.giaCu : styles.giaMoi}>{this.currencyFormat(this.stringToInt(this.state.item.tc_giaBan))}</Text>
                                                {
                                                    (this.state.item.km != 0 && this.state.item.km != null ) && <Text style={styles.giaMoi}>{this.currencyFormat(this.state.item.tc_giaBan * (100 - this.state.percent) / 100)}</Text>
                                                }
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </Card>
                        </SafeAreaView>

                        <View style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white', borderWidth: 2, borderColor: 'silver', shadowOffset: { width: 2, height: 2 }, shadowColor: '#DFDFDF', shadowOpacity: 0.2, }}>
                            <View>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: 10, color: 'blue', marginTop: 10 }}>
                                    Chi tiết sản phẩm
                                </Text>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={styles.textDetail}>Loại thú cưng: </Text>
                                    <Text style={{ fontSize: 20, fontWeight: "400", marginLeft: 10 }}>{this.state.item.ltc_ten}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={styles.textDetail}>Giống: </Text>
                                    <Text style={{ fontSize: 20, fontWeight: "400", marginLeft: 10 }}>{this.state.item.g_ten}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={styles.textDetail}>Màu sắc: </Text>
                                    <Text style={{ fontSize: 20, fontWeight: "400", marginLeft: 10 }}>{this.state.item.tc_mauSac}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={styles.textDetail}>Cân nặng: </Text>
                                    <Text style={{ fontSize: 20, fontWeight: "400", marginLeft: 10 }}>{this.state.item.tc_canNang}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={styles.textDetail}>Tuổi: </Text>
                                    <Text style={{ fontSize: 20, fontWeight: "400", marginLeft: 10 }}>{this.state.item.tc_tuoi}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={styles.textDetail}>Giới tính: </Text>
                                    <Text style={{ fontSize: 20, fontWeight: "400", marginLeft: 10 }}>{gender}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={styles.textDetail}>Ngày sinh: </Text>
                                    <Text style={{ fontSize: 20, fontWeight: "400", marginLeft: 10 }}>{this.state.item.tc_ngaySinh}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={styles.textDetail}>Trạng thái tiêm chủng: </Text>
                                    <Text style={{ fontSize: 20, fontWeight: "400", marginLeft: 10 }}>{tiemchung}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={styles.textDetail}>Trạng thái sản phẩm: </Text>
                                    <Text style={{ fontSize: 20, fontWeight: "400", marginLeft: 10 }}>{trangthai}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }} key={this.state.item.tc_id}>
                                    <Text style={styles.textDetail}>Mô tả sản phẩm: </Text>
                                    <View style={{ margin: 5 }}>
                                        <Modal
                                            animationType="slide"
                                            transparent={false}
                                            visible={this.state.modalVisible}
                                            onRequestClose={() => {
                                                Alert.alert('Modal has been closed.');
                                            }}>
                                            <View style={{ marginTop: 22 }}>
                                                <ScrollView>
                                                    <View style={{ margin: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text>{this.state.item.tc_moTa}</Text>
                                                        <View style={{ margin: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Button iconLeft style={{ backgroundColor: '#f74877', width: 110 }}
                                                                onPress={() => {
                                                                    this.setModalVisible(!this.state.modalVisible);
                                                                }}>
                                                                <Icon name="ccw" type="Entypo" />
                                                                <Text style={styles.textCont}>Trở về</Text>
                                                            </Button>
                                                        </View>
                                                    </View>
                                                </ScrollView>
                                            </View>
                                        </Modal>
                                        <Button iconLeft style={{ backgroundColor: '#f74877' }}
                                            onPress={() => {
                                                this.setModalVisible(true);
                                            }}>
                                            <Icon name="eye" type="Feather" />
                                            <Text style={styles.textCont}>Xem</Text>
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: 'white' }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: 10, color: 'blue', marginTop: 10 }}>
                                Bình luận
                            </Text>
                            <View style={{ margin: 10 }}>
                                <Item underline>
                                    <Button rounded transparent onPress={this.comment}>
                                        <Icon name="send" type="Feather" />
                                    </Button>
                                    <Input placeholder="Nhập nội dung bình luận" onChangeText={(comment) => this.setState({ comment })} />
                                    <Text>
                                        {this.state.comment}
                                    </Text>
                                </Item>
                                <View style={{ marginTop: 10 }}>
                                    {
                                        this.state.binhluan.length > 0 &&
                                        this.state.binhluan.map(e => {
                                            return (
                                                <View key={e.bl_id} style={{ marginTop: 10, borderWidth: 1, borderRadius: 15, borderColor: 'lightgray', padding: 10, flexDirection: 'row' }}>
                                                    <Icon name="user" type="Feather" style={{fontSize: 16}}  />
                                                    <Text style={{ fontSize: 16, color: 'grey', marginLeft: 3 }}>
                                                        {e.kh_taiKhoan}:
                                                    </Text>
                                                    <Text style={{ fontSize: 18, marginLeft: 10}}>
                                                        {e.bl_noiDung}
                                                    </Text>
                                                </View>
                                            )
                                        })
                                    }
                                    {
                                        this.state.binhluan.length == 0 &&
                                        <View style={{ marginTop: 5, backgroundColor: 'white' }}>
                                            <Text style={{ fontSize: 14, color: 'red' }}>
                                                Chưa có bình luận cho sản phẩm
                                            </Text>
                                        </View>
                                    }
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.viewButton}>
                    <Button iconLeft onPress={this.buy} style={{ backgroundColor: '#f74877' }} >
                        <Icon name="shopping-cart" type="Feather" />
                        <Text style={styles.textCont}>Thêm vào giỏ hàng</Text>
                    </Button>
                    <Button iconLeft style={{ backgroundColor: '#f74877' }} onPress={() => this.props.navigation.navigate('VideoScreen', { data: this.state.danhsachhinhanhlienquan })}>
                        <Icon name="eye" type="Feather" />
                        <Text style={styles.textCont}>Xem Video</Text>
                    </Button>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    textCont: {
        fontSize: 18,
        color: 'white',
        marginLeft: 2,
        fontWeight: 'bold',
        paddingLeft: 5,
        paddingRight: 10,
    },
    viewButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        //width: 200,
        flexDirection: 'row',
        marginTop: 10,
    },
    video: {
        width: 200,
        height: 170,
        borderWidth: 2,
        borderColor: '#ff00ff'
    },
    cardVideo: {

    },
    backgroundVideo: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 10,
        left: 10,
        bottom: 0,
        right: 10,
        width: 300,
        height: 200
    },
    textDetail: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20
    },
    txtChitiet: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    orderRow: {
        //height: width / 3,
        backgroundColor: '#FFF',
        margin: 10,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#DFDFDF',
        shadowOpacity: 0.2,
        padding: 10,
        borderRadius: 2,
        justifyContent: 'space-around'
    },
    giaMoi: {
        color: 'red',
        fontSize: 22,
        textAlign: 'center'
    },
    giaCu: {
        color: 'black',
        fontSize: 22,
        textDecorationLine: 'line-through',
        textAlign: 'center'
    },
});

function mapStateToProps(state) {
    return {
        cart: state.cart,
        hoso: state.hoso,
    }
}

export default connect(mapStateToProps)(ChiTiet);