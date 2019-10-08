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
  StackActions,
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
<<<<<<< HEAD
//import VideoScreen from './src/screens/VideoScreen'
=======
>>>>>>> parent of 07885f4... fix code VideoScreen
//import { Feather } from 'react-native-vector-icons';
import { Icon } from 'native-base';
import { Provider } from 'react-redux';
import { createStore } from 'redux'

//StatusBar.setHidden(true);


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
          cart: state.cart.filter(cart => cart.id !== action.payload.id),
          total: state.total - action.payload.gia
        }
      )
    case 'THANH_TOAN':
      return (
        {
          ...state,
          cart: [],
          total: 0
        }
      )

    default:
      return state;
  }
};

const store = createStore(cartItems);


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
      headerTintColor: 'lightskyblue',
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
    Homepage: Homepage,
<<<<<<< HEAD
    ChiTiet: ChiTiet,
    //VideoScreen: VideoScreen,
=======
    ChiTiet: ChiTiet
>>>>>>> parent of 07885f4... fix code VideoScreen
  }, {
  initialRouteName: 'Homepage',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
    title: 'Trang chủ',
    tabBarIcon: ({ focused }) => {
      return <Icon name='md-home' style={{ color: focused ? 'lightskyblue' : 'blue' }} />
    },
  },
},
);

const SearchStack = createStackNavigator(
  {
    SearchScreen: SearchScreen,
    ChiTiet: ChiTiet
  }, {
  initialRouteName: 'SearchScreen',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
    title: 'Tìm kiếm',
    tabBarIcon: ({ focused }) => {
      return <Icon name='search' style={{ color: focused ? 'lightskyblue' : 'blue' }} />
    },
  },
},
);

const GioHangStack = createStackNavigator(
  {
    GioHangScreen: GioHangScreen,

  }, {
  initialRouteName: 'GioHangScreen',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
    title: 'Giỏ hàng',
    tabBarIcon: ({ focused }) => {
      return <Icon name='cart' style={{ color: focused ? 'lightskyblue' : 'blue' }} />
    },
  },
},
);

const ThongTinStack = createStackNavigator(
  {
    ThongTinScreen: ThongTinScreen
  }, {
  initialRouteName: 'ThongTinScreen',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
    title: 'Thông tin',
    tabBarIcon: ({ focused }) => {
      return <Icon name='person' style={{ color: focused ? 'lightskyblue' : 'blue' }} />
    },
  },
}
)

const TabNavigator = createBottomTabNavigator(
  {
    Homepage: {
      screen: HomeStack,
      navigationOptions: {
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.dispatch(StackActions.popToTop());
          defaultHandler();
        }
      }
    },
    SearchScreen: {
      screen: SearchStack,
      navigationOptions: {
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.dispatch(StackActions.popToTop());
          defaultHandler();
        }
      }
    },
    GioHangScreen: {
      screen: GioHangStack,
      navigationOptions: {
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.dispatch(StackActions.popToTop());
          defaultHandler();
        }
      }
    },
    ThongTinScreen: {
      screen: ThongTinStack,
      navigationOptions: {
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.dispatch(StackActions.popToTop());
          defaultHandler();
        }
      }
    },
  }, {
  tabBarOptions: {
    activeTintColor: 'lightskyblue',
    labelStyle:{
      fontSize: 15,
      fontWeight: 'bold'
    }
  }
}

)

const AppContainer = createAppContainer(
  TabNavigator
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








