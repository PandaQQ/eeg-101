import React, { Component } from "react";
import {PermissionsAndroid, Text, View} from "react-native";
import { connect } from "react-redux";
import { MediaQueryStyleSheet } from "react-native-responsive";
import config from "../redux/config";
import LinkButton from "../components/WhiteLinkButton";
import WhiteButton from "../components/WhiteButton";
import ConnectorWidget from "../components/ConnectorWidget";
import I18n from "../i18n/i18n";
import * as colors from "../styles/colors";
import {bindActionCreators} from "redux";
import {initNativeEventListeners, setOfflineMode} from "../redux/actions";

// Sets isVisible prop by comparing state.scene.key (active scene) to the key of the wrapped scene
function mapStateToProps(state) {
  return {
    connectionStatus: state.connectionStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
      {
        initNativeEventListeners
      },
      dispatch
  );
}

class MyConnector extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.requestLocationPermission();
    this.props.initNativeEventListeners();
  }


  // Checks if user has enabled coarse location permission neceessary for BLE function
  // If not, displays request popup
  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          {
            title: I18n.t("needsPermission"),
            message: I18n.t("requiresLocation")
          }
      );
    } catch (err) {
      console.warn(err);
    }
  }


  renderButton() {
    if (
        this.props.connectionStatus === config.connectionStatus.CONNECTED
    )
    {
      return;
    } else return (
        <WhiteButton onPress={() => null} disabled={true}>
          {I18n.t("getStartedLink")}
        </WhiteButton>
    );
  }




  render() {
    return (
        <View style={styles.container}>
          <View style={styles.titleBox}>
            <Text style={styles.instructions}>
              Wait for your muse to pair with MyBrain
            </Text>
          </View>
          <ConnectorWidget/>
          <View style={styles.buttonContainer}>
          </View>
        </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyConnector);

const styles = MediaQueryStyleSheet.create(
    // Base styles
    {
      body: {
        fontFamily: "Roboto-Light",
        fontSize: 15,
        margin: 20,
        color: colors.white,
        textAlign: "center"
      },

      instructions: {
        fontFamily: "Roboto-Bold",
        fontSize: 18,
        margin: 20,
        color: colors.white,
        textAlign: "center"
      },

      container: {
        flex: 1,
        justifyContent: "space-around",
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
        },

        instructions: {
          fontSize: 30
        }
      }
    }
);
