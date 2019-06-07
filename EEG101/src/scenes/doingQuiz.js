import {Component} from "react";
import {bindActionCreators} from "redux";
import {initNativeEventListeners} from "../redux/actions";
import {connect} from "react-redux";
import {Image, Text, TouchableOpacity, View, ViewPagerAndroid} from "react-native";
import PopUp from "../components/PopUp";
import config from "../redux/config";
import I18n from "../i18n/i18n";
import React from "react";
import {MediaQueryStyleSheet} from "react-native-responsive";
import * as colors from "../styles/colors";
import { startMediationReading, stopMeditationReading } from "../redux//actions";
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import PopUpLink from "../components/PopUpLink";
import ElectrodeSelector from "../components/ElectrodeSelector";
import LinkButton from "../components/LinkButton";
import {white} from "../styles/colors";
import NoiseIndicator from "../components/NoiseIndicator";
import ProgressCircle from "react-native-progress-circle";

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


class DoingQuiz extends Component {

    constructor(props) {
        super(props);
        // Initialize States
        // Initialize States
        this.state = {
            text: null,
            position: 0
        };
    }

    componentDidMount() {
        // this.props.startMediationReading();
    }


    componentWillUnmount() {
        // this.props.stopMeditationReading();
    }

    onSelect(index, value){
        this.setState({
            text: `Selected index: ${index} , value: ${value}`
        })
    }

    finish = () => {
        // alert('email: ' + email + ' password: ' + pass)

        /*
        if(email === 'test' && pass === '1234') {
            this.props.history.replace("/doingQuiz");
        }*/
        // this.props.history.replace("/quiz");

        let next = this.state.position + 1;
        this.setState({
            position: next
        });
        if(next === 5) {
            this.props.history.replace("/quiz");
        }
        else {
            this.refs.viewPage.setPage(next);
        }
    }


    render() {

        let question = (index) => (
            <View style={styles.pageStyle}>

                <View style={styles.question_content}>

                    <Text style={styles.header}>
                        Question {index}
                    </Text>

                    <Text style={styles.body}>
                        Question Content {index}
                        Question Content {index}
                        Question Content {index}
                        Question Content {index}
                    </Text>

                </View>


                <View style={styles.radioGroup}>

                    <RadioGroup onSelect = {(index, value) => this.onSelect(index, value)}
                                color='white'>
                        <RadioButton value={'item1'}>
                            <Text style={styles.body} >This is item #1</Text>
                        </RadioButton>

                        <RadioButton value={'item2'}>
                            <Text style={styles.body} >This is item #2</Text>
                        </RadioButton>

                        <RadioButton value={'item3'}>
                            <Text style={styles.body} >This is item #3</Text>
                        </RadioButton>

                        <RadioButton value={'item4'}>
                            <Text style={styles.body} >This is item #4</Text>
                        </RadioButton>
                    </RadioGroup>

                </View>
            </View>
        );


        let question_list = [];
        question_list.push(question(1));
        question_list.push(question(2));
        question_list.push(question(3));
        question_list.push(question(4));
        question_list.push(question(5));

        return (
            <View style={styles.container}>

                <View style={styles.pageStyle} >

                    <View style={styles.content}>

                        <Text style={styles.header}>
                            My Attention Score
                        </Text>

                        <ProgressCircle
                            percent={80}
                            radius={50}
                            borderWidth={8}
                            color="#3399FF"
                            shadowColor="#999"
                            bgColor="#fff"
                        >
                            <Text style={{ fontSize: 18 }}>{80 + '%'}</Text>
                        </ProgressCircle>

                    </View>

                </View>

                <ViewPagerAndroid //Allows us to swipe between blocks
                    style={styles.viewPager}
                    initialPage={0}
                    scrollEnabled={false}
                    ref="viewPage"
                >
                    {question_list}

                </ViewPagerAndroid>

                <View style={styles.graphContainer}>

                    <TouchableOpacity
                        style = {styles.submitButton}
                        onPress = {
                            () => {
                                this.finish();
                            }
                        }>
                        <Text style = {styles.submitButtonText}> Finish Quiz </Text>
                    </TouchableOpacity>

                </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(DoingQuiz);

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
            color: colors.white,
            fontSize: 15,
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
            flex: 1
        },

        header: {
            fontFamily: "Roboto-Bold",
            color: colors.white,
            fontSize: 20,
            textAlign: "center"
        },

        buttonView: { padding: 40 },

        noiseView: { position: "absolute", top: 30, right: 30 },

        buttonContainer: { flexDirection: "row", justifyContent: "space-around" },

        buttonFlex: { flex: 1 },

        viewPager: {
            flex: 5,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
        },

        pageStyle: {
            padding: 20,
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: "center"
        },

        image: {
            flex: 1,
            width: null,
            height: null
        },

        radioGroup: {
            flex: 3,
            borderColor: colors.white,
            borderWidth: 2,
            marginTop: 10
        },
        content: {
            alignItems: 'center'
        },
        question_content: {
            borderColor: colors.white,
            borderWidth: 2,
            flex: 1
        },
        submitButton: {

            backgroundColor: colors.white,
            height: 50,
            margin: 15,
            padding: 15,
            alignItems: "center",
            elevation: 2,
            borderRadius: 4
        },
        submitButtonText:{
            color: colors.skyBlue,
            fontFamily: "Roboto-Bold",
            fontSize: 17
        }
    },
    // // Responsive styles
    // {
    //     "@media (min-device-height: 700)": {
    //         viewPager: {
    //             flex: 3
    //         },
    //
    //         header: {
    //             fontSize: 30
    //         },
    //
    //         currentTitle: {
    //             fontSize: 20
    //         },
    //
    //         body: {
    //             fontSize: 15
    //         }
    //     }
    // }
);