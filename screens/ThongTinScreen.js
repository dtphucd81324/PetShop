import React, {Component} from 'react';
import { Header, Left, Right, Container,Body, Icon } from 'native-base';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';


export default class ThongTinScreen extends Component {
    static navigationOptions = {
        title: 'Thông tin',
        fontWeight: 'bold',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="person" style={{ color: tintColor ? '#e91e63' : 'slategray' }}/>
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
                        <Text style={styles.textCont}>Thông tin cá nhân</Text>
                    </Body> 
                    <Right>
                        <TouchableOpacity>
                            <View style={styles.viewContent}>
                                <Icon name="menu-unfold" type="AntDesign" style={{ color: 'white' }} />
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
        //backgroundColor: 'steelblue',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textCont:{
        fontSize: 18,
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
});