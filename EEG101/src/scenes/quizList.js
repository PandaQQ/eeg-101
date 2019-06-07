import {Component} from "react";
import {bindActionCreators} from "redux";
import {initNativeEventListeners} from "../redux/actions";
import {connect} from "react-redux";
import { View, FlatList} from "react-native";
import React from "react";
import {MediaQueryStyleSheet} from "react-native-responsive";
import * as colors from "../styles/colors";
import { startMediationReading, stopMeditationReading } from "../redux/actions";
import { ListItem } from 'react-native-elements'

const list = [
    {
        name: 'Amy Farha',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
    }
    ];

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


class QuizList extends Component {

    constructor(props) {
        super(props);
        // Initialize States
        // Initialize States
        this.state = {
            text: null
        };
    }

    componentDidMount() {
        // this.props.startMediationReading();
    }


    componentWillUnmount() {
        // this.props.stopMeditationReading();
    }

    keyExtractor = (item, index) => index.toString()


    renderItem = ({ item }) => (
        <ListItem
            title={item.name}
            subtitle={item.subtitle}
            leftAvatar={{
                source: item.avatar_url && { uri: item.avatar_url },
                title: item.name[0]
            }}
        />
    )



    render() {


        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={list}
                    renderItem={this.renderItem}
                />

            </View>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);

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