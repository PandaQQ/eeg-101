import {Component} from "react";
import {bindActionCreators} from "redux";
import {initNativeEventListeners} from "../redux/actions";
import {connect} from "react-redux";
import React from "react";
import {MediaQueryStyleSheet} from "react-native-responsive";
import * as colors from "../styles/colors";
import { startMediationReading, stopMeditationReading } from "../redux/actions";
import PopUpList from "../components/PopUpList";
import ListItemBlock from "../components/ListItemBlock";
import I18n from "../i18n/i18n";

import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    SafeAreaView,
    TouchableHighlight
 } from 'react-native';


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
            dataSource: new ListView.DataSource({ //定义数据源
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loaded: false
        };

        this._renderRow = this._renderRow.bind(this);
    }

    componentDidMount() {
        // this.props.startMediationReading();
        this.fetchData(); //开始请求数据
    }


    componentWillUnmount() {
        // this.props.stopMeditationReading();
    }


    fetchData() {
         let data = [
             {
                 title: '1',
                 year:'2',
                 average:6
             },
             {
                 title: '2',
                 year:'2',
                 average:6
             },
             {
                 title: '3',
                 year:'2',
                 average:6
             },
             {
                 title: '4',
                 year:'2',
                 average:6
             }
         ];

        // fetch("https://api.douban.com/v2/movie/in_theaters").then((response) => response.json()).then((responseData) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(data), //读取返回的所有电影数据
                });
      // }).done();
    }


    _pressRow(rowData){
        console.log(rowData);
        this.props.history.replace("/doingQuiz");
    }


    _renderRow(rowData, sectionID, rowID) {
        return (
            <SafeAreaView>
                <TouchableHighlight onPress={
                    ()=>{
                        this._pressRow(rowData)
                    }
                }>
                <View style={styles.row}>
                    <Image
                        style={styles.thumb}
                        source= { {
                            uri: 'http://static.runoob.com/images/demo/demo1.jpg'
                        } } />
                    <View style={styles.texts}>
                        <Text style={styles.textTitle}>
                            {rowData.title}
                        </Text>
                        <Text style={styles.textTitle}>
                            年份: {rowData.year}
                        </Text>
                        <Text style={styles.textTitle}>
                            豆瓣评分: {rowData.average}
                        </Text>
                    </View>
                </View>
                </TouchableHighlight>
                <View style={styles.separator}/>

            </SafeAreaView>
        );
    };


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.header}>
                        MyBrain Quiz List
                    </Text>
                </View>

                <ListView automaticallyAdjustContentInsets={false} //此选项可以修复掉会自动多出来的大约 10px 的空行
                          dataSource={this.state.dataSource}
                          renderRow={this._renderRow} />
            </View>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);

const styles = MediaQueryStyleSheet.create(
    // Base styles
    {   row: {
            flexDirection: 'row',
            padding: 10
        },
        separator: {
            height: 1,
            backgroundColor: '#EEEEEE'
        },
        thumb: {
            width: 60,
            height: 80,
            borderRadius: 5
        },
        textTitle: {
            flex: 1,
            textAlign: "left",
            paddingLeft: 10,
            fontWeight: "bold",
            flexDirection: 'row',
            color: colors.white
        },
        texts:{
            flexDirection: 'column',
            paddingTop: 5
        },
        listContainer:{
            marginTop: 20,
            borderTopWidth: 0,
            borderBottomWidth: 0,
        },
        ListItemContainer:{
            borderTopWidth: 0,
            borderBottomWidth: 0,
            marginLeft: 10,
            height: 65
        },
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