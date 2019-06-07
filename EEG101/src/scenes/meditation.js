import {Component} from "react";
import {bindActionCreators} from "redux";
import {initNativeEventListeners} from "../redux/actions";
import {connect} from "react-redux";
import {Text, View, ViewPagerAndroid} from "react-native";
import PopUp from "../components/PopUp";
import config from "../redux/config";
import I18n from "../i18n/i18n";
import React from "react";
import {MediaQueryStyleSheet} from "react-native-responsive";
import * as colors from "../styles/colors";
import { startMediationReading, stopMeditationReading } from "../redux//actions";
import NoiseIndicator from "../components/NoiseIndicator";
import MedHistoryChart from "../components/MedHistoryChart";
import ProgressCircle from 'react-native-progress-circle';
import Classifier from "../native/Classifier";

function mapStateToProps(state) {
    return {
        connectionStatus: state.connectionStatus,
        dimensions: state.graphViewDimensions,
        noise: state.noise,
        classifierData: state.medData,
        medValue: state.medValue,
        notchFrequency: state.notchFrequency,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            initNativeEventListeners,
            startMediationReading,
            stopMeditationReading
        },
        dispatch
    );
}


class Meditation extends Component {

    constructor(props) {
        super(props);

        // Initialize States
    }

    componentDidMount() {
        Classifier.startClassifier(this.props.notchFrequency);
        Classifier.startNoiseListener();
        this.props.startMediationReading();
    }


    componentWillUnmount() {
        this.props.stopMeditationReading();
    }

    render() {
        return (
            <View style={styles.container}>



                <View style={styles.graphContainer}>
                        <View style={styles.noiseView}>
                            <NoiseIndicator noise={this.props.noise} width={100} height={100} />
                        </View>
                    </View>
                    <Text style={styles.currentTitle}>Stress Level</Text>
                    <ViewPagerAndroid style={styles.viewPager} initialPage={0}>
                        <View style={styles.pageStyle}>
                            {/*<View style={styles.buttonView}>*/}
                            {/*</View>*/}
                            {/*<View style={styles.buttonContainer}>*/}
                                {/*<View style={styles.buttonFlex}>*/}
                                {/*</View>*/}
                                {/*<View style={styles.buttonFlex}>*/}
                                {/*</View>*/}
                            {/*</View>*/}
                                <ProgressCircle
                                    percent={this.props.medValue}
                                    radius={50}
                                    borderWidth={8}
                                    color="#3399FF"
                                    shadowColor="#999"
                                    bgColor="#fff"
                                >
                                    <Text style={{ fontSize: 18 }}>{this.props.medValue + '%'}</Text>
                                </ProgressCircle>

                        </View>
                    </ViewPagerAndroid>

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

export default connect(mapStateToProps, mapDispatchToProps)(Meditation);

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
            alignItems: "center",
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