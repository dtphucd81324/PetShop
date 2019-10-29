import React, { Component } from 'react';
import { Icon, Item, Input, Header, Button, Left, Right, Body, ActionSheet } from 'native-base';
import { View, StyleSheet, Text, FlatList, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import { HINH } from './Data';
//import { Root } from "native-base";

const filter = [
    {
        id: 1,
        ten: 'Chó Corgi'
    }, {
        id: 2,
        ten: 'Chó Husky'
    }, {
        id: 3,
        ten: 'Chó Alaska'
    }, {
        id: 4,
        ten: 'Chó Poodle'
    },
]
export default class SearchScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            text: '',
            category: [],
            chonLoai: 0,
            dataSource: [],
        };
        this.arrayholder = [];
        this.data = []
    };


    async componentDidMount() {
        await this.getThuCung();
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
                        arrayholder: responseJson,
                        data: responseJson,
                        isLoading: false,
                    });
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

    SearchFilter(text) {
        const newData = this.arrayholder.filter(function (item) {
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

    sortFilter(value) {
        if (value === 0) {
            const sortData = this.state.dataSource.sort(function (a, b) {
                return a.tc_giaBan - b.tc_giaBan;
            }
            );
            this.setState({ dataSource: sortData });
            console.log(sortData); 
            
        }
        if (value === 1) {
            const sortData = this.state.dataSource.sort(function (a, b) {
                return b.tc_giaBan - a.tc_giaBan
            });
            this.setState({ dataSource: sortData });
            console.log(sortData); 
        }
        
    }

    async Filter(idCategory) {
        await this.setState({ arrayholder: this.state.data });
        const filterCategory = this.state.arrayholder.filter(x => x.g_id === idCategory);
        this.setState({ dataSource: filterCategory, arrayholder: filterCategory, chonLoai: idCategory });
        console.log(idCategory);
    }

    
    renderItem = ({ item }) => {
        return (
            <View style={styles.viewCard}>
                <View style={styles.Card}>
                    <Image style={styles.Image} source={{ uri: 'http://res.cloudinary.com/petshop/image/upload/' + item.ha_ten + '.png' }} />
                    <Text style={styles.Text}>{item.tc_ten}</Text>
                    <Text style={styles.TextCurren}>{this.currencyFormat(item.tc_giaBan)}</Text>
                </View>
                <View style={styles.viewButton}>
                    <TouchableOpacity style={styles.viewDetail} iconLeft onPress={() => this.props.navigation.navigate('ChiTiet', { item: item })} >
                        <Icon name="eye" type="FontAwesome" />
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
                    <ActivityIndicator size="large" />
                </View>
            )
        }
        return (
            <ScrollView showsHorizontalScrollIndicator={false}>
                <Header transparent searchBar rounded>
                    <Left />
                    <Body>
                        <Item style={styles.Item}>
                            <Icon name="search" style={{ marginLeft: 5 }} />
                            <Input
                                style={styles.input}
                                placeholder="Search"
                                onChangeText={text => this.SearchFilter(text)}
                                value={this.state.text}
                                underlineColorAndroid="transparent"
                            />
                        </Item>
                    </Body>
                    <Right>
                        <Button
                            style={{ backgroundColor: '#ff00ff'}}
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: [
                                            {text: "Giá cao nhất", icon: "arrow-up", iconColor: "#2c8ef4"},
                                            {text: "Giá thấp nhất", icon: "analytics", iconColor: "#f42ced"},
                                            {text: "Hủy", icon: "close", iconColor: "#25de5b"}
                                             ],
                                        cancelButtonIndex: 2,
                                        //destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                        title: "Lọc"
                                    },
                                    buttonIndex => {
                                        this.sortFilter(buttonIndex);
                                    }
                                )}
                        >
                            <Icon name="filter" type="Feather" />
                        </Button>
                    </Right>
                </Header>
                <ScrollView horizontal={true} style={{ flexDirection: 'row', margin: 5 }}>
                    <View>
                        <TouchableOpacity style={styles.filter} onPress={() => { this.setState({ dataSource: this.state.data, arrayholder: this.state.data, chonLoai: 0 }) }}>
                            <Text style={{ fontWeight: 'bold'}}>
                                Tất cả
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            this.state.category.map(e => {
                                return(
                                    <TouchableOpacity style={styles.filter} key={e.g_id} onPress={() => this.Filter(e.g_id)} >
                                        <Text style={{ fontWeight: 'bold'}}>
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
                        ItemSeparatorComponent={this.FlatViewItemSeparator}
                        renderItem={this.renderItem}
                        //enableEmptySections={true}
                        keyExtractor={item => item.tc_id}
                        numColumns={2}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    Item: {
        borderWidth: 1,
        backgroundColor: '#ff00ff',
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
        height: 280,
        width: 210,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
    },
    Card: {
        height: 220,
        width: 185,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 7
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
        width: 185,
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
        // width: 150,
        // height: 40,
        borderWidth: 1,
        backgroundColor: '#ff00ff',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 25,
        marginHorizontal: 6,
        padding: 6
    },
    viewDetail: {
        width: 180,
        height: 50,
        backgroundColor: '#ff00ff',
        alignItems: 'center',
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'center',
    },
})