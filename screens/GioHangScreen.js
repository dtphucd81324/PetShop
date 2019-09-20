import React, {Component} from 'react';
import { Header, Left, Right, Container,Body, Icon } from 'native-base';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';


export default class GioHangScreen extends Component {
    static navigationOptions = {
        title: 'Giỏ Hàng',
        fontWeight: 'bold',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="cart" style={{ color: tintColor ? '#e91e63' : 'slategray' }}/>
        }
    };
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
                        <Text style={styles.textCont}>Giỏ Hàng</Text>
                    </Body> 
                    <Right>
                        <TouchableOpacity>
                            <View style={styles.viewContent}>
                                <Icon name="menu-unfold" type="AntDesign" style={{ color: 'white' }}/>
                            </View>
                        </TouchableOpacity>
                    </Right>
                </Header>
                <View style={styles.container}>
                </View>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        //backgroundColor: '#90ee90',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textCont:{
        fontSize: 20,
        color: 'white',
        //fontWeight: '500',
        marginLeft: 2,
        fontWeight: 'bold'  
    },
    viewContent:{
        flexDirection: 'row',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    // textBody:{
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     color: 'white'
    // },
    // viewBody:{
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     flexDirection: 'row',
    //     padding: 60
    // }
});