/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { NavigationService } from './src/api/NavigationService';
import Login from './src/screens/Login';
import Homepage from './src/screens/Homepage';
import Register from './src/screens/Register';
import DanhSach from './src/screens/DanhSach';
import ChiTiet from './src/screens/ChiTiet';
import SearchScreen from './src/screens/SearchScreen';
import GioHangScreen from './src/screens/GioHangScreen';
import ThongTinScreen from './src/screens/ThongTinScreen';
//import { Feather } from 'react-native-vector-icons';
import { Icon } from 'native-base';
import { Provider } from 'react-redux';
import { createStore } from 'redux'

StatusBar.setHidden(true);


const defaultState = 
  {
    cart: [],
    total: 0
  }

const cartItems = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return (
        {
          cart: [...state.cart, action.payload],
          total: state.total + action.payload.gia
        }
      )
        
      
    case 'REMOVE_FROM_CART':
      return (
        {
          cart: state.filter(cart => cart.id !== action.payload.id),
          total: state.total - action.payload.gia
        }
      )
       
    default:
      return state;
  }
};

const store = createStore(cartItems);

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let iconName;
  if (routeName === 'Homepage') {
    iconName = 'md-home';
  } else if (routeName === 'SearchScreen') {
    iconName = 'search';
  } else if (routeName === 'GioHangScreen') {
    iconName = 'cart';
  } else if (routeName === 'ThongTinScreen') {
    iconName = 'person';
  }
  return <Icon name={iconName} size={24} color={tintColor ? '#e91e63' : 'slategray'} />
};



const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
    }
  },
  {
    navigationOptions: {
      header: null,
    },
  },
);


const AppStack = createStackNavigator(
  {
    Register: {
      screen: Register
    },
    DanhSach: {
      screen: DanhSach
    },

  },
  {
    headerMode: 'none',
  },
  {
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#e91e63',
      headerStyle: {
        backgroundColor: '#e91e63',
      },
      headerTitleStyle: {
        color: 'white',
      },
    },
  },
);

const HomeStack = createStackNavigator(
  {
    Homepage: {
      screen: Homepage,
    },
    ChiTiet: {
      screen: ChiTiet,
      navigationOptions: {
        header: null,
      },
    },
  },
);


const TabNavigator = createBottomTabNavigator(
  {
    Homepage: {
      screen: Homepage,
    },
    SearchScreen: {
      screen: SearchScreen,
    },
    GioHangScreen: {
      screen: GioHangScreen,
    },
    ThongTinScreen: {
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
        headerStyle: {
          backgroundColor: '#e91e63',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white',
        },
        headerTintColor: '#e91e63'
      };
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),
    tabBarOptions: {
      activeTintColor: '#e91e63',
      inactiveTintColor: 'slategray',
      showIcon: true,
      showLabel: true,
      labelStyle: {
        marginTop: 0
      },
    },
  }
)
const MainNavigator = createStackNavigator(
  {
    Tab: TabNavigator,
    App: AppStack,
    Home: HomeStack,
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
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}








