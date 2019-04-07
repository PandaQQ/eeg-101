import React, { Component } from "react";
import { View, AppRegistry, StatusBar } from "react-native";
import {
  NativeRouter,
  AndroidBackButton,
  Route,
  Switch
} from "react-router-native";
import { setMenu } from "./src/redux/actions";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware, bindActionCreators } from "redux";
import { withRouter } from "react-router";
import Drawer from "react-native-drawer";
import thunk from "redux-thunk";
import { initNativeEventListeners } from "./src/redux/actions";
import NavBar from "./src/components/NavBar";
import SideMenu from "./src/components/SideMenu";
import * as colors from "./src/styles/colors.js";

// Scenes
import Landing from "./src/scenes/begin-landing";
import ConnectorOne from "./src/scenes/connector-01";
import ConnectorTwo from "./src/scenes/connector-02";
import ConnectorThree from "./src/scenes/connector-03";
import SlideOne from "./src/scenes/slide-01";
import SlideTwo from "./src/scenes/slide-02";
import SlideThree from "./src/scenes/slide-03";
import SlideFour from "./src/scenes/slide-04";
import SlideFive from "./src/scenes/slide-05";
import SlideSix from "./src/scenes/slide-06";
import SlideSeven from "./src/scenes/slide-07";
import SlideEight from "./src/scenes/slide-08";
import SlideNine from "./src/scenes/slide-09";
import Sandbox from "./src/scenes/sandbox";
import End from "./src/scenes/slide-end";
import BCIOne from "./src/scenes/bci-01.js";
import BCITwo from "./src/scenes/bci-02.js";
import BCIRun from "./src/scenes/bci-run.js";
import BCITrain from "./src/scenes/bci-train.js";


// reducer is a function
import reducer from "./src/redux/reducer";

function mapStateToProps(state) {
  return {
    open: state.isMenuOpen
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      onClose: () => setMenu(false)
    },
    dispatch
  );
}

// Connect SideMenu to Redux
// const DrawerWithRedux = withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(Drawer)
// );

// Create store
const store = createStore(reducer, applyMiddleware(thunk));

const mainViewStyle = { flex: 1 };

class EEG101 extends Component {

  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          <AndroidBackButton>
            <View style={mainViewStyle}>
              <StatusBar backgroundColor={colors.mariner} />
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route path="/connectorOne" component={ConnectorOne} />
                  <Route path="/connectorTwo" component={ConnectorTwo} />
                  <Route path="/connectorThree" component={ConnectorThree} />
                  <Route path="/slideFour" component={SlideFour} />
                  <Route path="/slideNine" component={SlideNine} />
                  <Route path="/bciOne" component={BCIOne} />
                  <Route path="/bciTwo" component={BCITwo} />
                  <Route path="/bciRun" component={BCIRun} />
                  <Route path="/bciTrain" component={BCITrain} />
                </Switch>
            </View>
          </AndroidBackButton>
        </NativeRouter>
      </Provider>
    );
  }
}

// Defines which component is the root for the whole project
AppRegistry.registerComponent("EEG101", () => EEG101);
