import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text, Badge  } from 'native-base';
import { TouchableOpacity } from 'react-native';

export default class AppFooter extends Component {
  render() {
    return (
        <Footer>
          <FooterTab>
            <TouchableOpacity>
              <Button vertical>
                <Icon name="md-home" />
                <Text>Trang chủ</Text>
              </Button>
            </TouchableOpacity>
            <TouchableOpacity>
              <Button active badge vertical>
                <Badge ><Text>0</Text></Badge>
                <Icon name="md-cart" />
                <Text>Giỏ hàng</Text>
              </Button>
            </TouchableOpacity>
            <TouchableOpacity>
              <Button vertical>
                <Icon name="md-search" />
                <Text>Tìm kiếm</Text>
              </Button>
            </TouchableOpacity>
            <TouchableOpacity>
              <Button vertical>
                <Icon name="person" />
                <Text>Thông tin</Text>
              </Button>
            </TouchableOpacity>
            <TouchableOpacity>
              <Button vertical>
                <Icon name="more" />
                <Text>Menu</Text>
              </Button>
            </TouchableOpacity>
          </FooterTab>
        </Footer>
    );
  }
}

module.export = AppFooter;