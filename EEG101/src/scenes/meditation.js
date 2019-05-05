import {Component} from "react";
import {bindActionCreators} from "redux";
import {initNativeEventListeners} from "../redux/actions";
import {connect} from "react-redux";


function mapStateToProps(state) {
    return {
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


class Meditation extends Component {

}

export default connect(mapStateToProps, mapDispatchToProps)(Meditation);
