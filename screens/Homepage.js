import React, { Component } from 'react';
import { Icon, Header, Left, Right, Container, Body } from 'native-base';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import Slideshow from 'react-native-image-slider-show';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Search from './Search';
import GioHang from './GioHang';
import ThongTin from './ThongTin';
//import HinhAnh from './HinhAnh';



class Homepage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            position: 1,
            interval: null,
            dataSource: [
                {
                    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG8RpxYDSJZiKXXHRQnQCEal6VYbhqkK4QrJY7YSaIRWjzEtkN',
                }, {
                    url: 'https://dogily.vn/wp-content/uploads/2019/03/hinh-anh-cho-corgi-thuan-chung-1.jpg',
                }, {
                    url: 'http://huanluyencanhkhuyen24h.com/wp-content/uploads/2017/11/huan-luyen-cho-corgi.jpg',
                },
            ],
        };
    }
    componentWillMount() {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
                });
            }, 5000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }
    render() {
        return (
            <ScrollView scrollEventThrottle={16} pagingEnabled>
                <Header transparent style={{ backgroundColor: '#e91e63' }}>
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
                <View style={{paddingLeft: 10, paddingRight: 10 }}>
                    {/* <View >
                        <ImageBackground source={require('./src/images/dog.jpg')} 
                            style={{ width: '100%', height: '100%', 
                            alignItems: 'center', justifyContent: 'center' }}>
                        </ImageBackground>
                    </View> */}
                    <View style={{flex: 1, paddingTop: 20, }}>
                        <Slideshow
                                dataSource={this.state.dataSource}
                                position={this.state.position}
                                onPositionChanged={position => this.setState({ position })} />
                    </View>
                    <View style={{ backgroundColor: 'white', paddingTop: 15 }}>
                        <Text style={styles.textContent}>Chó Alaska</Text>
                    </View>
                    <View style={{ height: 130, marginTop: 20}}>
                        <ScrollView horizontal={true} scrollEventThrottle={16} pagingEnabled>
                            <View style={styles.image}>                   
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/alaska1.jpg')}
                                        style={{ flex: 1, width: null, height: null, 
                                        resizeMode: 'cover'}} />
                                </View>
                            </View>
                            <View style={styles.image}>                   
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/alaska2.jpg')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                                </View>
                            </View>
                            <View style={styles.image}>                   
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/alaska3.jpg')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                                </View>
                            </View>
                            <View style={styles.image}>                   
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/alaska4.jpg')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{ backgroundColor: 'white', paddingTop: 15 }}>
                        <Text style={styles.textContent}>Chó Husky</Text>
                    </View>
                    <View style={{ height: 130, marginTop: 20}}>
                        <ScrollView horizontal={true} scrollEventThrottle={10}>
                            <View style={styles.image}>                   
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/husky1.jpg')}
                                        style={{ flex: 1, width: null, height: null, 
                                        resizeMode: 'cover'}} />
                                </View>
                            </View>
                            <View style={styles.image}>                   
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/husky2.jpg')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                                </View>
                            </View>
                            <View style={styles.image}>                   
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/husky3.jpg')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                                </View>
                            </View>
                            <View style={styles.image}>                   
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/husky4.jpg')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{ backgroundColor: 'white', paddingTop: 15 }}>
                        <Text style={styles.textContent}>Chó Poodle</Text>
                    </View>
                    <View style={{ height: 130, marginTop: 20}}>
                        <ScrollView horizontal={true} scrollEventThrottle={10}>
                            <View style={styles.image}>                   
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/poodle1.jpg')}
                                        style={{ flex: 1, width: null, height: null, 
                                        resizeMode: 'cover'}} />
                                </View>
                            </View>
                            <View style={styles.image}>                   
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/poodle2.jpg')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                                </View>
                            </View>
                            <View style={styles.image}>                   
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/poodle3.jpg')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                                </View>
                            </View>
                            <View style={styles.image}>                   
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/poodle4.jpg')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{ backgroundColor: 'white', paddingTop: 15 }}>
                        <Text style={styles.textContent}>Chó Pug</Text>
                    </View>
                    <View style={{ height: 130, marginTop: 20}}>
                        <ScrollView horizontal={true} scrollEventThrottle={10}>
                            <View style={styles.image}>                   
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/pug1.jpg')}
                                        style={{ flex: 1, width: null, height: null, 
                                        resizeMode: 'cover'}} />
                                </View>
                            </View>
                            <View style={styles.image}>                   
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/pug2.jpg')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                                </View>
                            </View>
                            <View style={styles.image}>                   
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/pug3.jpg')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                                </View>
                            </View>
                            <View style={styles.image}>                   
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/pug4.jpg')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{ backgroundColor: 'white', paddingTop: 15 }}>
                        <Text style={styles.textContent}>Chó Pull</Text>
                    </View>
                    <View style={{ height: 130, marginTop: 20}}>
                        <ScrollView horizontal={true} scrollEventThrottle={10}>
                            <View style={styles.image}>                   
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/pull1.jpg')}
                                        style={{ flex: 1, width: null, height: null, 
                                        resizeMode: 'cover'}} />
                                </View>
                            </View>
                            <View style={styles.image}>                   
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/pull2.jpg')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                                </View>
                            </View>
                            <View style={styles.image}>                   
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/pull3.jpg')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                                </View>
                            </View>
                            <View style={styles.image}>                   
                                <View style={{ flex: 2 }}>
                                    <Image source={require('./src/images/pull4.jpg')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                                </View>
                            </View>
                        </ScrollView>
                    </View>  
                </View>                                                                                 
            </ScrollView>                
        );
    }
}
const styles = StyleSheet.create({
    container: {
        //backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',

    },
    textCont: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    textContent:{
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },
    image:{
        height: 130,
        width: 130,
        marginLeft: 10,
        borderWidth: 0.5,
        borderColor: '#dddddd'
    }
});

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
        Search: {
            screen: Search,
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
        GioHang: {
            screen: GioHang,

        },
        ThongTin: ThongTin
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
