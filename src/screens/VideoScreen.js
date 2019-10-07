import React, { Component } from 'react';
import Video from 'react-native-video';
import { View, Text, StyleSheet } from 'react-native';

export default class VideoScreen extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            //item: this.props.navigation.state.params.data,
            
        };
    };
    
    render() {
        return (
            <View style={styles.container}>

                <Video style={styles.backgroundVideo}
                    fullscreenOrientation="all"
                    onBuffer={this.onBuffer}   // Callback function
                    onError={this.videoError}
                    source={{ uri: 'https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' }}
                    resizeMode="contain"
                    rate={1}
                    volume={10}
                    muted={false}
                    ignoreSilentSwitch={null}
                    fullscreen={true}
                    // onLoad={(data) => { Alert.alert(' onLoad!') }}
                    //onBuffer={() => { Alert.alert(onBuffer!') }}
                    // onProgress={() => { Alert.alert('onProgress!') }}
                    // onEnd={() => { Alert.alert('onEnd!') }}
                    repeat={false}
                    controls={true}
                />
                {/* <Video
                    onEnd={this.onEnd}
                    onLoad={this.onLoad}
                    onLoadStart={this.onLoadStart}
                    onProgress={this.onProgress}
                    paused={this.state.paused}
                    ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                    resizeMode={this.state.screenType}
                    onFullScreen={this.state.isFullScreen}
                    source={{ uri: 'https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' }}
                    style={styles.mediaPlayer}
                    volume={10}
                /> 
                <MediaControls
                    duration={this.state.duration}
                    isLoading={this.state.isLoading}
                    //mainColor="#333"
                    onFullScreen={this.onFullScreen}
                    onPaused={this.onPaused}
                    onReplay={this.onReplay}
                    onSeek={this.onSeek}
                    onSeeking={this.onSeeking}
                    playerState={this.state.playerState}
                    progress={this.state.currentTime}
                    toolbar={this.renderToolbar()}
                />  */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
})