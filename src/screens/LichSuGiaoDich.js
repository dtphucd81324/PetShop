import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, Image, StyleSheet, ScrollView, Dimensions, ActivityIndicator
} from 'react-native';
import { Icon, Button, Header, Left, Right } from 'native-base';
import { HINH } from './Data';

export default class LichSuGiaoDich extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //arrOrder: [],
            dataSource: [],
            isLoading: true
        }
    }

    async componentDidMount() {
        await this.getDonHang();
        this.setState({ isLoading: false });
    }

    async getDonHang() {
        try {
            await fetch("http://petshopct.herokuapp.com/public/admin/list_donhang")
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        dataSource: responseJson,
                    });
                })
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
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
                    this.state.dataSource.map(e => {
                        return (
                            <View style={{ flex: 1, marginTop: 20, justifyContent: 'center' }} key={e.dh_id}>
                                <View style={styles.header}>
                                    <Text style={styles.headerTitle}>Lịch sử giao dịch</Text>
                                </View>
                                <View style={styles.body}>
                                    <View style={styles.orderRow}>
                                        <View style={{ justifyContent: 'space-between', marginBottom: 5 }}>
                                            <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Đơn hàng id:</Text>
                                            <Text style={{ color: '#C21C70' }}>{e.dh_id}</Text>
                                        </View>
                                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                            <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Image:</Text>
                                            <Image style={{ width: 50, height: 50 }} source={{ uri: e.hinh }} />
                                        </View> */}
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
                                            <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Ngày tạo ĐH:</Text>
                                            <Text style={{ color: '#C21C70', fontWeight: 'bold' }}>{e.dh_ngayTao}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-between', marginBottom: 5 }}>
                                            <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Tổng giá tiền:</Text>
                                            <Text style={{ color: '#C21C70', fontWeight: 'bold' }}>{e.dh_tongGia}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-between', marginBottom: 5 }}>
                                            <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Hình thức thanh toán:</Text>
                                            <Text style={{ color: '#C21C70', fontWeight: 'bold' }}>{e.httt_ten}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }

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
    }
})