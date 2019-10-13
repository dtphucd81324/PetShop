import React, { Component } from 'react';
import { Icon, Button, Header, Left, Right, Card, CardItem } from 'native-base';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import Video from 'react-native-video';

export default class VideoScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Video source={{ uri: 'https://rawgit.com/uit2712/Mp3Container/master/tom_and_jerry_31.mp4' }}   // Can be a URL or a localfile.
                    ref={(ref) => {
                        this.player = ref
                    }}                                      // Store reference
                    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    onEnd={this.onEnd}                      // Callback when playback finishes
                    onError={this.videoError}               // Callback when video cannot be loaded
                    style={styles.backgroundVideo} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 50
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    card: {
        height: 280,
        width: 210,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
    }
})