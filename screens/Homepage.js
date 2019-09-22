import React, { Component } from 'react';
import { Icon, Header, Left, Right, Body, Card, CardItem } from 'native-base';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Dimensions, SafeAreaView } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';
import SearchScreen from './SearchScreen';
import GioHangScreen from './GioHangScreen';
import ThongTinScreen from './ThongTinScreen';
import ChiTiet from './ChiTiet';

const { height } = Dimensions.get('window');

const HINH = [
    {
        ten: 'Chó Cảnh',
        hinh: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG8RpxYDSJZiKXXHRQnQCEal6VYbhqkK4QrJY7YSaIRWjzEtkN',
    }, {
        ten: 'Chó Cảnh',
        hinh: 'https://dogily.vn/wp-content/uploads/2019/03/hinh-anh-cho-corgi-thuan-chung-1.jpg',
    }, {
        ten: 'Chó Cảnh',
        hinh: 'http://huanluyencanhkhuyen24h.com/wp-content/uploads/2017/11/huan-luyen-cho-corgi.jpg',
    },

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
                            <Image style={{ width: 300, height: 300 }} source={{ uri: item.hinh }} />
                        </CardItem>
                        <CardItem>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.ten}</Text>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <ScrollView>
                <View style={{ height: height / 10 }}>
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
                </View>
                <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <SafeAreaView>
                        <Carousel
                            data={this.state.dataSource}
                            renderItem={this.renderItem}
                            sliderWidth={450}
                            itemWidth={250}
                        />
                    </SafeAreaView>
                    <View style={{ backgroundColor: 'white', paddingTop: 15 }}>
                        <Text style={styles.textContent}>Chó Alaska</Text>
                    </View>
                    <View style={{ height: 130, marginTop: 20 }}>
                        <ScrollView horizontal={true} scrollEventThrottle={16} pagingEnabled>
                            <View style={styles.image}>
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/alaska1.jpg')}
                                        style={{
                                            flex: 1, width: null, height: null,
                                            resizeMode: 'cover'
                                        }} />
                                </View>
                            </View>
                            <View style={styles.image}>
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/alaska2.jpg')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
                                </View>
                            </View>
                            <View style={styles.image}>
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/alaska3.jpg')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
                                </View>
                            </View>
                            <View style={styles.image}>
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/alaska4.jpg')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{ backgroundColor: 'white', paddingTop: 15 }}>
                        <Text style={styles.textContent}>Chó Husky</Text>
                    </View>
                    <View style={{ height: 130, marginTop: 20 }}>
                        <ScrollView horizontal={true} scrollEventThrottle={10}>
                            <View style={styles.image}>
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/husky1.jpg')}
                                        style={{
                                            flex: 1, width: null, height: null,
                                            resizeMode: 'cover'
                                        }} />
                                </View>
                            </View>
                            <View style={styles.image}>
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/husky2.jpg')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
                                </View>
                            </View>
                            <View style={styles.image}>
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/husky3.jpg')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
                                </View>
                            </View>
                            <View style={styles.image}>
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/husky4.jpg')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
                                </View>
                            </View>
                        </ScrollView>
                    </View>
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

