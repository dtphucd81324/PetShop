import React, { Component } from 'react';
import { Header, Left, Right, Container,Body, ActionSheet, Icon, Item, Input } from 'native-base';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';


var Touchable = [
    { text: "Mới", iconColor: "blue" },
    { text: "Mua nhiều", iconColor: "blue" },
    { text: "Giá thấp nhất",  iconColor: "blue" },
    { text: "Giá cao nhất",  iconColor: "blue" },
    { text: "Hủy", iconColor: "red" }
  ];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class Search extends Component {
    static navigationOptions ={
        headerVisible: false
    }

    constructor(props) {
        super(props);
        this.state = {};
    }
    render(){
        const { goBack } = this.props.navigation;
        return(
            <Container>
                <Header style={{ backgroundColor: '#e91e63' }}>
                    <Left>
                        <TouchableOpacity onPress={ () => goBack() }>
                            <View style={styles.viewContent}>
                                <Icon name="left" type="AntDesign" style={{ color: 'white' }}/>   
                                
                            </View>                                
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={styles.textCont}>Tìm Kiếm</Text>
                    </Body> 
                    <Right>
                    <TouchableOpacity
                        onPress={() =>
                        ActionSheet.show(
                        {
                            options: Touchable,
                            cancelButtonIndex: CANCEL_INDEX,
                            destructiveButtonIndex: DESTRUCTIVE_INDEX,
                            title: "Lọc"
                        },
                        buttonIndex => {
                            this.setState({ clicked: Touchable[buttonIndex] });
                        }
                        )}
                    >
                            <View style={styles.viewContent}>
                                <Icon name="menu-unfold" type="AntDesign" style={{ color: 'white' }}/>
                            </View>
                        </TouchableOpacity>
                    </Right>
                </Header>
                <View style={styles.container}>
                    <Item>
                        <Icon name="search" />
                        <Input  
                            placeholder="Nhập vào sản phẩm muốn tìm"
                        />
                    </Item>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    viewContent:{
        flexDirection: 'row',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textCont:{
        fontSize: 20,
        color: 'white',
        //fontWeight: '500',
        marginLeft: 2,
        fontWeight: 'bold' 
    },
    containerStyle:{
        borderBottomWidth: 2,
        borderColor: 'green',
        paddingHorizontal: 10,
        marginVertical: 10
    }
})