// import React, { Component } from 'react';
// //import Video from 'react-native-video';
// import Video from 'react-native-af-video-player'
// //import { Icon, Button, Header, Left, Right } from 'native-base';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';

// export default class VideoScreen extends Component {


//     constructor(props) {
//         super(props);
//         this.state = {
//             //item: this.props.navigation.state.params.data,

//         };
//     };

//     render() {
//         return (
//             <View style={styles.container}>
//                 <Video url={'https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'} />
//             </View>
//             // <View>
//             //     <View style={styles.container}>
//             //         <Video style={styles.backgroundVideo}
//             //             fullscreenOrientation="all"
//             //             onBuffer={this.onBuffer}   // Callback function
//             //             onError={this.videoError}
//             //             source={{ uri: 'https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' }}
//             //             resizeMode="contain"
//             //             rate={1}
//             //             volume={10}
//             //             muted={false}
//             //             ignoreSilentSwitch={null}
//             //             fullscreen={true}
//             //             // onLoad={(data) => { Alert.alert(' onLoad!') }}
//             //             //onBuffer={() => { Alert.alert(onBuffer!') }}
//             //             // onProgress={() => { Alert.alert('onProgress!') }}
//             //             // onEnd={() => { Alert.alert('onEnd!') }}
//             //             repeat={false}
//             //             controls={true}
//             //         />
//             //     </View>
//             // </View>
//             // {/* <Header transparent>
//             //     <Left>
//             //         <Button onPress={() => this.props.navigation.goBack()}>
//             //             <Icon name="undo" type="Ionicons" />
//             //         </Button>
//             //     </Left>
//             //     <Right />
//             // </Header> */}


//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         //alignItems: 'center',
//         justifyContent: 'center'
//     },
//     backgroundVideo: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         bottom: 0,
//         right: 0,
//     }
// })