import React, { Component } from 'react';
import { Icon, Thumbnail, List, ListItem, Left, Right } from 'native-base';
import { StyleSheet, View, SafeAreaView, ScrollView, Image, ImageBackground, Text } from 'react-native';



export default class ThongTinScreen extends Component {

    constructor(props) {
        super(props);
    }

    list = () => {

    };

    render() {
        return (
            // <SafeAreaView style={styles.container}>
            //     <ScrollView showsHorizontalScrollIndicator={false}>
            //         <View style={styles.titleBar}>
            //             <Icon name="arrow-back" type="Ionicons" size={24} color="#52575D"></Icon>
            //             <Icon name="md-more" type="Ionicons" size={24} color="#52575D"></Icon>
            //         </View>

            //         <View style={{ alignSelf: 'center' }}>
            //             <View style={styles.profileImage}>
            //                 <Thumbnail large style={styles.image} source={require('../images/images.jpg')} resizeMode="center" />
            //             </View>
            //         </View>
            //     </ScrollView>
            // </SafeAreaView>
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <Icon name="arrow-back" type="Ionicons" size={24} color="#52575D"></Icon>
                    <Icon name="md-more" type="Ionicons" size={24} color="#52575D"></Icon>
                </View>
                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Thumbnail large style={styles.thumbnail} source={require('../images/images.jpg')} />
                    </View>
                    <View style={styles.dm}>
                        <Icon name="chat" type="MaterialIcons" size={18} color="#DFD8C8"></Icon>
                    </View>
                    <View style={styles.active}></View>
                    <View style={styles.add}>
                        <Icon name="add" type="Ionicons" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Icon>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Phúc</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Information technology</Text>
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
    },
    viewImage: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    thumbnail: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
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

    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer:{
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    }
});