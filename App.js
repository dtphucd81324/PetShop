/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator, 
  createAppContainer, 
  createSwitchNavigator,
  createBottomTabNavigator, } from 'react-navigation';
import { NavigationService } from './src/api/NavigationService'; 
import Login from './src/screens/Login';
import Homepage from './src/screens/Homepage';
import Register from './src/screens/Register';
import DanhSach from './src/screens/DanhSach';
import ChiTiet from './src/screens/ChiTiet';
import SearchScreen from './src/screens/SearchScreen';
import GioHangScreen from './src/screens/GioHangScreen';
import ThongTinScreen from './src/screens/ThongTinScreen';
import { Feather } from 'react-native-vector-icons';
import { Icon } from 'native-base';

StatusBar.setHidden(true);


const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  //let IconType = Feather;
  let iconName;
  if (routeName === 'Homepage'){
    iconName = 'md-home';
    //IconType = Feather;
  } else if(routeName === 'SearchScreen'){
    iconName = 'search';
  } else if(routeName === 'GioHangScreen'){
    iconName = 'cart';
  } else if(routeName === 'ThongTinScreen'){
    iconName = 'person';
  }
  return <Icon name={iconName} size={24} color={tintColor ? '#e91e63' : 'slategray'}  />
};



const AuthNavigator = createStackNavigator(
  {
    Login:{
      screen: Login,
    }
},
{
    navigationOptions:{
      header: null,
    },
  },
);


const AppStack = createStackNavigator(
  {
    Homepage:{
      screen: Homepage,
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
    //initialRouteName: 'Homepage',
    headerMode: 'none',
  },
  {
    navigationOptions:{
      headerBackTitle: null,
      headerTintColor: '#e91e63',
      headerStyle:{
        backgroundColor: '#e91e63',
      },
      headerTitleStyle:{
        color: '#e91e63',
      },
    },
  },
);


const TabNavigator = createBottomTabNavigator(
  {
    Homepage:{
      screen: Homepage
    },
    SearchScreen:{
      screen: SearchScreen,
    },
    GioHangScreen:{
      screen: GioHangScreen,
    },
    ThongTinScreen:{
      screen: ThongTinScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => {
      let { routeName } = navigation.state.routes[navigation.state.index];
      if (routeName === "Homepage") routeName = 'Trang chủ';
      else if (routeName === "SearchScreen") routeName = 'Tìm kiếm';
      else if (routeName === "GioHangScreen") routeName = 'Giỏ hàng';
      else if (routeName === "ThongTinScreen") routeName = 'Thông tin';
      return {
        headerTitle: routeName,
        headerStyle:{
          backgroundColor: '#e91e63',
        },
        headerTitleStyle:{
          fontWeight: 'bold',
          color: 'white'
        }       
      };
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),
    tabBarOptions:{
      activeTintColor: '#e91e63',
      inactiveTintColor: 'slategray',
      showIcon: true,
      showLabel: true,
      labelStyle:{
        marginTop: 0
      },
    },
  },
);

const MainNavigator = createStackNavigator(
  {
    Tab: TabNavigator,
    App: AppStack,
  },
  {
    mode: 'modal',
    navigationOptions: {
      header: null,
    },
  },
);

const AppSwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    Main: MainNavigator,
  },
  {
    initialRouteName: 'Main',
  },
);

const AppContainer = createAppContainer(
  AppSwitchNavigator
);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}








