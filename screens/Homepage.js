import React, { Component } from 'react';
import { Icon, Header, Left, Right, Body, Card, CardItem } from 'native-base';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Dimensions, SafeAreaView, ImageBackground } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';
import SearchScreen from './SearchScreen';
import GioHangScreen from './GioHangScreen';
import ThongTinScreen from './ThongTinScreen';
import ChiTiet from './ChiTiet';

const { height } = Dimensions.get('window');

const HINH = [
    {
        id: '1',
        ten: 'Chó Corgi',
        hinh: 'https://petlife.vn/wp-content/uploads/2019/08/corgi-1-e1564971550251.jpg',
        gia: '500.000'
    }, {
        id: '2',
        ten: 'Chó Cảnh',
        hinh: 'https://znews-photo.zadn.vn/w1024/Uploaded/ofh_btgazstm/2019_05_01/corgi1.jpg',
        gia: '2.000.000'
    }, {
        id: '3',
        ten: 'Chó Cảnh',
        hinh: 'https://www.xahara.vn/wp-content/uploads/%E1%BA%A2nh-ch%C3%B3-husky-m%E1%BA%B7t-ng%C3%A1o-%C4%91%E1%BA%B9p.jpg',
        gia: '600.000'
    },
    {
        id: '4',
        ten: 'Chó Cảnh',
        hinh: 'https://chobaove.com/wp-content/uploads/2018/07/husky-1.jpg',
        gia: '800.000'
    }

]

class Homepage extends Component {
    static navigationOptions = {
        title: 'Trang chủ'
    }
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            itemSelected: [],
        };
    };

    componentDidMount() {
        this.setState({ dataSource: HINH });
    }

    renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ChiTiet', { data: item })}>
                    <Card>
                        <CardItem>
                            <Image style={{ width: 350, height: 300 }} source={{ uri: item.hinh }} />
                        </CardItem>
                        <CardItem>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.ten}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{ fontSize: 16, color: 'red' }}>{item.gia}</Text>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <ScrollView>
                <Header transparent style={{ backgroundColor: '#e91e63', justifyContent: 'space-between' }}>
                    <Left>
                        <TouchableOpacity>
                            <View style={styles.viewContent}>
                                <Icon name="grid" type="Feather" style={{ color: 'white' }} />
                            </View>
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={styles.textCont}>Trang chủ</Text>
                    </Body>
                    <Right>
                        <TouchableOpacity>
                            <View style={styles.viewContent}>
                                <Icon name="menu-unfold" type="AntDesign" style={{ color: 'white' }} />
                            </View>
                        </TouchableOpacity>
                    </Right>
                </Header>
                <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <SafeAreaView>
                        <Carousel
                            data={this.state.dataSource}
                            renderItem={this.renderItem}
                            sliderWidth={400}
                            itemWidth={380}
                        />
                    </SafeAreaView>
                </View>
                <View>
                    <View style={{ backgroundColor: 'white', paddingTop: 15 }}>
                        <ImageBackground source={require('./src/images/dog.jpg')} style={{ width: '100%'}}>
                            <Text style={styles.textContent}>Chó Alaska</Text>
                        </ImageBackground>
                    </View>
                    <SafeAreaView>
                        <Carousel
                            data={this.state.dataSource}
                            renderItem={this.renderItem}
                            sliderWidth={400}
                            itemWidth={250}
                            layoutCardOffset={`15`}
                        />
                    </SafeAreaView>
                </View>
                <View>
                    <View style={{ backgroundColor: 'white', paddingTop: 15 }}>
                        <Text style={styles.textContent}>Chó Husky</Text>
                    </View>
                    <SafeAreaView>
                        <Carousel
                            data={this.state.dataSource}
                            renderItem={this.renderItem}
                            sliderWidth={400}
                            itemWidth={250}
                            layoutCardOffset={`15`}
                        />
                    </SafeAreaView>
                </View>
            </ScrollView>
        );
    }
}


export default createAppContainer(createBottomTabNavigator(
    {
        Homepage: {
            screen: Homepage,
            navigationOptions: {
                title: 'Trang chủ',
                fontWeight: 'bold',
                tabBarIcon: ({ tintColor }) => {
                    return <Icon name="md-home" style={{ color: tintColor ? '#e91e63' : 'slategray' }} />
                },
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            },
        },
        SearchScreen: {
            screen: SearchScreen,
            header: {
                headerMode: 'none',
            },
            navigationOptions: {
                title: 'Tìm kiếm',
                fontWeight: 'bold',
                tabBarIcon: ({ tintColor }) => {
                    return <Icon name="search" style={{ color: tintColor ? '#e91e63' : 'slategray' }} />
                }
            }

        },
        GioHangScreen: {
            screen: GioHangScreen,

        },
        ThongTinScreen: {
            screen: ThongTinScreen
        },
    }, {
    initialRouteName: 'Homepage',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
        showIcon: true,
        showLabel: true,
    }
}
));
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    },
    textCont: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        justifyContent: 'space-between',

    },
    textContent: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },
    image: {
        height: 130,
        width: 130,
        marginLeft: 10,
        borderWidth: 0.5,
        borderColor: '#dddddd',
        borderRadius: 7
    }
});

