import React, { Component } from 'react';
import RNPaypal from 'react-native-paypal-android';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Item, Input, Header, Left, Right, Button, Icon } from 'native-base';
import { connect } from 'react-redux';

const client = {
  sandbox: 'Ab8TrmGWdj0gBEMT-ScrcED4uZFwv9pbesmu2lex5ey3isdJzOFIrqwuxJh99yLB2EivWaa1y0lMzC6Y',
}

class ThanhToan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  async componentDidMount() {
    await this.getHinhThuc();
  }

  async getHinhThuc() {
    try {
      await fetch("http://petshopct.herokuapp.com/public/admin/list_hinhthucthanhtoan")
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            dataSource: responseJson,
            //isLoading: false,
          });
          console.log(responseJson);
        })
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <ScrollView>
        <Header transparent>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} style={{ backgroundColor: '#ff00ff' }}>
              <Icon name="undo" type="Ionicons" />
            </Button>
          </Left>
          <Right />
        </Header>
        <View style={{ margin: 20 }}>
          <Text style={styles.txtTT}>Khách hàng</Text>
          <Item disabled style={{ marginBottom: 10 }}>
            <Input />
          </Item>
          <Text style={styles.txtTT}>Địa chỉ nhận hàng</Text>
          <Item disabled>
            <Input />
          </Item>
        </View>
        {
          this.state.dataSource.map(e => {
            return (
              <View key={e.httt_id === 1}>
                <Button style={styles.btnPaypal}
                  onPress={async () => {
                    try {
                      await RNPaypal.config({
                        clientId: client.sandbox,
                        environment: RNPaypal.constants.env.SANDBOX
                      })
                      const pay = await RNPaypal.buy({
                        value: this.props.total,
                        productName: 'Buy products',
                        currency: 'USD',
                        mode: RNPaypal.constants.mode.PAYMENT_INTENT_SALE
                      });
                      console.log(pay);// SUCESSS
                      this.props.dispatch({ type: 'THANH_TOAN' });
                      alert('Bạn đã thanh toán thành công');
                    } catch (e) {
                      console.log(e);// NO MONEY :()
                    }
                  }}

                >
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{e.httt_ten}</Text>
                </Button>
              </View>
            )
          })
        }

      </ScrollView>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    cart: state.cart,
    total: state.total
  }
}
export default connect(mapStatetoProps)(ThanhToan);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  btnPaypal: {
    paddingVertical: 10,
    marginHorizontal: 16,
    borderRadius: 25,
    marginBottom: 5,
    height: 50,
    justifyContent: 'space-around',
    alignContent: 'center',
    backgroundColor: '#ff00ff',
  },
});