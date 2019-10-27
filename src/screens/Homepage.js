import React, { Component } from 'react';
import { Icon, Card, CardItem, Header, Left, Body, Right, Title } from 'native-base';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Dimensions, SafeAreaView } from 'react-native';
//import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';
import ChiTiet from './ChiTiet';
import { HINH } from './Data';
const { height } = Dimensions.get('window');



class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isLoading: true
            //itemSelected: [],
        };
    };

    // componentDidMount() {
    //     this.setState({ dataSource: HINH });
    // }

    componentDidMount() {
        fetch("http://petshopct.herokuapp.com/public/admin/list_thucung")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson,
                    isLoading: false
                });
            })
            .catch((e) => { console.log(e) });
    }


    renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ChiTiet', { item: item })}>
                    <Card>
                        <CardItem>
                            <Image style={{ width: 350, height: 300 }} source={{ uri: 'http://res.cloudinary.com/petshop/image/upload/15_0_meo-tai-cup-3-.jpg.png' }} />
                        </CardItem>
                        <CardItem>
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{item.tc_ten}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{ fontSize: 24, color: 'red' }}>{item.tc_giaBan}</Text>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <ScrollView showsHorizontalScrollIndicator={false}>
                <Header transparent style={{ backgroundColor: '#ff00ff' }}>
                    <Left />
                    <Body style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                        <Title style={{ fontSize: 24, fontWeight: 'bold' }}>TRANG CHỦ</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={styles.viewCarousel}>
                    <SafeAreaView>
                        <Carousel
                            data={this.state.dataSource}
                            renderItem={this.renderItem}
                            sliderWidth={400}
                            itemWidth={380}
                        />
                    </SafeAreaView>
                </View>
                <View style={styles.viewCarousel}>
                    <View style={styles.carousel}>
                        <Text style={styles.textContent}>Chó Alaska</Text>
                    </View>
                    <SafeAreaView>
                        <Carousel
                            data={this.state.dataSource}
                            renderItem={this.renderItem}
                            sliderWidth={400}
                            itemWidth={350}
                        //layoutCardOffset={'15'}
                        />
                    </SafeAreaView>
                </View>
                <View style={styles.viewCarousel}>
                    <View style={styles.carousel}>
                        <Text style={styles.textContent}>Chó Husky</Text>
                    </View>
                    <SafeAreaView>
                        <Carousel
                            data={this.state.dataSource}
                            renderItem={this.renderItem}
                            sliderWidth={400}
                            itemWidth={350}
                        //layoutCardOffset={'15'}
                        />
                    </SafeAreaView>
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    },
    viewCarousel: {
        backgroundColor: 'white',
    },
    textCont: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        justifyContent: 'space-between',

    },
    background: {
        width: '100%',
    },
    carousel: {
        flex: 1,
        paddingTop: 10,
        height: '100%',
        width: '100%',
        paddingLeft: 15
    },

    textContent: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
});

export default Homepage;
