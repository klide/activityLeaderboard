import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Modal,
    Button,
    TextInput
} from 'react-native';

export default class LeaderBoard extends React.Component {
    state = {
        validationError: false,
        activityModalVisible: false,
        activity: {
            name: null,
            duration: null,
            dateCreated: null
        },
        myPoints: 100,
        activities: {
            1: [{
                name: 'Walking',
                duration: 20,
                dateCreated: 'Sun Dec 31 2017 18:16:41 GMT-0600 (CST)'
            }, {
                name: 'Weight Lifting',
                duration: 60,
                dateCreated: 'Sun Dec 31 2017 12:10:15 GMT-0600 (CST)'
            }],
            2: [{
                name: 'Running',
                duration: 45,
                dateCreated: 'Sun Dec 30 2017 10:30:00 GMT-0600 (CST)'
            }, {
                name: 'Play Tennis',
                duration: 60,
                dateCreated: 'Sun Dec 30 2017 08:15:00 GMT-0600 (CST)'
            }],
        }
    }
    toggleActivityModal(visible) {
        this.setState({
            activity: {
                name: null,
                duration: null,
                dateCreated: null
            },
            activityModalVisible: visible,
            validationError: false
        });
    }
    updateActivity(updates) {
        const activityUpdates = Object.assign({ dateCreated: new Date().toString() }, updates);
        this.setState({
            activity: Object.assign(this.state.activity, activityUpdates)
        });
    }
    updateActivityName(name) {
        this.updateActivity({ name: name });
    }
    updateActivityDuration(duration) {
        this.updateActivity({ duration: duration });
    }
    addActivity() {
        let validationError = (!this.state.activity.name || !this.state.activity.duration);

        // Validate
        this.setState({
            validationError: validationError
        });

        if (validationError) {
            return;
        }

        // @TODO - If valid, pass to server
        this.updatePoints();

        // Close the modal
        this.toggleActivityModal(false);
    }
    updatePoints() {
        const currentPoints = this.state.myPoints;
        const newPoints = Math.round(this.state.activity.duration / 10);
        this.setState({
            myPoints: currentPoints + newPoints
        });
    }
    render() {
        const { navigate } = this.props.navigation;
        const validationErrorMessage = this.state.validationError ? (
            <View style={styles.formFieldWrapper}>
                <Text style={styles.textError}>All fields are required</Text>
            </View>
        ) : null;
        return (
            <View style={styles.bg}>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.activityModalVisible}
                >
                    <View style={styles.modalContainer}>
                        <Text style={[styles.h1, styles.center]}>Add an Activity</Text>
                        <View style={styles.formFieldWrapper}>
                            <Text>Activity Name</Text>
                            <TextInput
                                style={styles.textField}
                                value={this.state.activity.name}
                                onChangeText={(name) => {this.updateActivityName(name)}}
                            />
                        </View>
                        <View style={styles.formFieldWrapper}>
                            <Text>Duration (Minutes)</Text>
                            <TextInput
                                keyboardType="numeric"
                                style={styles.textField}
                                value={this.state.activity.duration}
                                onChangeText={(duration) => {this.updateActivityDuration(duration)}}
                            />
                        </View>
                        {validationErrorMessage}
                        <View style={styles.formFieldWrapper}>
                            <TouchableOpacity onPress={() => {this.addActivity()}}>
                                <View style={[styles.button, styles.buttonSuccess]}>
                                    <Text
                                        style={[
                                            styles.buttonText,
                                            styles.textWhite
                                        ]}
                                    >
                                        Add
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <Button
                                title="Close"
                                onPress={() => {this.toggleActivityModal(false)}}
                            />
                        </View>
                    </View>
                </Modal>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.sectionTitle}>Leaders</Text>
                    <TouchableOpacity onPress={() => navigate('ActivityFeed', { userId: 1 })}>
                        <View style={styles.listRow}>
                            <Text style={styles.number}>#1</Text>
                            <View style={styles.listImage}></View>
                            <Text style={styles.listText}>
                                Boun Moua
                            </Text>
                            <View style={[styles.points, styles.pointsGold]}>
                                <Text style={styles.transparent}>
                                    {this.state.myPoints}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('ActivityFeed', { userId: 2 })}>
                        <View style={styles.listRow}>
                            <Text style={styles.number}>#2</Text>
                            <View style={styles.listImage}></View>
                            <Text style={styles.listText}>
                                Tommy Xiong
                            </Text>
                            <View style={[styles.points, styles.pointsSilver]}>
                                <Text style={styles.transparent}>
                                    80
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.listRow}>
                        <Text style={styles.number}>#3</Text>
                        <View style={styles.listImage}></View>
                        <Text style={styles.listText}>
                            Mai Xiong
                        </Text>
                        <View style={[styles.points, styles.pointsBronze]}>
                            <Text style={styles.transparent}>
                                60
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.sectionTitle}>Others</Text>
                    <View style={styles.listRow}>
                        <Text style={styles.number}>#4</Text>
                        <View style={styles.listImage}></View>
                        <Text style={styles.listText}>
                            Nalee Xiong
                        </Text>
                        <View style={styles.points}>
                            <Text style={styles.transparent}>
                                50
                            </Text>
                        </View>
                    </View>
                    <View style={styles.listRow}>
                        <Text style={styles.number}>#5</Text>
                        <View style={styles.listImage}></View>
                        <Text style={styles.listText}>
                            Bob Thao
                        </Text>
                        <View style={styles.points}>
                            <Text style={styles.transparent}>
                                40
                            </Text>
                        </View>
                    </View>
                    <View style={styles.listRow}>
                        <Text style={styles.number}>#6</Text>
                        <View style={styles.listImage}></View>
                        <Text style={styles.listText}>
                            Joe Momma
                        </Text>
                        <View style={styles.points}>
                            <Text style={styles.transparent}>
                                30
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => {this.toggleActivityModal(true)}}>
                    <View style={styles.addButton}>
                        <Text style={[styles.buttonText, styles.addButtonText]}>Add</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    },
    container: {
        backgroundColor: '#fff'
    },
    textWhite: {
        color: '#fff'
    },
    textError: {
        color: '#f34043'
    },
    center: {
        textAlign: 'center'
    },
    h1: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    textField: {
        borderWidth: 1,
        borderColor: '#c6c6c6',
        borderRadius: 5,
        padding: 8,
        fontSize: 18
    },
    transparent: {
        backgroundColor: 'transparent'
    },
    formFieldWrapper: {
        marginTop: 20
    },
    sectionTitle: {
        padding: 2,
        textAlign: 'center',
        color: '#28659c',
        fontWeight: 'bold',
        backgroundColor: '#d9f2ff'
    },
    border: {
        borderWidth: 1,
        borderColor: '#c6c6c6',
        borderRadius: 5
    },
    // List Styles
    listRow: {
        padding: 10,
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        flexDirection: 'row'
    },
    number: {
        width: 23,
        color: '#28659c',
        fontWeight: 'bold',
        marginRight: 10
    },
    listImage: {
        height: 40,
        width: 40,
        marginRight: 10,
        backgroundColor: '#ddd',
        borderRadius: 360,
    },
    listText: {
        fontSize: 14,
        width: '100%',
        paddingRight: 115
    },
    // Points Styles
    points: {
        height: 38,
        width: 38,
        backgroundColor: '#e2e2e2',
        borderRadius: 360,
        marginLeft: 'auto',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pointsGold: {
        backgroundColor: '#ffd93f',
    },
    pointsSilver: {
        backgroundColor: '#c6c6c6',
    },
    pointsBronze: {
        backgroundColor: '#d09639',
    },
    // Button Styles
    buttonText: {
        backgroundColor: 'transparent',
        fontSize: 18
    },
    button: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#c6c6c6',
        alignItems: 'center'
    },
    buttonSuccess: {
        backgroundColor: '#2ca231'
    },
    addButton: {
        position: 'absolute',
        alignSelf: 'center',
        width: 60,
        height: 60,
        marginRight: -30,
        backgroundColor: '#2ca231',
        borderRadius: 360,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        zIndex: 2,
        position: 'absolute',
        bottom: 10,
        right: '50%'
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    // Modals
    modalContainer: {
        padding: 10,
        paddingTop: 34
    }
});
