import React, { Component } from "react";
import { Text, View, ImageBackground } from "react-native";
import { connect } from "react-redux";
import { MediaQueryStyleSheet } from "react-native-responsive";
import LinkButton from "../components/WhiteLinkButton";
import I18n from "../i18n/i18n";
import { bindActionCreators } from "redux";
import { setGraphViewDimensions } from "../redux/actions";
import * as colors from "../styles/colors";
import config from "../redux/config";

function mapStateToProps(state) {
  return {
    connectionStatus: state.connectionStatus
  };
}

// Binds actions to component's props
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setGraphViewDimensions
    },
    dispatch
  );
}

class Landing extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
        <View style={styles.container}>
        <View
          onLayout={event => {
            // Captures the width and height of the graphContainer to determine overlay positioning properties in PSDGraph
            let { x, y, width, height } = event.nativeEvent.layout;
            this.props.setGraphViewDimensions({
              x: x,
              y: y,
              width: width,
              height: height * 0.75
            });
          }}
          style={styles.titleBox}
        >
          <Text style={styles.title}>
            My Brain
          </Text>
          <Text style={styles.body}>
            MyBrian demonstrates how EEG device can be used to measure the electrical activity of the brain.
          </Text>
        </View>
          <View style={styles.buttonContainer}>
            <LinkButton path="/myconnector" disabled={this.props.connectionStatus === config.connectionStatus.CONNECTED}>
              CONNECT MUSE
            </LinkButton>
            <LinkButton path="/sandbox" disabled={this.props.connectionStatus !== config.connectionStatus.CONNECTED}>
              EEG SANDBOX
            </LinkButton>
            <LinkButton path="/bciTrain" disabled={this.props.connectionStatus !== config.connectionStatus.CONNECTED}>
              EEG BCI
            </LinkButton>
          </View>

        </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Landing);

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
      flex: 1,
      margin: 40,
      justifyContent: "center"
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
      flex: 3,
      alignItems: "center",
      justifyContent: "center"
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
  }
);
