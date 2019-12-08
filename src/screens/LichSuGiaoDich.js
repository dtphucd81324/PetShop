import React, { Component } from 'react';
import {
    View, Text, Image,
    StyleSheet, ScrollView, Dimensions,
    ActivityIndicator, Modal, FlatList,
} from 'react-native';
import { Icon, Button, Header, Left, Right, Body, Card, CardItem } from 'native-base';
import { connect } from 'react-redux';
import axios from 'axios';


class LichSuGiaoDich extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //arrOrder: [],
            dh: [],
            isLoading: true,
            modalVisible: false,
            chitiet: [],
            tamtinh: 0,
        }
    }

    async componentDidMount() {
        await this.getDonHang();
        //console.log(this.props.hoso);
        this.setState({ isLoading: false });
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    async getDonHang() {
        try {
            await fetch("http://petshopct.herokuapp.com/public/danhsach_donhang/" + this.props.hoso[0].kh_taiKhoan, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        dh: responseJson.ds_donhang,
                    });
                    console.log(this.state.dh);
                    console.log(responseJson);
                })
        } catch (error) {
            console.error(error);
        }
    }

    stringToInt(num) {
        return parseInt(num);
    }

    currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VNĐ'
    }

    renderItem = ({ item }) => {
        const giaMoi = ((100 - item.giatri) / 100) * this.stringToInt(item.tc_giaBan);
        return (
            <View>
                <Card>
                    <CardItem>
                        <Left>
                            <View style={{ position: 'relative' }}>
                                <Image style={{ width: 150, height: 150 }} source={{ uri: 'http://res.cloudinary.com/petshop/image/upload/' + item.ha_ten + '.png' }} />
                                {
                                    (item.giatri != null && item.giatri != 0) &&
                                    <View style={{ position: 'absolute', width: 40, height: 40, backgroundColor: '#f66', right: 0, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ marginLeft: -10 }}>
                                            <Text style={{ color: 'white' }}>
                                                -{item.giatri}%
                                            </Text>
                                        </View>
                                    </View>
                                }
                            </View>
                        </Left>
                        <Body style={{ flexDirection: 'column', marginLeft: 30, marginTop: 5 }}>
                            <Text style={styles.txtCard}>{item.tc_ten}</Text>
                            <Text style={(item.giatri != null && item.giatri != 0) ? styles.giaCu : styles.giaMoi}>{this.currencyFormat(this.stringToInt(item.tc_giaBan))}</Text>
                            {
                                (item.giatri != null && item.giatri != 0) &&
                                <Text style={styles.giaMoi}>{this.currencyFormat(this.stringToInt(giaMoi))}</Text>
                            }
                            <Text style={styles.txtCard}>{(item.tc_tuoi)}</Text>
                        </Body>
                    </CardItem>
                </Card>
            </View>
        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#f74877" />
                </View>
            )
        }
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
                <View style={{ flex: 1, marginTop: 20, justifyContent: 'center' }} >
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Lịch sử giao dịch</Text>
                    </View>
                    {
                        this.state.dh.map(e => {
                            return (
                                <View style={styles.body} key={e.dh_id}>
                                    <View style={styles.orderRow}>
                                        <View style={{ justifyContent: 'space-between', marginBottom: 5 }}>
                                            <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Đơn hàng id:</Text>
                                            <Text style={{ color: '#C21C70' }}>{e.dh_id}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-between', marginBottom: 5 }}>
                                            <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Người nhận:</Text>
                                            <Text style={{ color: '#C21C70' }}>{e.dh_nguoiNhan}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-between', marginBottom: 5 }}>
                                            <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Địa chỉ:</Text>
                                            <Text style={{ color: '#C21C70', fontWeight: 'bold' }}>{e.dh_diaChi}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-between', marginBottom: 5 }}>
                                            <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Điện thoại KH:</Text>
                                            <Text style={{ color: '#C21C70', fontWeight: 'bold' }}>{e.dh_dienThoai}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-between', marginBottom: 5 }}>
                                            <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Hình thức thanh toán:</Text>
                                            <Text style={{ color: '#C21C70', fontWeight: 'bold' }}>{e.httt_ten}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-between', marginBottom: 5 }}>
                                            <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Trạng thái đơn hàng:</Text>
                                            <Text style={{ color: '#C21C70', fontWeight: 'bold' }}>{e.ttdh_ten}</Text>
                                        </View>
                                        <Button iconLeft onPress={() => {
                                            this.setModalVisible(true)
                                            return fetch("http://petshopct.herokuapp.com/public/chitietdonhang/" + e.dh_id, {
                                                method: 'GET',
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Content-Type': 'application/json',
                                                }
                                            }).then((response) => {
                                                return response.json();
                                            }).then((responseJson) => {
                                                this.setState({
                                                    chitiet: responseJson.chitiet,
                                                    //tamtinh: responseJson.tamtinh
                                                });
                                                console.log(responseJson);
                                            }).catch((error) => {
                                                console.error(error);
                                            })
                                        }}
                                            style={{ backgroundColor: '#f74877', width: 180 }} >
                                            <Icon name="eye" type="Entypo" />
                                            <Text style={styles.textCont}>Xem đơn hàng</Text>
                                        </Button>
                                    </View>
                                    <Modal visible={this.state.modalVisible} transparent={false} animationType="slide">
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flex: 10 }}>
                                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: 10 }}>
                                                    <Text style={{ color: '#C21C70', fontWeight: 'bold', fontSize: 18 }}>Ngày đặt hàng: </Text>
                                                    <Text style={{ color: '#C21C70', fontWeight: 'bold', fontSize: 18 }}>{e.dh_ngayTao}</Text>
                                                </View>
                                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: 10 }}>
                                                    <Text style={{ color: '#C21C70', fontWeight: 'bold', fontSize: 18 }}>Tổng tiền: </Text>
                                                    <Text style={{ color: '#C21C70', fontWeight: 'bold', fontSize: 18 }}>{this.currencyFormat(this.stringToInt(e.dh_tongGia))}</Text>
                                                </View>
                                                <FlatList
                                                    data={this.state.chitiet}
                                                    renderItem={this.renderItem}
                                                    numColumns={1}
                                                    keyExtractor={item => item.tc_ten}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ margin: 5, justifyContent: 'center', alignItems: 'center' }}>
                                            <Button iconLeft style={{ backgroundColor: '#f74877', width: 110 }}
                                                onPress={() => {
                                                    this.setModalVisible(!this.state.modalVisible);
                                                }}>
                                                <Icon name="ccw" type="Entypo" />
                                                <Text style={styles.textCont}>Trở về</Text>
                                            </Button>
                                        </View>
                                    </Modal>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        )
    }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    body: {
        flex: 10,
        backgroundColor: '#F6F6F6'
    },
    headerTitle: {
        fontFamily: 'Avenir',
        color: 'black',
        fontSize: 30,
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
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#DFDFDF',
        shadowOpacity: 0.2,
        borderRadius: 2,
    },
    txtCard: {
        //fontWeight: 'bold',
        color: 'black',
        fontSize: 18,
        marginHorizontal: 5,
        flexDirection: 'row'
    },
    giaMoi: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 5,
        flexDirection: 'row'
    },
    giaCu: {
        color: 'black',
        fontSize: 18,
        textDecorationLine: 'line-through',
        textAlign: 'center',
        marginHorizontal: 5,
        flexDirection: 'row'
    },
    textCont: {
        fontSize: 18,
        color: 'white',
        marginLeft: 2,
        fontWeight: 'bold',
        paddingLeft: 5,
        paddingRight: 10,
    },
})

function mapStateToProps(state) {
    return {
        hoso: state.hoso
    }
}

export default connect(mapStateToProps)(LichSuGiaoDich);