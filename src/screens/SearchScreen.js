import React, { Component } from 'react';
import { Icon, Item, Input, Header, Button } from 'native-base';
import { View, StyleSheet, Text, FlatList, ActivityIndicator, ScrollView, Image } from 'react-native';
import { HINH } from './Data';

export default class SearchScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            text: '',
            //dataSource: []
        };
        this.arrayholder = [];

    }

    componentDidMount() {
        this.setState({
            isLoading: false,
            dataSource: HINH
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

    renderItem = ({ item }) => {
        return (
            <View style={styles.viewCard}>
                <View style={styles.Card}>
                    <Image style={styles.Image} source={{ uri: item.hinh }} />
                    <Text style={styles.Text}>{item.ten}</Text>
                    <Text style={styles.TextCurren}>{item.gia} {item.currency}</Text>
                </View>
                <View style={styles.viewButton}>
                    <Button iconLeft onPress={() => this.props.navigation.navigate('ChiTiet', { data: item })} >
                        <Icon name="eye" type="FontAwesome" />
                        <Text style={styles.textCont}>Xem chi tiết</Text>
                    </Button>
                </View>
            </View>
        )
    }
    render() {
        if(this.state.isLoading){
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <ScrollView showsHorizontalScrollIndicator={false}>
                <Header transparent searchBar rounded 
                >
                    <Item style={styles.Item}>
                        <Icon name="search" />
                        <Input
                            style={styles.input}
                            placeholder="Tìm kiếm sản phẩm"
                            onChangeText={text => this.SearchFilter(text)}
                            value={this.state.text}
                            underlineColorAndroid="transparent"
                        />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <FlatList
                        data={this.state.dataSource}
                        ItemSeparatorComponent={this.FlatViewItemSeparator}
                        renderItem={this.renderItem}
                        enableEmptySections={true}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    Item:{
        borderWidth: 1,
        backgroundColor: 'lightskyblue',
        //borderColor: 'lightskyblue'
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
        //backgroundColor: 'white',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        //flex : 1
    },
    viewButton: {
        //flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 210,
        paddingTop: 5
    },
    textCont: {
        fontSize: 18,
        color: 'white',
        marginLeft: 2,
        fontWeight: 'bold',
        paddingLeft: 5,
        paddingRight: 10
    },
    Image:{
        width: 185,
        height: 155,
        resizeMode: 'stretch',
        borderRadius: 7
    },
    Text:{
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 7
    },
    TextCurren:{
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'red'
    }
})