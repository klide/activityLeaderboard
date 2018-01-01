import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Button,
    TextInput
} from 'react-native';

export default class AddActivityModal extends React.Component {
    state = {
        validationError: false,
        activityModalVisible: false,
        activity: {
            name: null,
            duration: null,
            dateCreated: null
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
        this.props.updatePoints(Math.round(this.state.activity.duration / 10));
    }
    render() {
        const validationErrorMessage = this.state.validationError ? (
            <View style={styles.formFieldWrapper}>
                <Text style={styles.textError}>All fields are required</Text>
            </View>
        ) : null;

        return (
            <View>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.activityModalVisible}
                    supportedOrientations={['portrait', 'landscape']}
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
                                <View
                                    style={[
                                        styles.button,
                                        styles.buttonSuccess,
                                        styles.addButtonMargin
                                    ]}
                                >
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
    formFieldWrapper: {
        marginTop: 20
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
    addButtonMargin: {
        marginBottom: 10
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
        paddingTop: 33
    }
});
