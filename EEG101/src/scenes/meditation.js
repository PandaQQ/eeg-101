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

    constructor(props) {
        super(props);

        // Initialize States
    }

    componentDidMount() {
        Meditation.startMediationReading();
    }


    componentWillUnmount() {
        this.props.stopMeditationReading();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Meditation);
