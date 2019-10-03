import React, { Component } from 'react';
import RNPaypal from 'react-native-paypal-android';
import { StyleSheet, View, Button } from 'react-native';

const client = {
  sandbox: 'YOUR_SANDBOX_KEY',
  production: 'YOUR_PRODUCTION_KEY',
}

export default class ThanhToan extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="PayPal"
          onPress={async () => {
            try {
                await RNPaypal.config({
                  clientId: client.sandbox,
                  environment: RNPaypal.constants.env.SANDBOX
                })
              const pay = await RNPaypal.buy({
                value: 1.99,
                productName: 'Testanto 100',
                currency: 'BRL',
                mode: RNPaypal.constants.mode.PAYMENT_INTENT_SALE
              });
              console.log(pay);// SUCESSS
            } catch (e) {
              console.log(e);// NO MONEY :()
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});