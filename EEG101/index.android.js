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
import MyConnector from "./src/scenes/myconnector"
import Sandbox from "./src/scenes/sandbox";
import BCIRun from "./src/scenes/bci-run.js";
import BCITrain from "./src/scenes/bci-train.js";
import MyBrainQuiz from "./src/scenes/MyBrainQuiz";
import Meditation from "./src/scenes/meditation";
import DoingQuiz from "./src/scenes/doingQuiz";
import QuizList from "./src/scenes/quizList";

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
                  <Route path="/myconnector" component={MyConnector} />
                  <Route path="/sandbox" component={Sandbox} />
                  <Route path="/bciRun" component={BCIRun} />
                  <Route path="/bciTrain" component={BCITrain} />
                  <Route path="/quiz" component={MyBrainQuiz} />
                  <Route path="/meditation" component={Meditation} />
                  <Route path="/doingQuiz" component={DoingQuiz} />
                  <Route path="/quizList"  component={QuizList} />
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
