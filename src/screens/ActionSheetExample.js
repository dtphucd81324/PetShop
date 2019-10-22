import React, { Component } from "react";
import { Container, Header, Button, Content, ActionSheet, Icon } from "native-base";
import { Root } from "native-base";

var BUTTONS = ["Mới", "Mua nhiều nhất", "Giá thấp nhất", "Khuyến mãi", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;
export default class ActionSheetExample extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Root>
                <Button
                    onPress={() =>
                        ActionSheet.show(
                            {
                                options: BUTTONS,
                                cancelButtonIndex: CANCEL_INDEX,
                                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                title: "Testing ActionSheet"
                            },
                            buttonIndex => {
                                this.setState({ clicked: BUTTONS[buttonIndex] });
                            }
                        )}
                >
                    <Icon name="filter" type="Feather" />
                </Button>
            </Root>

        );
    }
}