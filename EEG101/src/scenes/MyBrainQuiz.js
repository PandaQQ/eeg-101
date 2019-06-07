import React, { Component } from "react";
import { Text, View, ViewPagerAndroid, TextInput, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { startMediationReading, stopMeditationReading } from "../redux//actions";
import config from "../redux/config";
import { MediaQueryStyleSheet } from "react-native-responsive";
import PopUp from "../components/PopUp";
import I18n from "../i18n/i18n";
import * as colors from "../styles/colors";
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import { setGraphViewDimensions } from "../redux/actions";



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
            stopMeditationReading,
            setGraphViewDimensions
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
            email: '',
            password: ''
        };
    }

    componentWillUnmount() {
    }

    onSelect(index, value){
        this.setState({
            text: `Selected index: ${index} , value: ${value}`
        })
    }

    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }
    login = (email, pass) => {
        // alert('email: ' + email + ' password: ' + pass)

        /*
        if(email === 'test' && pass === '1234') {
            this.props.history.replace("/doingQuiz");
        }*/
        // this.props.history.replace("/doingQuiz");

        this.props.history.replace("/quizList");
    }

    render() {
        return (
            <View style={styles.container}>

                {/*<RadioGroup*/}
                    {/*onSelect = {(index, value) => this.onSelect(index, value)}*/}
                    {/*color='white'*/}
                {/*>*/}
                    {/*<RadioButton value={'item1'}>*/}
                        {/*<Text>This is item #1</Text>*/}
                    {/*</RadioButton>*/}

                    {/*<RadioButton value={'item2'}>*/}
                        {/*<Text>This is item #2</Text>*/}
                    {/*</RadioButton>*/}

                    {/*<RadioButton value={'item3'}>*/}
                        {/*<Text>This is item #3</Text>*/}
                    {/*</RadioButton>*/}

                    {/*<RadioButton value={'item4'}>*/}
                        {/*<Text>This is item #4</Text>*/}
                    {/*</RadioButton>*/}

                {/*</RadioGroup>*/}

                {/*<Text style={styles.text}>{this.state.text}</Text>*/}


                    <View
                        onLayout={event => {
                            // Captures the width and height of the graphContainer to determine overlay positioning properties in PSDGraph
                            let { x, y, width, height } = event.nativeEvent.layout;
                            this.props.setGraphViewDimensions({
                                x: x,
                                y: y,
                                width: width,
                                height: height * 0.5
                            });
                        }}
                        style={styles.titleBox}
                    >
                        <Text style={styles.title}>
                            Start Quiz
                        </Text>
                        <Text style={styles.body}>
                            Fit the earpieces snugly behind your ears and adjust the headband so that it rests mid forehead. Clear any hair that might prevent the device from making contact with your skin.
                        </Text>

                    </View>

                <View style={styles.buttonContainer}>

                    <TextInput style = {styles.input}
                               underlineColorAndroid = "transparent"
                               placeholder = " Student Name"
                               placeholderTextColor = {colors.white}
                               autoCapitalize = "none"
                               onChangeText = {this.handleEmail}/>

                    <TextInput style = {styles.input}
                               secureTextEntry={true}
                               underlineColorAndroid = "transparent"
                               placeholder = " Password"
                               placeholderTextColor = {colors.white}
                               autoCapitalize = "none"
                               onChangeText = {this.handlePassword}/>

                    <TouchableOpacity
                        style = {styles.submitButton}
                        onPress = {
                            () => this.login(this.state.email, this.state.password)
                        }>
                        <Text style = {styles.submitButtonText}> START </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyBrainQuiz);


const styles = MediaQueryStyleSheet.create(
    {
        // Base styles
        body: {
            fontFamily: "Roboto-Light",
            fontSize: 17,
            margin: 20,
            color: colors.white,
            textAlign: "center"
        },

        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "stretch",
            width: null,
            height: null,
            backgroundColor: colors.skyBlue
        },

        buttonContainer: {
            flex: 3,
            margin: 20
        },

        logo: {
            width: 50,
            height: 50
        },

        title: {
            textAlign: "center",
            margin: 15,
            lineHeight: 50,
            color: colors.white,
            fontFamily: "Roboto-Black",
            fontSize: 48
        },

        titleBox: {
            flex: 2,
            alignItems: "center",
            justifyContent: "center"
        },

        input: {
            margin: 15,
            height: 40,
            borderColor: colors.white,
            borderWidth: 1,
            borderRadius: 4
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
    // Responsive styles
    {
        "@media (min-device-height: 700)": {
            body: {
                fontSize: 20,
                marginLeft: 50,
                marginRight: 50
            }
        }
    },
    //



);
