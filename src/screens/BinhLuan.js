import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Icon, Button, Header, Left, Right, Item, Input, TouchableOpacity, Content, Textarea, Form } from 'native-base';

export default class BinhLuan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    handleChangeText = (text) => {
        this.setState({
            text
        })
    }

    render() {
        return (
            <ScrollView>
                <Header transparent>
                    <Left>
                        <Button onPress={() => this.props.navigation.goBack()} style={{ backgroundColor: '#ff00ff'}}>
                            <Icon name="undo" type="Ionicons" />
                        </Button>
                    </Left>
                    <Right />
                </Header>
                <View style={styles.container}>
                    <Item rounded style={styles.Item}>
                        <Input
                            placeholder='Nhập nội dung'
                            onChangeText={this.handleChangeText}
                            value={this.state.text}
                        />
                    </Item>
                    <Button style={styles.button}>
                        <Icon name="paper-plane" type="Entypo" />
                    </Button>
                </View>
                <View style={{ flex: 1, paddingHorizontal: 16, marginVertical: 16 }}>
                    <Content>
                        <Form>
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Nội dung:</Text>
                            <Textarea rowSpan={10} bordered style={{ fontSize: 18 }}>
                                {this.state.text}
                            </Textarea>
                        </Form>
                    </Content>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    Item: {
        width: 300,
        paddingHorizontal: 16,
        //marginHorizontal: 16,
        marginVertical: 16
    },
    button: {
        marginLeft: 8,
        //color: 'lightskyblue',
        backgroundColor: 'lightskyblue'
    },
});