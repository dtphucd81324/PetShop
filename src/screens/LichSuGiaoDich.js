import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, Image, StyleSheet, ScrollView, Dimensions
} from 'react-native';
import { Icon, Button, Header, Left, Right } from 'native-base';
import { HINH } from './Data';

export default class LichSuGiaoDich extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrOrder: [],
        }
    }

    componentDidMount() {
        this.setState({ arrOrder: HINH });
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
                <View style={{ flex: 1, marginTop: 20, justifyContent: 'center' }}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Lịch sử giao dịch</Text>
                    </View>
                    <View style={styles.body}>
                        {
                            this.state.arrOrder.map(e => (
                                <View style={styles.orderRow} key={e.id}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                        <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Order id:</Text>
                                        <Text style={{ color: '#2ABB9C' }}>ORD {e.id}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                        <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>OrderImage:</Text>
                                        <Image style={{ width: 50, height: 50 }} source={{ uri: e.hinh }} />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                        <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Tên:</Text>
                                        <Text style={{ color: '#2ABB9C' }}>{e.ten}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                        <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Giá:</Text>
                                        <Text style={{ color: '#C21C70', fontWeight: 'bold' }}>{e.gia} {e.currency}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'space-between', marginBottom: 5 }}>
                                        <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Mô tả:</Text>
                                        <Text style={{ color: '#C21C70', fontWeight: 'bold' }}>{e.description}</Text>
                                    </View>
                                </View>
                            ))}
                    </View>
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
    }
})