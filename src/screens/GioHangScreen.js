import React, { Component } from 'react';
import { Icon, CardItem, Card, Left, Body, Button, Header } from 'native-base';
import { StyleSheet, View, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';


class GioHangScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //hide: true
        }
    }

    // componentDidMount() {
    //     console.log(this.props.hoso.length);
    //     //console.log(this.props.cart);
    //     // if(this.props.cart.length > 0){
    //     //     this.setState({ hide: false })
    //     // }
    // }

    Auth = () => {
        if (this.props.hoso.length == 0) {
            this.props.navigation.navigate('Login', { back: 'GioHangScreen' });

        } else {
            this.props.navigation.navigate('ThanhToan');
            //console.log(this.props.hoso.length);
        }
        console.log(this.props.hoso);
        // console.log(this.props.total);
        // console.log(this.props.cart);
    }

    StringtoInt(num) {
        return parseInt(num);
    }

    currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VNĐ'
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.cardCart}>
                <Card>
                    <CardItem>
                        <Left>
                            <View style={{position: 'relative'}}>
                                <Image style={styles.imageCard} source={{ uri: 'http://res.cloudinary.com/petshop/image/upload/' + item.ha_ten + '.png' }} />
                                {
                                    item.km != null &&
                                    <View style={{ position: 'absolute', width: 40, height: 40, backgroundColor: '#f66', right: 0, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{marginLeft: -10}}>
                                            <Text style={{ color: 'white' }}>
                                            -{item.km}%
                                            </Text>
                                        </View>
                                    </View>
                                }
                            </View>
                        </Left>
                        <Body style={{ flexDirection: 'column', marginLeft: 30, marginTop: 5 }}>
                            <Text style={styles.txtCard}>{item.tc_ten}</Text>
                            <Text style={item.km != 0 ? styles.giaCu : styles.giaMoi}>{this.currencyFormat(item.tc_giaBan)}</Text>
                            {
                                item.km != 0 &&
                                <Text style={styles.giaMoi}>{this.currencyFormat(item.giaKM)}</Text>
                            }
                            <Text style={styles.txtCard}>{(item.tc_tuoi)}</Text>
                            <Button iconLeft onPress={() => { this.props.dispatch({ type: 'REMOVE_FROM_CART', payload: item }) }}>
                                <Icon name="highlight-off" type="MaterialIcons" />
                                <Text style={styles.txtButton}>Hủy</Text>
                            </Button>
                        </Body>
                    </CardItem>
                </Card>
            </View>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <Header transparent />
                <FlatList
                    data={this.props.cart}
                    renderItem={this.renderItem}
                    numColumn={1}
                    keyExtractor={item => item.ha_ten}
                />
                <TouchableOpacity >
                    <View style={styles.viewTotal}>
                        <Text style={styles.txtView}>Tổng tiền</Text>
                        <Text style={styles.txtView}>{this.currencyFormat(this.props.total)}</Text>
                    </View>
                </TouchableOpacity>
                {
                    this.props.total > 0 &&
                    <TouchableOpacity onPress={this.Auth}>
                        <View style={styles.viewTotal}>
                            <Text style={styles.txtView}>Thanh toán</Text>
                        </View>
                    </TouchableOpacity >
                }
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageCard: {
        height: 150,
        width: 150,
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
    txtView: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 18,
        marginHorizontal: 5,
        flexDirection: 'row'
    },
    txtButton: {
        fontSize: 16,
        color: 'white',
        marginLeft: 2,
        fontWeight: 'bold',
        paddingLeft: 5,
        paddingRight: 10,
    },
    viewTotal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        backgroundColor: '#ff00ff',
        paddingVertical: 10,
        marginHorizontal: 16,
        borderRadius: 25,
        marginBottom: 5,
        height: 50
    },
    cardCart: {
        borderTopWidth: 1,
        paddingHorizontal: 10,
        borderColor: 'silver',
        marginTop: 10,
        flex: 1,
        paddingTop: 16
    }
});

function mapStateToProps(state) {
    return {
        cart: state.cart,
        total: state.total,
        hoso: state.hoso,
    }
}

export default connect(mapStateToProps)(GioHangScreen);