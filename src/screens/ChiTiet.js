import React, { Component } from 'react';
import { CardItem, Card, Icon, Button, Header, Left, Right, Content, Textarea, Form, Toast } from 'native-base';
import { StyleSheet, View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import { parse } from '@babel/parser';

class ChiTiet extends Component {
    static navigationOptions = {
        title: 'Chi tiết'
    };
    constructor(props) {
        super(props);
        this.state = {
            //item: this.props.navigation.state.params.data,
            item: this.props.navigation.state.params.item,
        }

    }

    StringtoInt(num){
        return parseInt(num);
    }

    currencyFormat(num) {
        num = parseInt(num)
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VNĐ'
    }
    componentDidMount(){
        this.setState({ item:{...this.state.item, tc_giaBan: this.StringtoInt(this.state.item.tc_giaBan)} })
    }
    buy = () => {
        //const { params } = this.props.navigation.state;
        let check = false;
        if (this.props.cart.length === 0) {
            // this.props.dispatch({ type: 'ADD_TO_CART', payload: this.state.item });
            this.props.dispatch({ type: 'ADD_TO_CART', payload: this.state.item });
            //alert('Thêm thành công');
            Toast.show({
                text: "Thêm thành công",
                buttonText: "Okay",
                buttonTextStyle: { color: "white" },
                buttonStyle: { backgroundColor: "green" },
                position: "bottom",
                type: "success"
            })
            setTimeout(() => {
                this.props.navigation.navigate('GioHangScreen');
            }, 2000);
        }
        else {
            this.props.cart.map(e => {
                // if (e.id === this.state.item.id) {
                if (e.tc_id === this.state.item.tc_id) {
                    check = true;
                }
            })
            if (check) {
                //alert('Sản phẩm đã tồn tại trong giỏ hàng');
                Toast.show({
                    text: "Sản phẩm đã tồn tại trong giỏ hàng",
                    buttonText: "Okay",
                    buttonTextStyle: { color: "white" },
                    buttonStyle: { backgroundColor: "red" },
                    position: "bottom",
                    type: "danger"
                })
            }
            else {
                // this.props.dispatch({ type: 'ADD_TO_CART', payload: this.state.item });
                this.props.dispatch({ type: 'ADD_TO_CART', payload: this.state.item });
                //alert('Thêm thành công');
                Toast.show({
                    text: "Thêm thành công",
                    buttonText: "Okay",
                    buttonTextStyle: { color: "white" },
                    buttonStyle: { backgroundColor: "green" },
                    position: "bottom",
                    type: "success"
                })
                setTimeout(() => {
                    this.props.navigation.navigate('GioHangScreen');
                }, 3000);
                
            }
        }

    }

    render() {
        const { params } = this.props.navigation.state
        return (
            <ScrollView>
                <Header transparent>
                    <Left>
                        <Button onPress={() => this.props.navigation.goBack()} style={{ backgroundColor: '#ff00ff' }}>
                            <Icon name="undo" type="Ionicons" />
                        </Button>
                    </Left>
                    <Right>
                        <Button onPress={() => this.props.navigation.navigate('BinhLuan')} style={{ backgroundColor: '#ff00ff' }}>
                            <Icon name="message1" type="AntDesign" />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container}>
                    <SafeAreaView>
                        <Card>
                            <CardItem>
                                <Image style={{ height: 250, width: '100%' }} source={{ uri: 'http://res.cloudinary.com/petshop/image/upload/' + this.state.item.ha_ten + '.png' }} />
                            </CardItem>
                            <CardItem>
                                <Text style={styles.textDetail}>Tên: </Text>
                                <Text style={styles.txtChitiet}>{this.state.item.tc_ten}</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={styles.textDetail}>Giá: </Text>
                                <Text style={styles.txtChitiet}>{this.currencyFormat(this.state.item.tc_giaBan)} VNĐ</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={styles.textDetail}>Tuổi: </Text>
                                <Text style={styles.txtChitiet}>{this.state.item.tc_tuoi}</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={styles.textDetail}>Ngày sinh: </Text>
                                <Text style={styles.txtChitiet}>{this.state.item.tc_ngaySinh}</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={styles.textDetail}>Cân nặng: </Text>
                                <Text style={styles.txtChitiet}>{this.state.item.tc_canNang}</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={styles.textDetail}>Màu sắc: </Text>
                                <Text style={styles.txtChitiet}>{this.state.item.tc_mauSac}</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={styles.textDetail}>Nguồn gốc: </Text>
                                <Text style={styles.txtChitiet}>{this.state.item.ng_ten}</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={styles.textDetail}>Nhà cung cấp: </Text>
                                <Text style={styles.txtChitiet}>{this.state.item.ncc_ten}</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={styles.textDetail}>Trạng thái tiêm chủng: </Text>
                                <Text style={styles.txtChitiet}>{this.state.item.tc_trangThaiTiemChung}</Text>
                            </CardItem>
                            <CardItem>
                                <Content>
                                    <Form>
                                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Mô tả:</Text>
                                        <Textarea rowSpan={10} bordered style={{ fontSize: 18 }}>
                                            {this.state.item.tc_moTa}
                                        </Textarea>
                                    </Form>
                                </Content>
                            </CardItem>
                            <CardItem>
                                <View style={styles.viewButton}>
                                    <Button iconLeft onPress={this.buy} style={{ backgroundColor: '#ff00ff' }} >
                                        <Icon name="shopping-cart" type="Feather" />
                                        <Text style={styles.textCont}>Thêm vào giỏ hàng</Text>
                                    </Button>
                                    <Button iconLeft style={{ backgroundColor: '#ff00ff' }} onPress={() => this.props.navigation.navigate('VideoScreen', { item: params.item })}>
                                        <Icon name="eye" type="Feather" />
                                        <Text style={styles.textCont}>Xem Video</Text>
                                    </Button>
                                </View>
                            </CardItem>
                        </Card>
                    </SafeAreaView>
                </View>
            </ScrollView>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        cart: state.cart
    }
}

export default connect(mapStatetoProps)(ChiTiet);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textCont: {
        fontSize: 18,
        color: 'white',
        marginLeft: 2,
        fontWeight: 'bold',
        paddingLeft: 5,
        paddingRight: 10,
    },
    viewContent: {
        flexDirection: 'row',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    viewButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: 200,
        //marginLeft: 16
        flexDirection: 'row',
    },
    video: {
        width: 200,
        height: 170,
        borderWidth: 2,
        borderColor: '#ff00ff'
    },
    cardVideo:{

    },
    backgroundVideo: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 10,
        left: 10,
        bottom: 0,
        right: 10,
        width: 300,
        height: 200
    },
    textDetail:{
        fontSize: 24, 
        fontWeight: 'bold', 
        marginRight: 10
    },
    txtChitiet:{
        fontSize: 24, 
    }
});