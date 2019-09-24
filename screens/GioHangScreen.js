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
    goBack(){
        const { navigator } = this.props;
        navigator.pop();
    }

    render(){
        //const { goBack } = this.props.navigation;
        return(
            <Container>
                <Header style={{ backgroundColor: '#e91e63' }}>
                    <Left>
                        <TouchableOpacity onPress={this.goBack.bind(this)}>
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

});