import React, { Component } from 'react';
import { Icon, Button, Header, Left, Right, Card, CardItem } from 'native-base';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import Video from 'react-native-video';

export default class VideoScreen extends Component {
    render() {
        const { params } = this.props.navigation.state;
        //const {video} = params.item;
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
                <View style={styles.container}>
                    <SafeAreaView>
                        <Card>
                            <CardItem>
                                <View style={styles.video}>
                                    <Video source={{ uri: 'http://res.cloudinary.com/petshop/video/upload/15_1_videomeotaicup.mp4.mp4' }}   // Can be a URL or a localfile.
                                        ref={(ref) => {
                                            this.player = ref
                                        }}                                      // Store reference
                                        onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                        onEnd={this.onEnd}                      // Callback when playback finishes
                                        onError={this.videoError}               // Callback when video cannot be loaded
                                        style={styles.backgroundVideo} />
                                </View>

                            </CardItem>
                        </Card>
                    </SafeAreaView>
                </View>

                {/* <View style={styles.container}>

                </View> */}
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        marginTop: 20,
    },
    backgroundVideo: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 10,
        left: 10,
        bottom: 0,
        right: 10,
    },
    card: {
        height: 280,
        width: 210,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
    },
    video: {
        width: 200,
        height: 170,
    },
})