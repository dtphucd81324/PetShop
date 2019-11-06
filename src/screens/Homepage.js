import React, { Component } from 'react';
import { Icon, Card, CardItem, Header, Left, Body, Right, Title } from 'native-base';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Dimensions, SafeAreaView, ActivityIndicator } from 'react-native';
//import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';
import ChiTiet from './ChiTiet';
//import { HINH } from './Data';
const { height } = Dimensions.get('window');



class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isLoading: true,
            //loai: [],
            category: [],
        };
    };

    async componentDidMount() {
        await this.getThuCung();
        //this.getLoaiThuCung();
        await this.getGiongThuCung();
        this.setState({ isLoading: false });
    }

    async getThuCung() {
        try {
            await fetch("http://petshopct.herokuapp.com/public/admin/list_thucung")
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        dataSource: responseJson,
                        //isLoading: false,
                    });
                    console.log(responseJson);
                })
        } catch (error) {
            console.error(error);
        }
    }

    
    async getGiongThuCung() {
        try {
            await fetch("http://petshopct.herokuapp.com/public/admin/list_giong")
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        category: responseJson,
                    });
                    console.log(responseJson);
                })
        } catch (error) {
            console.error(error);
        }
    }

    StringtoInt(num) {
        return parseInt(num);
    }

    currencyFormat(num) {
        num = parseInt(num)
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VNĐ'
    }

    FlatViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: 0.3,
                    width: '90%',
                    backgroundColor: '#080808',
                }}
            />
        );
    };

    renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ChiTiet', { item: item })}>
                    <Card>
                        <CardItem>
                            <Image style={{ width: 200, height: 200 }} source={{ uri: 'http://res.cloudinary.com/petshop/image/upload/' + item.ha_ten + '.png' }} />
                        </CardItem>
                        <CardItem>
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{item.tc_ten}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{ fontSize: 24, color: 'red' }}>{this.currencyFormat(item.tc_giaBan)}</Text>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#ff00ff" />
                </View>
            )
        }
        return (
            <ScrollView showsHorizontalScrollIndicator={false}>
                <Header transparent style={{ backgroundColor: '#7fffd4', marginBottom: 20 }}>
                    <Left />
                    <Body style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                        <Image source={require('../images/petshopt.png')} style={{ width: '100%', height: '100%' }} />
                    </Body>
                    <Right />
                </Header>
                <View>
                    {
                        this.state.category.map(e => {
                            return (
                                <View key={e.g_id}>
                                    <View style={styles.carousel}>
                                        <Text style={styles.textContent}>{e.g_ten}</Text>
                                    </View>
                                    <SafeAreaView>
                                        <Carousel
                                            data={this.state.dataSource.filter(function (item, index) {
                                                return item.g_id === e.g_id && index < 9
                                            })}
                                            renderItem={this.renderItem}
                                            sliderWidth={400}
                                            itemWidth={250}
                                            layoutCardOffset={`18`}
                                            key={item => item.tc_id}
                                        />
                                    </SafeAreaView>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    },
    textCont: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        justifyContent: 'space-between',

    },
    background: {
        width: '100%',
    },
    carousel: {
        flex: 1,
        paddingTop: 10,
        height: 50,
        width: '100%',
        paddingLeft: 15,
        backgroundColor: '#ff00ff',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    textContent: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
});

export default Homepage;
