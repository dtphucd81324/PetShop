import React, { Component } from 'react';
import { Icon, Item, Input, Header, Button, Left, Right, Body, ActionSheet } from 'native-base';
import { View, StyleSheet, Text, FlatList, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import { HINH } from './Data';
//import { Root } from "native-base";


class TimKiem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            text: '',
            giong: [],
            chonLoai: 0,
            dataSource: [],
        };
        this.arrayholder = [];
        this.data = [];
    }

    async componentDidMount() {
        await this.getThuCung();
        //await this.getGiongThuCung();
        this.setState({ isLoading: false });
    }

    async getThuCung() {
        try {
            await fetch("http://petshopct.herokuapp.com/public/thu-cung-api", {
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
                        arrayholder: responseJson.danhsachthucung.data,
                        data: responseJson.danhsachthucung.data,
                        giong: responseJson.giong,
                        isLoading: false,
                    });
                    console.log(responseJson);
                })
        } catch (error) {
            console.error(error);
        }
    }


    stringToInt(num) {
        return parseInt(num);
    }

    currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VNĐ';
    }

    SearchFilter(text) {
        const newData = this.state.arrayholder.filter(function (item) {
            const itemData = item.tc_ten ? item.tc_ten.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            dataSource: newData,
            text: text,
        });
        console.log(newData);
    }

    sortData(value) {
        if (value === 0) {
            const sortData = this.state.dataSource.sort(function (a, b) {
                return a.tc_giaBan - b.tc_giaBan;
            }
            );
            this.setState({ dataSource: sortData });
            console.log(this.state.dataSource);
        }
        if (value === 1) {
            const sortData = this.state.dataSource.sort(function (a, b) {
                return b.tc_giaBan - a.tc_giaBan;
            }
            );
            this.setState({ dataSource: sortData });
        }
    }

    async Filter(idCategory) {
        await this.setState({ arrayholder: this.state.data });
        const filterCategory = this.state.arrayholder.filter(x => x.g_id === idCategory);
        this.setState({ dataSource: filterCategory, arrayholder: filterCategory, chonLoai: idCategory });
        //console.log(idCategory);
    }


    renderItem = ({ item }) => {
        const percent = parseInt(item.giatri)
        return (
            <View style={styles.viewCard}>
                <View style={styles.Card}>
                    <Image style={styles.Image} source={{ uri: 'http://res.cloudinary.com/petshop/image/upload/' + item.ha_ten + '.png' }} />
                    {
                        (item.giatri != null && item.giatri != 0) &&
                        <View style={{ position: 'absolute', width: 40, height: 40, backgroundColor: '#f66', right: 0, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                            <Text style={{ color: 'white' }}>
                                -{item.giatri}%
                            </Text>
                        </View>
                    }
                    <Text style={styles.Text}>{item.tc_ten}</Text>
                    <Text style={(item.giatri != null && item.giatri != 0) ? styles.giaCu : styles.giaMoi}>{this.currencyFormat(this.stringToInt(item.tc_giaBan))}</Text>
                    {
                        (item.giatri != null && item.giatri != 0) &&
                        <Text style={styles.giaMoi}>
                            {this.currencyFormat(this.stringToInt(item.tc_giaBan) * (1 - (percent / 100)))}
                        </Text>
                    }

                </View>
                <View style={styles.viewButton}>
                    <TouchableOpacity style={styles.viewDetail} iconLeft onPress={() => this.props.navigation.navigate('ChiTiet', { item: item })} >
                        <Icon name="eye" type="FontAwesome" style={{ color: 'white' }} />
                        <Text style={styles.textCont}>Xem chi tiết</Text>
                    </TouchableOpacity>
                </View>
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
                <Header transparent searchBar rounded>
                    <Left />
                    <Body>
                        <Item style={styles.Item}>
                            <Icon name="search" style={{ marginLeft: 5, color: '#f74877' }} />
                            <Input
                                style={styles.input}
                                placeholder="Search"
                                onChangeText={(text) => this.SearchFilter(text)}
                                //value={this.state.text}
                                underlineColorAndroid="transparent"
                            />
                        </Item>
                    </Body>
                    <Right>
                        <Button onPress={() =>
                            ActionSheet.show(
                                {
                                    options: [
                                        { text: "Giá tăng dần", icon: "arrow-up", iconColor: "#2c8ef4" },
                                        { text: "Giá giảm dần", icon: "analytics", iconColor: "#f42ced" },
                                        { text: "Hủy", icon: "close", iconColor: "#ea943b" },
                                    ],
                                    cancelButtonIndex: 2,
                                    title: "Lọc"
                                },
                                buttonIndex => {
                                    this.sortData(buttonIndex)
                                }
                            )}
                            style={{backgroundColor: '#f74877'}}
                            >
                            <Icon name="filter" type="Feather" />
                        </Button>
                    </Right>
                </Header>
                <ScrollView horizontal={true} style={{ flexDirection: 'row', margin: 5 }}>
                    <View>
                        <TouchableOpacity style={styles.filter} onPress={() => { this.setState({ dataSource: this.state.data, arrayholder: this.state.data, chonLoai: 0 }) }}>
                            <Text style={{ fontWeight: 'bold', color: 'white' }}>
                                Tất cả
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            this.state.giong.map(e => {
                                return (
                                    <TouchableOpacity style={styles.filter} key={e.g_id} onPress={() => this.Filter(e.g_id)} >
                                        <Text style={{ fontWeight: 'bold', color: 'white' }}>
                                            {e.g_ten}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </ScrollView>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={this.renderItem}
                        numColumns={2}
                        style={{ marginRight: 5 }}
                        keyExtractor={item => item.tc_ten}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    Item: {
        borderWidth: 1,
        borderColor: '#f74877',
        backgroundColor: 'white',
        borderRadius: 50,
        margin: 5,
        width: 250
    },
    btnRight: {
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewCard: {
        height: 320,
        width: 210,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
    },
    Card: {
        height: 240,
        width: 160,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 7,
        position: 'relative',
        //justifyContent: 'center'
    },
    viewSearch: {
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewButton: {
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 210,
        paddingTop: 5,
        paddingBottom: 16
    },
    textCont: {
        fontSize: 18,
        color: 'white',
        marginLeft: 2,
        fontWeight: 'bold',
        paddingLeft: 5,
        paddingRight: 10
    },
    Image: {
        width: 160,
        height: 155,
        resizeMode: 'stretch',
        borderRadius: 7
    },
    Text: {
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 7
    },
    TextCurren: {
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'red'
    },
    textAll: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red'
    },
    filter: {
        borderWidth: 1,
        backgroundColor: '#f74877',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 25,
        marginHorizontal: 6,
        padding: 6
    },
    viewDetail: {
        width: 180,
        height: 50,
        backgroundColor: '#f74877',
        alignItems: 'center',
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    giaMoi: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center'
    },
    giaCu: {
        color: 'black',
        fontSize: 18,
        textDecorationLine: 'line-through',
        textAlign: 'center'
    },
})

export default TimKiem;