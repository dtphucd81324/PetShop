/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
//import { Button, View, Text } from 'react-native';
//import Icon from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './screens/Login';
import Homepage from './screens/Homepage';
import Register from './screens/Register';
import Search from './screens/Search';
import GioHang from './screens/GioHang';
import ThongTin from './screens/ThongTin';
import DanhSach from './screens/DanhSach';
//import HinhAnh from './screens/HinhAnh';

const AppStack = createStackNavigator({
  Homepage:{
    screen: Homepage,
  },
  Login:{
    screen: Login,
  },
  Register:{
    screen: Register
  },
  DanhSach:{
    screen: DanhSach
  }
},
  {
    initialRouteName: 'DanhSach',
    headerMode: 'none',
  },
);

const TimKiemStack = createStackNavigator({
  Search: Search
})

const AppContainer = createAppContainer(AppStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}









