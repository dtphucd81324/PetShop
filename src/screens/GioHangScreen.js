import React, { Component } from 'react';
import { Icon, CardItem, Card, Left, Right, Body, Button } from 'native-base';
import { StyleSheet, View, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';
import RNPaypal from 'react-native-paypal-android';

const client = {
    sandbox: 'Ab8TrmGWdj0gBEMT-ScrcED4uZFwv9pbesmu2lex5ey3isdJzOFIrqwuxJh99yLB2EivWaa1y0lMzC6Y',
}

class GioHangScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.cart);
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.cardCart}>
                <Card>
                    <CardItem>
                        <Left>
                            <CardItem>
                                <Image style={styles.imageCard} source={{ uri: 'http://res.cloudinary.com/petshop/image/upload/15_0_meo-tai-cup-3-.jpg.png' }} />
                            </CardItem>
                        </Left>
                        <Body style={{ flexDirection: 'column' }}>
                            <CardItem>
                                <Text style={styles.txtCard}>{item.tc_ten}</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={styles.txtCard}>{item.tc_giaBan}</Text>
                                {/* <Text style={styles.txtCard}>VNĐ</Text> */}
                            </CardItem>
                            <View style={styles.viewButton}>
                                <Button iconLeft onPress={() => { this.props.dispatch({ type: 'REMOVE_FROM_CART', payload: item }) }}>
                                    <Icon name="highlight-off" type="MaterialIcons" />
                                    <Text style={styles.txtButton}>Hủy</Text>
                                </Button>
                            </View>
                        </Body>
                        {/* <Right /> */}
                        {/* <Right style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.viewButton}>
                                <Button iconLeft onPress={() => { this.props.dispatch({ type: 'REMOVE_FROM_CART', payload: item }) }}>
                                    <Icon name="highlight-off" type="MaterialIcons" />
                                    <Text style={styles.txtButton}>Hủy</Text>
                                </Button>
                            </View>
                        </Right> */}
                    </CardItem>
                </Card>
            </View>
        )
    };


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.cart}
                    renderItem={this.renderItem}
                    numColumn={1}
                    keyExtractor={item => item.id}
                />
                <TouchableOpacity>
                    <View style={styles.viewTotal}>
                        <Text style={styles.txtCard}>Tổng tiền</Text>
                        <Text style={styles.txtCard}>{this.props.total} USD</Text>
                    </View>
                </TouchableOpacity>
                {
                    this.props.total > 0 &&
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ThanhToan', {})}>
                        <View style={styles.viewTotal}>
                            <Text style={styles.txtCard}>Thanh toán</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        cart: state.cart,
        total: state.total
    }
}

export default connect(mapStatetoProps)(GioHangScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    viewContent: {
        textAlign: 'center',
        color: 'blue',
        fontSize: 24,
        justifyContent: 'center'
    },
    imageCard: {
        height: 100,
        width: 100,
    },
    txtCard: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 18,
        marginHorizontal: 5,
        flexDirection: 'row'
    },
    viewButton: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginLeft: 10,
        justifyContent: 'center', 
        alignItems: 'center',
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
    viewPaypal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    btnPaypal: {
        paddingVertical: 10,
        marginHorizontal: 16,
        borderRadius: 25,
        marginBottom: 5,
        height: 50,
        justifyContent: 'space-around',
        alignContent: 'center',
        backgroundColor: '#ff00ff',
    },
    cardCart: {
        //borderBottomWidth: 1,
        borderTopWidth: 1,
        paddingHorizontal: 10,
        borderColor: 'silver',
        marginTop: 10,
        flex: 1,
        paddingTop: 16
    }
});