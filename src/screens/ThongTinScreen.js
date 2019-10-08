import React, { Component } from 'react';
import { Icon, Thumbnail, List, ListItem, Left, Right } from 'native-base';
import { StyleSheet, View, TouchableOpacity, Text, ImageBackground } from 'react-native';


export default class ThongTinScreen extends Component {

    constructor(props) {
        super(props);
    }

    list = () => {

    };

    render() {
        const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
        return (
            <View style={styles.container}>
                <View style={styles.viewImage}>
                    <ImageBackground source={require('../images/husky.jpg')} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        {/* <View style={styles.Image}>
                            <Image />
                        </View> */}

                        <Thumbnail large style={styles.thumbnail} source={{ uri: uri }} />

                    </ImageBackground>
                </View>

                <View style={{ flex: 1 }}>
                    <List>
                        <ListItem>
                            <Left>
                                <Icon name="commenting" type="FontAwesome" />
                                <Text style={styles.textList}>Hỗ trợ</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem >
                            <Left>
                                <Icon name="bell" type="FontAwesome" />
                                <Text style={styles.textList}>Thông báo</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem >
                            <Left>
                                <Icon name="history" type="FontAwesome" />
                                <Text style={styles.textList}>Lịch sử giao dịch</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                    </List>
                    <List>
                        <ListItem>
                            <Left>
                                <Icon name="refresh" type="FontAwesome" />
                                <Text style={styles.textList}>Thay đổi mật khẩu</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem >
                            <Left>
                                <Icon name="user-circle-o" type="FontAwesome" />
                                <Text style={styles.textList}>Đăng nhập</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                    </List>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',

    },
    viewImage: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    thumbnail: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },

    Image: {
        //flex: 1,
        width: 100,
        height: 120,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ccc'
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
    textList: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 10,

    }
});