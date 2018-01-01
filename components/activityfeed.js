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

export default class ActivityFeed extends React.Component {
    state = {
        activities: {
            1: [{
                name: 'Walking',
                duration: 20,
                dateCreated: 'Sun Dec 31 2017 18:16:41 GMT-0600 (CST)'
            }, {
                name: 'Weight Lifting',
                duration: 60,
                dateCreated: 'Sun Dec 31 2017 12:10:15 GMT-0600 (CST)'
            }, {
                name: 'Walking',
                duration: 20,
                dateCreated: 'Sun Dec 30 2017 12:16:41 GMT-0600 (CST)'
            }, {
                name: 'Ping Pong',
                duration: 50,
                dateCreated: 'Sun Dec 30 2017 10:20:00 GMT-0600 (CST)'
            }, {
                name: 'Weight Lifting',
                duration: 60,
                dateCreated: 'Sun Dec 28 2017 10:00:00 GMT-0600 (CST)'
            }, {
                name: 'Played Tennis',
                duration: 120,
                dateCreated: 'Sun Dec 27 2017 14:30:00 GMT-0600 (CST)'
            }, {
                name: 'Running',
                duration: 40,
                dateCreated: 'Sun April 25 2017 10:00:00 GMT-0600 (CST)'
            }],
            2: [{
                name: 'Running',
                duration: 45,
                dateCreated: 'Sun Dec 30 2017 10:30:00 GMT-0600 (CST)'
            }, {
                name: 'Play Tennis',
                duration: 60,
                dateCreated: 'Sun Dec 30 2017 08:00:00 GMT-0600 (CST)'
            }],
        }
    }
    getDaysFromNow(date) {
        return Math.ceil((new Date(date).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    }
    getActivities(userId) {
        let headerText = '';
        let rendered = {
            today: false,
            yesterday: false,
            previous: false
        }
        const userActivities = this.state.activities[userId];
        const activities = userActivities.map((activity, i) => {
            let headerEl = null;
            if (!rendered.today && this.getDaysFromNow(activity.dateCreated) > -1) {
                headerText = 'Today';
                rendered.today = true;
            } else if (!rendered.yesterday && this.getDaysFromNow(activity.dateCreated) === -1) {
                headerText = 'Yesterday';
                rendered.yesterday = true;
            } else if (!rendered.previous && this.getDaysFromNow(activity.dateCreated) < -1) {
                headerText = 'Previous Activities';
                rendered.previous = true;
            } else {
                headerText = '';
            }

            if (headerText) {
                headerEl = <Text style={styles.sectionTitle}>{headerText}</Text>;
            }

            return (
                <View key={i}>
                    {headerEl}
                    <View style={styles.list}>
                        <View style={styles.listRow}>
                            <Text style={styles.listText}>
                                {activity.name}
                            </Text>
                            <Text style={[styles.transparent, styles.listTextRight]}>
                                {
                                    new Date(activity.dateCreated).toLocaleDateString(
                                        "en-US",
                                        {
                                            weekday: undefined,
                                            year: '2-digit',
                                            month: 'numeric',
                                            day: 'numeric'
                                        }
                                    )
                                }
                            </Text>
                        </View>
                        <View>
                            <Text style={[styles.transparent, styles.textMuted]}>
                                {activity.duration} Minutes
                            </Text>
                        </View>
                    </View>
                </View>
            );
        });
        return (activities);
    }
    render() {
        const userId = this.props.navigation.state.params.userId;
        const activities = this.getActivities(userId);
        return (
            <View style={styles.bg}>
                <ScrollView contentContainerStyle={styles.container}>
                    {activities}
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
    textMuted: {
        color: '#666'
    },
    transparent: {
        backgroundColor: 'transparent'
    },
    sectionTitle: {
        padding: 2,
        textAlign: 'center',
        color: '#28659c',
        fontWeight: 'bold',
        backgroundColor: '#d9f2ff'
    },
    // List Styles
    list: {
        padding: 10
    },
    listRow: {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        flexDirection: 'row'
    },
    listText: {
        fontSize: 14,
        width: '100%',
        paddingRight: 65
    },
    listTextRight: {
        width: 100,
        marginLeft: 'auto',
        textAlign: 'right'
    },
    // Button Styles
    buttonText: {
        backgroundColor: 'transparent',
        fontSize: 18
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
    }
});
