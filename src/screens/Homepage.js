import React, { Component } from 'react';
import { Icon, Card, CardItem, Header, Left, Body, Right, Title } from 'native-base';
import {
    StyleSheet, View, Text, TouchableOpacity,
    ScrollView, Image, Dimensions, SafeAreaView,
    ActivityIndicator, ImageBackground
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
//const { height } = Dimensions.get('window');

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isLoading: true,
            //loai: [],
            //loaithucung: [],
            category: [],
        };
    };

    async componentDidMount() {
        await this.getData();
        //this.getLoaiThuCung();
        await this.getGiongThuCung();
        this.setState({ isLoading: false });
    }

    async getData() {
        return fetch('http://petshopct.herokuapp.com/public/thu-cung-api', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.danhsachthucung.data,
                    //loaithucung: responseJson.loaithucung
                });
                //console.log(responseJson);
                console.log(responseJson);
                //console.log(this.state.loaithucung);
            })
            .catch((error) => {
                console.error(error);
            })
    }


    async getGiongThuCung() {
        try {
            await fetch("http://petshopct.herokuapp.com/public/admin/list_giong", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        category: responseJson,
                    });
                    //console.log(responseJson);
                })
        } catch (error) {
            console.error(error);
        }
    }

    StringtoInt(num) {
        num = parseInt(num);
        return num;
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
        //const km = item.giatri;
        const percent = parseInt(item.giatri);
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ChiTiet', { item: item })}>
                    <Card>
                        <CardItem>
                            <View style={{ position: 'relative' }}>
                                <Image style={{ width: 200, height: 200 }} source={{ uri: 'http://res.cloudinary.com/petshop/image/upload/' + item.ha_ten + '.png' }} />
                                {
                                    (item.giatri != null && item.giatri != 0) &&
                                    <View style={{ position: 'absolute', width: 40, height: 40, backgroundColor: '#f66', right: 0, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                        <Text style={{ color: 'white' }}>
                                            -{item.giatri}%
                                        </Text>
                                    </View>
                                }
                            </View>
                        </CardItem>
                        <CardItem style={{ textAlign: 'center', justifyContent: 'center' }}>
                            <View>
                                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{item.tc_ten}</Text>
                            </View>
                        </CardItem>
                        <CardItem style={{ flexDirection: 'column', height: 50, paddingTop: -10, justifyContent: 'center' }}>
                            <View>
                                <Text style={(item.giatri != null && item.giatri != 0) ? styles.giaCu : styles.giaMoi}>{this.currencyFormat(this.StringtoInt(item.tc_giaBan))}</Text>
                                {
                                    (item.giatri != null && item.giatri != 0) &&
                                    <Text style={styles.giaMoi}>
                                        {this.currencyFormat(this.StringtoInt(item.tc_giaBan) * (1 - (percent / 100)))}
                                    </Text>

                                }
                            </View>
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
                    <ActivityIndicator size="large" color="#f74877" />
                </View>
            )
        }
        return (
            <ScrollView>
                <Header transparent style={{ backgroundColor: '#dcdcdc', marginBottom: 20 }}>
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
                                        <ImageBackground source={require('../images/petshopt.png')} style={styles.background}>
                                            <Text style={styles.textContent}>{e.g_ten}</Text>
                                        </ImageBackground>
                                    </View>
                                    <SafeAreaView>
                                        <Carousel
                                            data={this.state.dataSource.filter(function (item, index) {
                                                return item.g_id === e.g_id && index < 12
                                            })}
                                            renderItem={this.renderItem}
                                            sliderWidth={400}
                                            itemWidth={250}
                                            //layoutCardOffset={`18`}
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
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        justifyContent: 'space-between',
    },
    background: {
        width: '100%',
        height: '100%',
        opacity: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    carousel: {
        flex: 1,
        paddingTop: 10,
        height: 70,
        width: '100%',
        paddingLeft: 15,
        backgroundColor: '#dcdcdc',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    textContent: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold'
    },
    giaMoi: {
        color: 'red',
        fontSize: 24,
    },
    giaCu: {
        color: 'black',
        fontSize: 24,
        textDecorationLine: 'line-through'
    },
});

function mapStateToProps(state) {
    return {
        cart: state.cart,
        //count: state.count
    }
}

export default connect(mapStateToProps)(Homepage);
