import React, { Component } from 'react';
import { CardItem, Card, Icon, Button } from 'native-base';
import { StyleSheet, View, TouchableOpacity, Text, Image, SafeAreaView } from 'react-native';
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
         this.props.dispatch({type:'ADD_TO_CART', payload: this.state.item});
         alert('Thêm thành công')
        //console.log(this.props.cart);
    }

    render() {
        //const { goBack } = this.props.navigation;
        return (
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
                            <Text style={{ fontSize: 24, color: 'red' }}>{this.state.item.gia}</Text>
                            <View style={styles.viewButton}>
                                <Button iconLeft onPress={this.buy} >
                                    <Text style={styles.textCont}>Thêm vào giỏ hàng</Text>
                                </Button>
                            </View>
                        </CardItem>
                    </Card>
                </SafeAreaView>
            </View>
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