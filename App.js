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
import VideoScreen from './src/screens/VideoScreen';
import BinhLuan from './src/screens/BinhLuan';
import ThanhToan from './src/screens/ThanhToan';
import CapNhatThongTin from './src/screens/CapNhatThongTin';
import LichSuGiaoDich from './src/screens/LichSuGiaoDich';
//import Test from './src/screens/Test';
//import LienHe from './src/screens/LienHe';
import DangKy from './src/screens/DangKy';
//import { Feather } from 'react-native-vector-icons';
import { Icon } from 'native-base';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import { Root } from "native-base";

//StatusBar.setHidden(true);


const defaultState =
{
  hoso: [],
  cart: [],
  total: 0,
}

const cartItems = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return{
          ...state,
          cart: [...state.cart, action.payload],
          total: state.total + action.payload.giaKM,
          //hoso: [...state.hoso, action.payload],
        }
      
    case 'REMOVE_FROM_CART':
      return {
          cart: state.cart.filter(cart => cart.tc_id !== action.payload.tc_id),
          total: state.total - action.payload.giaKM
        }
    case 'THANH_TOAN':
      return{
          ...state,
          cart: [],
          total: 0
        }
      
    case 'DANG_NHAP':
      return{
          ...state,
          hoso: action.payload
      }
      
    case 'DANG_XUAT':
      return{
          ...state,
          hoso: []
        }
    default:
      return state;
  }
};

const store = createStore(cartItems);


const AppStack = createStackNavigator(
  {
    DangKy: DangKy,
    Login: Login,
    //ThongTinScreen: ThongTinScreen
  },
  {
    headerMode: 'none',
  },
  // {
  //   navigationOptions: {
  //     headerBackTitle: null,
  //     headerTintColor: '#ff00ff',
  //     headerStyle: {
  //       backgroundColor: '#e91e63',
  //     },
  //     headerTitleStyle: {
  //       color: 'white',
  //     },
  //   },
  // },
);

const HomeStack = createStackNavigator(
  {
    Homepage: Homepage,
    ChiTiet: ChiTiet,
    VideoScreen: VideoScreen,
    BinhLuan: BinhLuan,
  }, {
  initialRouteName: 'Homepage',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
    title: 'Trang chủ',
    tabBarIcon: ({ focused }) => {
      return <Icon name='md-home' style={{ color: focused ? '#ff00ff' : 'blue' }} />
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
      return <Icon name='search' style={{ color: focused ? '#ff00ff' : 'blue' }} />
    },
  },
},
);

const GioHangStack = createStackNavigator(
  {
    GioHangScreen: GioHangScreen,
    ThanhToan: ThanhToan,
    //Test: Test
  }, {
  initialRouteName: 'GioHangScreen',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
    title: 'Giỏ hàng',
    tabBarIcon: ({ focused }) => {
      return <Icon name='cart' style={{ color: focused ? '#ff00ff' : 'blue' }} />
    },
  },
},
);

const ThongTinStack = createStackNavigator(
  {
    ThongTinScreen: ThongTinScreen,
    LichSuGiaoDich: LichSuGiaoDich,
    CapNhatThongTin: CapNhatThongTin,
    //Login: Login
    // DangKy: DangKy,
    // Login: Login,
  }, {
  initialRouteName: 'ThongTinScreen',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
    title: 'Thông tin',
    tabBarIcon: ({ focused }) => {
      return <Icon name='person' style={{ color: focused ? '#ff00ff' : 'blue' }} />
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
    activeTintColor: '#ff00ff',
    labelStyle: {
      fontSize: 15,
      fontWeight: 'bold'
    }
  }
}

)

const TabBottomStack = createStackNavigator(
  {
    TabNavigator: TabNavigator
  }, {
  headerMode: 'none',
}
)

const AppSwitchNavigator = createSwitchNavigator(
  {
    TabScreen: { screen: TabBottomStack },
    AppStack: AppStack ,
    //ThongTinScreen: {screen: ThongTinScreen},
    // DangKy: { screen: DangKy },
    // Login: { screen: Login },
  }, {
  headerMode: 'none',
}
)
const AppContainer = createAppContainer(
  AppSwitchNavigator
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <AppContainer />
        </Root>
      </Provider>
    )
  }
}








