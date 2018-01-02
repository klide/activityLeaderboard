import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';

export default class ActivityFeed extends React.Component {
    state = {
        activities: {
            1: [{
                name: 'Walking',
                duration: 20,
                dateCreated: 'Mon Jan 1 2018 00:00:41 GMT-0600 (CST)'
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
                name: 'Weight Lifting',
                duration: 50,
                dateCreated: 'Sun Dec 31 2017 12:10:15 GMT-0600 (CST)'
            }, {
                name: 'Walking',
                duration: 10,
                dateCreated: 'Sun Dec 30 2017 12:16:41 GMT-0600 (CST)'
            }, {
                name: 'Walking',
                duration: 40,
                dateCreated: 'Mon Jan 1 2018 00:00:41 GMT-0600 (CST)'
            }, {
                name: 'Running',
                duration: 30,
                dateCreated: 'Sun April 25 2017 10:00:00 GMT-0600 (CST)'
            }],
            3: [{
                name: 'Running',
                duration: 45,
                dateCreated: 'Sun Dec 30 2017 10:30:00 GMT-0600 (CST)'
            }, {
                name: 'Play Tennis',
                duration: 60,
                dateCreated: 'Sun Dec 31 2017 08:00:00 GMT-0600 (CST)'
            }, {
                name: 'Weight Lifting',
                duration: 30,
                dateCreated: 'Sun Dec 28 2017 10:00:00 GMT-0600 (CST)'
            }],
            5: [{
                name: 'Walking',
                duration: 25,
                dateCreated: 'Sun Dec 31 2017 10:30:00 GMT-0600 (CST)'
            }, {
                name: 'Play Tennis',
                duration: 40,
                dateCreated: 'Sun Dec 28 2017 08:00:00 GMT-0600 (CST)'
            }, {
                name: 'Ping Pong',
                duration: 30,
                dateCreated: 'Sun Dec 25 2017 10:00:00 GMT-0600 (CST)'
            }]
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.state.params.userName}'s Activity Feed`
        };
    }

    getYMD(date) {
        var d = new Date(date);
        return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    }
    getActivityList(userId) {
        let activityList = {
            today: {
                title: 'Today',
                activities: []
            },
            yesterday: {
                title: 'Yesterday',
                activities: []
            },
            previous: {
                title: 'Previous Activities',
                activities: []
            }
        }
        const currentDate = new Date();
        const today = this.getYMD(currentDate);
        const yesterday = this.getYMD(new Date(currentDate.setDate(currentDate.getDate() - 1)));
        const userActivities = this.state.activities[userId];

        // Loop through the activities and add them to the correct list (today, yesterday, previous)
        if (userActivities) {
            userActivities.forEach((activity) => {
                let activityDate = this.getYMD(activity.dateCreated);
                if (activityDate === today) {
                    activityList.today.activities.push(activity);
                } else if (activityDate === yesterday) {
                    activityList.yesterday.activities.push(activity);
                } else {
                    activityList.previous.activities.push(activity);
                }
            });
            return activityList;
        }

        return false;
    }
    getActivities(userId) {
        const userActivityList = this.getActivityList(userId);
        if (userActivityList) {
            return Object.keys(userActivityList).map((title, sectionKey) => {
                let headerEl = null;
                const section = userActivityList[title];

                if (section.activities.length) {
                    headerEl = <Text style={styles.sectionTitle}>{section.title}</Text>;
                }

                const activities = section.activities.map((activity, activityKey) => {
                    return (
                        <View style={styles.list} key={activityKey}>
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
                    );
                });

                return (
                    <View key={sectionKey}>
                        {headerEl}
                        {activities}
                    </View>
                );
            });
        } else {
            return (
                <View>
                    <Text style={[styles.textMuted, styles.textNotify]}>
                        No activities found
                    </Text>
                </View>
            );
        }
    }
    render() {
        const userId = this.props.navigation.state.params.userId;
        const activities = this.getActivities(userId);
        return (
            <View style={styles.bg}>
                <ScrollView>
                    {activities}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#fff'
    },
    textMuted: {
        color: '#777'
    },
    textNotify: {
        textAlign: 'center',
        marginTop: 30
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
    }
});
