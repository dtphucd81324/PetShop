import React, { Component } from 'react';
import { Icon, Item, Input, Header, Button, Left, Right, Body, ActionSheet } from 'native-base';
import { View, StyleSheet, Text, FlatList, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import { HINH } from './Data';
//import { Root } from "native-base";

//var BUTTONS = ["Mới", "Mua nhiều nhất", "Giá thấp nhất", "Khuyến mãi", "Cancel"];
// var DESTRUCTIVE_INDEX = 3;
// var CANCEL_INDEX = 4;

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
        };
        this.arrayholder = [];

    };


    componentDidMount() {
        this.setState({
            isLoading: false,
            dataSource: HINH,
            category: filter,
        },
            function () {
                this.arrayholder = HINH;
            }
        )
        console.log(this.arrayholder);
    }

    SearchFilter(text) {
        const newData = this.arrayholder.filter(function (item) {
            const itemData = item.ten ? item.ten.toUpperCase() : ''.toUpperCase();
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
                return a.gia - b.gia;
            }
            );
            this.setState({ dataSource: sortData });
            console.log(sortData); 
            
        }
        if (value === 1) {
            const sortData = this.state.dataSource.sort(function (a, b) {
                return b.gia - a.gia
            });
            this.setState({ dataSource: sortData });
            console.log(sortData); 
        }
        
    }

    async Filter(idCategory) {
        await this.setState({ arrayholder: HINH });
        const filterCategory = this.state.arrayholder.filter(x => x.idCategory === idCategory);
        this.setState({ dataSource: filterCategory, arrayholder: filterCategory, chonLoai: idCategory });
        console.log(idCategory);
    }

    // renderFilter = ({ item }) => {
    //     return (
    //         <View style={{ margin: 14 }}>
    //             <TouchableOpacity onPress={() => this.Filter(item.id)} style={styles.filter}>
    //                 <Text style={styles.TextCurren}>
    //                     {item.ten}
    //                 </Text>
    //             </TouchableOpacity>
    //         </View>
    //     )
    // }

    renderItem = ({ item }) => {
        return (
            <View style={styles.viewCard}>
                <View style={styles.Card}>
                    <Image style={styles.Image} source={{ uri: item.hinh }} />
                    <Text style={styles.Text}>{item.ten}</Text>
                    <Text style={styles.TextCurren}>{item.gia} {item.currency}</Text>
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
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
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
                        {/* <FlatList
                            data={this.state.category}
                            renderItem={this.renderFilter}
                            numColumns={2}
                            keyExtractor={item => item.id}
                        /> */}

                        <TouchableOpacity style={styles.filter} onPress={() => { this.setState({ dataSource: HINH, arrayholder: HINH, chonLoai: 0 }) }}>
                            <Text style={{ fontWeight: 'bold'}}>
                                Tất cả
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            this.state.category.map(e => {
                                return(
                                    <TouchableOpacity style={styles.filter} key={e.id} onPress={() => this.Filter(e.id)} >
                                        <Text style={{ fontWeight: 'bold'}}>
                                            {e.ten}
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
                        keyExtractor={item => item.id}
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