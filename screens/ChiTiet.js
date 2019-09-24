import React, { Component } from 'react';
import { Header, Left, Right, Body, Icon, CardItem, Card } from 'native-base';
import { StyleSheet, View, TouchableOpacity, Text, Image, SafeAreaView } from 'react-native';


export default class ThongTinScreen extends Component {
    static navigationOptions = {
        title: 'Chi tiết',
    };
    constructor(props){
        super(props);
        this.state = {
            item: this.props.navigation.state.params
        }
    }
    _onRefresh() {

    };

    render() {
        // const Data = this.props.navigation.state.params;
        //console.log(this.state.item.data);
        const { goBack } = this.props.navigation;
        return (
            <View style={{ flex: 1 }}>
                <Header style={{ backgroundColor: '#e91e63' }}>
                    <Left>
                        <TouchableOpacity onPress={() => goBack()}>
                            <View style={styles.viewContent}>
                                <Icon name="left" type="AntDesign" style={{ color: 'white' }} />
                            </View>
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={styles.textCont}>Chi tiết sản phẩm</Text>
                    </Body>
                    <Right>
                        <TouchableOpacity>
                            <View style={styles.viewContent}>
                                <Icon name="menu-unfold" type="AntDesign" style={{ color: 'white' }} />
                            </View>
                        </TouchableOpacity>
                    </Right>
                </Header>
                <View style={styles.container}>
                    <SafeAreaView>
                        <Card>
                            <CardItem>
                                <Image style={{ height: 250, width: '100%' }} source={{ uri: this.state.item.data.hinh }} />
                            </CardItem>
                            <CardItem>
                                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{ this.state.item.data.ten }</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={{ fontSize: 24, color: 'red' }}>{ this.state.item.data.gia }</Text>
                            </CardItem>
                        </Card>
                    </SafeAreaView>
                </View>
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
        fontWeight: 'bold'
    },
    viewContent: {
        flexDirection: 'row',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
});