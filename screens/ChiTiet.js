import React, { Component } from 'react';
import { Header, Left, Right, Container, Body, Icon, CardItem, Card } from 'native-base';
import { StyleSheet, View, TouchableOpacity, Text, Image, SafeAreaView } from 'react-native';


export default class ThongTinScreen extends Component {
    static navigationOptions = {
        title: 'Chi tiết',
    };
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        };
    }

    _onRefresh() {

    }

    render() {
        const Data = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;
        console.log(Data);
        const { goBack } = this.props.navigation;
        return (
            <Container>
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
                                <Image style={{ height: 250, width: '100%'}} source={{ uri: Data.hinh }} />
                            </CardItem>
                        </Card>
                    </SafeAreaView>
                </View>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        //backgroundColor: 'steelblue',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textCont: {
        fontSize: 18,
        color: 'white',
        //fontWeight: '500',
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