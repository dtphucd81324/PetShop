import React, { Component } from 'react';
import { CardItem, Card, Icon, Button, Header, Left, Right } from 'native-base';
import { StyleSheet, View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import { connect } from 'react-redux';


class ChiTiet extends Component {
    static navigationOptions = {
        title: 'Chi tiết'
        //header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.navigation.state.params.data,
        }
    }
    buy = () => {
        let check = false;
        if (this.props.cart.length === 0) {
            this.props.dispatch({ type: 'ADD_TO_CART', payload: this.state.item });
            alert('Thêm thành công');
            this.props.navigation.navigate('GioHangScreen');
        }
        else {
            this.props.cart.map(e => {
                if (e.id === this.state.item.id) {
                    check = true;
                }
            })
            if (check) {
                alert('Sản phẩm đã tồn tại trong giỏ hàng');
            }
            else {
                this.props.dispatch({ type: 'ADD_TO_CART', payload: this.state.item });
                alert('Thêm thành công');
                this.props.navigation.navigate('GioHangScreen');
            }
        }

    }

    render() {
        return (
            <ScrollView>
                <Header transparent>
                    <Left>
                        <Button onPress={() => this.props.navigation.goBack()}>
                            <Icon name="undo" type="Ionicons" />
                        </Button>
                    </Left>
                    <Right />
                </Header>
                <View style={styles.container}>
                    <SafeAreaView>
                        <Card>
                            <CardItem>
                                <Image style={{ height: 250, width: '100%' }} source={{ uri: this.state.item.hinh }} />
                            </CardItem>
                            <CardItem>
                                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{this.state.item.ten}</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={{ fontSize: 24, color: 'red' }}>{this.state.item.gia} {this.state.item.currency}</Text>
                                <View style={styles.viewButton}>
                                    <Button iconLeft onPress={this.buy} >
                                        <Icon name="shopping-cart" type="Feather" />
                                        <Text style={styles.textCont}>Thêm vào giỏ hàng</Text>
                                    </Button>
                                </View>
                            </CardItem>
                        </Card>
                    </SafeAreaView>
                </View>
            </ScrollView>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        cart: state.cart
    }
}

export default connect(mapStatetoProps)(ChiTiet);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textCont: {
        fontSize: 18,
        color: 'white',
        marginLeft: 2,
        fontWeight: 'bold',
        paddingLeft: 5,
        paddingRight: 10,
    },
    viewContent: {
        flexDirection: 'row',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    viewButton: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});