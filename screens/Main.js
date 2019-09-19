//import { Container, Text, Content } from 'native-base';
//import { Icon } from 'native-base';
import { View, Text, Button } from 'react-native';
import React, { Component } from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import HomeTab from './tabs/HomeTab';
import BookTab from './tabs/BookTab';
import CartTab from './tabs/CartTab';
import PlanetTab from './tabs/PlanetTab';
import BasketTab from './tabs/BasketTab';
//import Homepage from './src/pages/Homepage';
//import AppHeader from './src/components/AppHeader';
//import { platform } from 'os';

export default class Main extends Component{
    render(){
        return (
                <AppContainer/>
        )
        
    }
}

const AppNavigator  = createBottomTabNavigator({
    Home: HomeTab,
    Basket: BasketTab,
    Book: BookTab,
    Cart: CartTab,
    Planet: PlanetTab
},{
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions:{
        showIcon: true,
        showLabel: true,
    }
});

const AppContainer = createAppContainer(AppNavigator);

