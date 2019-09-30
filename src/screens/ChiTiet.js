import React, { Component } from 'react';
import { CardItem, Card, Icon, Content, Button } from 'native-base';
import { StyleSheet, View, TouchableOpacity, Text, Image, SafeAreaView } from 'react-native';


export default class ChiTiet extends Component {
    static navigationOptions = {
        title: 'Chi tiết'
        //header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.navigation.state.params
        }
    }
    _onRefresh() {

    };

    render() {
        const { goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <SafeAreaView>
                    <Card>
                        <CardItem>
                            <Image style={{ height: 250, width: '100%' }} source={{ uri: this.state.item.data.hinh }} />
                        </CardItem>
                        <CardItem>
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{this.state.item.data.ten}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{ fontSize: 24, color: 'red' }}>{this.state.item.data.gia}</Text>
                            <View style={{ flexDirection: 'row', flex: 1, paddingLeft: 50 }}>
                                <Button iconLeft>
                                    <Icon name='cart' size={25} />
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
        paddingLeft: 5
    },
    viewContent: {
        flexDirection: 'row',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
});