import React, { Component } from 'react';
import { Icon, Thumbnail, List, ListItem, Left, Right } from 'native-base';
import { StyleSheet, View, SafeAreaView, ScrollView, Image, ImageBackground, Text, ActivityIndicator } from 'react-native';

import ImagePicker from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class ThongTinScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            dataSource: [],
            isLoading: true
        }
    }

    async componentDidMount() {
        await this.getKhachHang();
        this.setState({ isLoading: false })
    }

    async getKhachHang() {
        try {
            await fetch("http://petshopct.herokuapp.com/public/admin/list_khachhang")
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        dataSource: responseJson,
                    });
                })
        } catch (error) {
            console.error(error);
        }
    }

    showImage = () => {
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#ff00ff" />
                </View>
            )
        }
        let img = this.state.avatarSource == null ?
            <Thumbnail large
                source={require('../images/images.jpg')}
                style={styles.thumbnail}
            />
            :
            <Thumbnail large
                source={this.state.avatarSource}
                style={styles.thumbnail}
            />
        return (
            <ScrollView>
                {
                    this.state.dataSource.map(e => {
                        return (
                            <View style={styles.container}>
                                <View style={{ marginTop: 28, marginHorizontal: 16 }} />
                                <View style={{ alignSelf: "center", }}>
                                    <View style={styles.profileImage}>
                                        {img}
                                    </View>
                                    <View style={styles.dm}>
                                        <TouchableOpacity>
                                            <Icon name="chat" type="MaterialIcons" size={18} color="#DFD8C8"></Icon>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.active}></View>
                                    <View style={styles.add}>
                                        <TouchableOpacity onPress={this.showImage}>
                                            <Icon name="add" type="Ionicons" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Icon>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.infoContainer}>
                                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{e.kh_hoTen}</Text>
                                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 20 }]}>{e.kh_email}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('LienHe')}>
                                        <View style={{ flexDirection: 'row', margin: 10, padding: 10, borderBottomWidth: 1, borderColor: '#2ABB9C', }}>
                                            <Icon name="commenting" type="FontAwesome" style={{ color: '#2ABB9C' }} />
                                            <Text style={styles.textList}>About us</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('LichSuGiaoDich')}>
                                        <View style={{ flexDirection: 'row', margin: 10, padding: 10, borderBottomWidth: 1, borderColor: '#2ABB9C', }}>
                                            <Icon name="history" type="FontAwesome" style={{ color: '#2ABB9C' }} />
                                            <Text style={styles.textList}>Lịch sử giao dịch</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangeThongTin')}>
                                        <View style={{ flexDirection: 'row', margin: 10, padding: 10, borderBottomWidth: 1, borderColor: '#2ABB9C', }}>
                                            <Icon name="refresh" type="FontAwesome" style={{ color: '#2ABB9C' }} />
                                            <Text style={styles.textList}>Thay đổi mật khẩu</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                                        <View style={{ flexDirection: 'row', margin: 10, padding: 10, borderBottomWidth: 1, borderColor: '#2ABB9C', }}>
                                            <Icon name="user-circle-o" type="FontAwesome" style={{ color: '#2ABB9C' }} />
                                            <Text style={styles.textList}>Đăng nhập</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View >
                        )
                    })
                }
            </ScrollView>
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
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 16,
        color: 'silver'

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
        backgroundColor: "#ff00ff",
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
        backgroundColor: "#ff00ff",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    }
});