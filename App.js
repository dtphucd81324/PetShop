/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './screens/Login';
import Homepage from './screens/Homepage';
import Register from './screens/Register';
import DanhSach from './screens/DanhSach';
import ChiTiet from './screens/ChiTiet';


StatusBar.setHidden(true);

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
  },
  ChiTiet:{
    screen: ChiTiet
  },
},
  {
    initialRouteName: 'Homepage',
    headerMode: 'none',
  },
);

// const TimKiemStack = createStackNavigator({
//   Search: Search
// })

const AppContainer = createAppContainer(AppStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}








