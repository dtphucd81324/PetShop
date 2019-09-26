import React, {Component} from 'react';
import Slideshow from 'react-native-slideshow';
import { StyleSheet, View } from 'react-native';


export default class HinhAnh extends Component{
    
    render(){
        return(
            <Slideshow 
                dataSource={this.state.dataSource}
                position={this.state.position}
                onPositionChanged={position => this.setState({ position })} />
        );
    }
}