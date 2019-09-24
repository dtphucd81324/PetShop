import React, { Component } from 'react';
import { View, Text, FlatList, Image, 
    StyleSheet, TouchableOpacity, ToastAndroid, 
    SearchBar, Platform, ActivityIndicator, Button 
    } from 'react-native';


const flatListData = [
    {
        "key": "1",
        "ten": "Chó Alaska",
        "imageUrl": require('./src/images/alaska1.jpg'),
        "mota": "Là một giống chó kéo xe ở Alaska"
    },
    {
        "key": "2",
        "ten": "Chó Husky",
        "imageUrl": require('./src/images/husky.jpg'),
        "mota": " Chó Husky Sibir là một giống chó cỡ trung thuộc nòi chó kéo xe có nguồn gốc từ vùng Đông Bắc Sibir, Nga. Xét theo đặc điểm di truyền, chó Husky được xếp vào dòng Spitz. Chó Husky có hai lớp lông dày, tai dựng hình tam giác và thường có những điểm nhận dạng."
    },
    {
        "key": "3",
        "ten": "Chó Bull",
        "imageUrl": require('./src/images/pull4.jpg'),
        "mota": " Chó bò Anh hay Chó bò hay chó mặt bò là một giống chó đầu to, khoẻ và dũng cảm của Vương quốc Anh, Chó Bun là giống chó có nguồn gốc từ chó ngao châu Á cổ xưa nhưng chỉ thực sự phát triển ở nước Anh."
    },
    {
        "key": "4",
        "ten": "Chó Pug",
        "imageUrl": require('./src/images/pug.jpg'),
        "mota": " Pug, hay thường được gọi là chó mặt xệ, là giống chó thuộc nhóm chó cảnh có nguồn gốc từ Trung Quốc, chúng có một khuôn mặt nhăn, mõm ngắn, và đuôi xoăn. Giống chó này có bộ lông mịn, bóng, có nhiều màu sắc nhưng phổ biến nhất là màu đen và nâu vàng."
    },
    {
        "key": "5",
        "ten": "Chó Poodle",
        "imageUrl": require('./src/images/poodle1.jpg'),
        "mota": " Chó săn vịt là một giống chó săn dùng để săn các loại thủy cầm trong đó chủ yếu là vịt. Ngày nay giống chó này được lai tạo để trở thành dòng chó cảnh với hình tượng là là những quý cô xinh xắn, yêu kiều."
    },
    {
        "key": "6",
        "ten": "Chó Lạp Xưởng",
        "imageUrl": require('./src/images/lapxuong.jpg'),
        "mota": " Chó Dachshund còn gọi là lạp xưởng, xúc xích. Dachshund là giống chó thân dài, ngực nở, bụng hóp, hoạt bát, rắn chắc với 4 chân rất ngắn. Chúng tạo cho giống chó này một dáng vẻ độc đáo và đầy chất thông thái. Đầu thuôn dài, mắt hơi lồi, mõm dài với bộ hàm khoẻ mạnh cùng những chiếc răng vô cùng sắc bén."
    },
    {
        "key": "7",
        "ten": "Chó Nhật",
        "imageUrl": require('./src/images/dogjapan.jpg'),
        "mota": " Chó Nhật là giống chó của hoàng gia Nhật. Giống chó này thường được nuôi làm cảnh hoặc để bầu bạn."
    },
    {
        "key": "8",
        "ten": "Chó Samoyed",
        "imageUrl": require('./src/images/samoyed.jpg'),
        "mota": " Samoyed là một giống chó săn có nguồn gốc từ vùng Siberia, đây là giống chó có bộ lông trắng tinh như tuyết cùng tính cách mang nhiều đặc điểm của chó sói là những đặc trưng nổi bật của giống chó này. Samoyed có nghĩa là giống chó có khả năng tự tìm ra thức ăn."
    },

]




export default class DanhSach extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            dataSource: []
            //loading: false
        }
    }

    // renderSeparator = () => {
    //     return (
    //         <View
    //             style={{
    //                 height: 1,
    //                 width: "86%",
    //                 backgroundColor: "#CED0CE",
    //                 marginLeft: "14%"
    //             }}
    //         />
    //     );
    // }

    // renderHeader = () => {
    //     return <SearchBar placeholder="Type Here..." lightTheme round />;
    // };

    // renderFooter = () => {
    //     if (!this.state.loading) return null;
    //     return (
    //         <View
    //             style={{
    //                 paddingVertical: 20,
    //                 borderTopWidth: 1,
    //                 borderColor: "#CED0CE"
    //             }}
    //         >
    //             <ActivityIndicator animating size="large" />
    //         </View>
    //     );
    // }
    componentDidMount() {
        this.setState({ dataSource: flatListData });
    }

    refresh() {

    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    refreshing={false}
                    onRefresh={() => { this.refresh() }}
                    data={this.state.dataSource}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                backgroundColor: 'mediumseagreen',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Image
                                    source={item.imageUrl}
                                    style={{ width: 150, height: 150, margin: 5, borderRadius: 7 }}
                                />

                                {/* <View style={{ flex: 1, flexDirection: 'column' }}> */}
                                    <Text style={styles.textItemTen}>{item.ten}</Text>
                                    <Text style={styles.textItem}>{item.mota}</Text>
                                    
                                {/* </View> */}
                                
                            </View>
                            <View style={{ height: 1, backgroundColor: 'white' }}>

                            </View>
                        </View>

                    }
                />
            </View>
        );
    }

    // renderItem = ({ item }) => {
    //     return (
    //         <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, }}
    //             onPress={() => ToastAndroid.show(item.TEN, ToastAndroid.SHORT)} >
    //             <Image
    //                 style={{ width: 80, height: 80, margin: 5 }}
    //                 source={{ uri: item.HINH }}
    //             >
    //             </Image>
    //             <View style={{ flex: 1, justifyContent: 'center', marginLeft: 5 }}>
    //                 <Text style={{ fontSize: 18, color: 'red', marginBottom: 15 }}>{item.TEN}</Text>
    //                 <Text style={{ fontSize: 16, color: 'black' }}>{item.MOTA}</Text>
    //             </View>
    //         </TouchableOpacity>
    //     )
    // }

    // componentDidMount() {
    //     fetch("http://192.168.1.9/ConnectReactNative/flatlistconnect.php")
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             this.setState({
    //                 dataSource: responseJson,
    //                 isLoading: false
    //             });
    //         })
    //         .catch((e) => { console.log(e) });
    // }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    textItem: {
        color: 'white',
        padding: 10,
        fontSize: 16
    },
    textItemTen: {
        color: 'red',
        padding: 10,
        fontSize: 18
    }
})