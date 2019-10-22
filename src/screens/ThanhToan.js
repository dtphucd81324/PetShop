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
  }
  render() {
    const { params } = this.props.navigation.state;
    return (
      <ScrollView>
        <Header transparent>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()}>
              <Icon name="undo" type="Ionicons" />
            </Button>
          </Left>
          <Right />
        </Header>
        <View style={{ margin: 20 }}>
          <Text style={styles.txtTT}>Khách hàng</Text>
          <Item disabled style={{ marginBottom: 10 }}>
            <Input disabled />
          </Item>
          <Text style={styles.txtTT}>Địa chỉ nhận hàng</Text>
          <Item disabled>
            <Input />
          </Item>
        </View>
        <View>
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
            <Text>Thanh toán Paypal</Text>
          </Button>
        </View>
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
    backgroundColor: 'lightblue',
  },
});