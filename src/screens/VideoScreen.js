import React, { Component } from 'react';
import { Icon, Button, Header, Left, Right, Card, CardItem } from 'native-base';
import { StyleSheet, View, ScrollView, SafeAreaView, Text } from 'react-native';
import Video from 'react-native-video';

export default class VideoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.navigation.state.params.data,
        }
    }

    componentDidMount() {
        console.log(this.state.data)
    }

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
                    <View style={styles.video}>
                        <Video source={{ uri: 'https://res.cloudinary.com/petshop/video/upload/v1572806005/' + this.state.data[3].ha_ten + '.mp4' }}   // Can be a URL or a localfile.
                            ref={(ref) => {
                                this.player = ref
                            }}                                      // Store reference
                            onBuffer={this.onBuffer}                // Callback when remote video is buffering
                            onEnd={this.onEnd}                      // Callback when playback finishes
                            onError={this.videoError}               // Callback when video cannot be loaded
                            style={styles.backgroundVideo} />
                    </View>
                </View>
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
        right: 30,
    },
    video: {
        width: 770,
        height: 400,
    },
})