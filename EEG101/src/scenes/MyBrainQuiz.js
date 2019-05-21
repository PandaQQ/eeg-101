import React, { Component } from "react";
import { Text, View, ViewPagerAndroid } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { startMediationReading, stopMeditationReading } from "../redux//actions";
import config from "../redux/config";
import { MediaQueryStyleSheet } from "react-native-responsive";
import PopUp from "../components/PopUp";
import I18n from "../i18n/i18n";
import * as colors from "../styles/colors";
import { Button } from '@ant-design/react-native';

function mapStateToProps(state) {
    return {
        connectionStatus: state.connectionStatus,
        dimensions: state.graphViewDimensions
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            startMediationReading,
            stopMeditationReading
        },
        dispatch
    );
}

class MyBrainQuiz extends Component {
    constructor(props) {
        super(props);

        // Initialize States
        this.state = {
            popUp1Visible: false,
            part1Value: 1,
            part2Value: 1,
        };
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <Button loading>Loading button</Button>

                {/*<List style={{ marginTop: 12 }}>*/}
                    {/*<Text style={{ marginTop: 12 }}>*/}
                        {/*Form radio, radio in general list.*/}
                    {/*</Text>*/}
                    {/*<RadioItem*/}
                        {/*checked={this.state.part2Value === 1}*/}
                        {/*onChange={event => {*/}
                            {/*if (event.target.checked) {*/}
                                {/*this.setState({ part2Value: 1 });*/}
                            {/*}*/}
                        {/*}}*/}
                    {/*>*/}
                        {/*Use Ant Desgin Component*/}
                    {/*</RadioItem>*/}
                    {/*<RadioItem*/}
                        {/*checked={this.state.part2Value === 2}*/}
                        {/*onChange={event => {*/}
                            {/*if (event.target.checked) {*/}
                                {/*this.setState({ part2Value: 2 });*/}
                            {/*}*/}
                        {/*}}*/}
                    {/*>*/}
                        {/*Use Ant Desgin Component*/}
                    {/*</RadioItem>*/}
                    {/*<RadioItem disabled>Set disabled</RadioItem>*/}
                    {/*<RadioItem disabled checked>*/}
                        {/*Set disabled*/}
                    {/*</RadioItem>*/}
                {/*</List>*/}


                <PopUp
                    onClose={() => this.props.history.push("/myconnector")}
                    visible={
                        this.props.connectionStatus === config.connectionStatus.DISCONNECTED
                    }
                    title={I18n.t("museDisconnectedTitle")}
                >
                    {I18n.t("museDisconnectedDescription")}
                </PopUp>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBrainQuiz);

const styles = MediaQueryStyleSheet.create(
    // Base styles
    {
        currentTitle: {
            marginLeft: 20,
            marginTop: 10,
            fontSize: 13,
            fontFamily: "Roboto-Medium",
            color: colors.skyBlue
        },

        classText: {
            textAlign: "center",
            margin: 15,
            lineHeight: 50,
            color: colors.white,
            fontFamily: "Roboto-Black",
            fontSize: 48
        },

        body: {
            fontFamily: "Roboto-Light",
            color: colors.black,
            fontSize: 19,
            textAlign: "center"
        },

        container: {
            backgroundColor: colors.skyBlue,
            flex: 1,
            justifyContent: "space-around",
            alignItems: "stretch"
        },

        graphContainer: {
            backgroundColor: colors.skyBlue,
            flex: 4
        },

        header: {
            fontFamily: "Roboto-Bold",
            color: colors.black,
            fontSize: 20
        },

        buttonView: { padding: 40 },

        noiseView: { position: "absolute", top: 30, right: 30 },

        buttonContainer: { flexDirection: "row", justifyContent: "space-around" },

        buttonFlex: { flex: 1 },

        viewPager: {
            flex: 4
        },

        pageStyle: {
            padding: 20,
            alignItems: "stretch",
            justifyContent: "space-around"
        },

        image: {
            flex: 1,
            width: null,
            height: null
        }
    },
    // Responsive styles
    {
        "@media (min-device-height: 700)": {
            viewPager: {
                flex: 3
            },

            header: {
                fontSize: 30
            },

            currentTitle: {
                fontSize: 20
            },

            body: {
                fontSize: 25
            }
        }
    }
);
