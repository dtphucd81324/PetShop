import React, { Component } from 'react';
import { Text, Icon } from 'native-base';
import { StyleSheet, View, StatusBar, Button } from 'react-native';
export default class Hometab extends Component{
    static navigationOptions = {
        headerRight:(
            <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
            />
        ),
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="md-home" style={{ color: tintColor }}/>
        }
    }
    render(){
        return (
            <View style={styles.container} >
                 <StatusBar 
                     backgroundColor="silver"
                     barStyle="light-content"
                />
                <Text style={{ fontSize:24, color: 'white' }}>This is HomeTab</Text>
            </View>
        );
    }
}

 const styles = StyleSheet.create({
     container: {
         backgroundColor: '#455a64',
         flex: 1,
         alignItems: 'center',
         justifyContent: 'center'
     }
 });