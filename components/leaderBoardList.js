import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';

export default class LeaderBoardList extends React.Component {
    getUserGroups() {
        let userGroups = {};
        const users = this.props.screenProps.users.sort((a, b) => {
            return b.points - a.points;
        });
        users.forEach((user, key) => {
            if (key < 3) {
                if (!('leaders' in userGroups)) {
                    userGroups.leaders = [];
                }
                userGroups.leaders.push(user);
            } else {
                if (!('others' in userGroups)) {
                    userGroups.others = [];
                }
                userGroups.others.push(user);
            }
        });
        return userGroups;
    }
    getUsers() {
        const loggedInUserId = this.props.screenProps.loggedInUserId;
        const userGroups = this.getUserGroups();
        const { navigate } = this.props.navigation;
        if (!Object.keys(userGroups).length) {
            return (
                <Text style={styles.textNotify}>
                    No users have been added yet
                </Text>
            );
        }
        return Object.keys(userGroups).map((title, key) => {
            const users = userGroups[title];
            const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);
            const groupTitle = <Text style={styles.sectionTitle}>{formattedTitle}</Text>;
            const userRows = users.map((user, position) => {
                let formattedPosition = title === 'leaders' ? position + 1 : position + 4;
                let pointsStyle = [styles.points];

                if (formattedPosition === 1) {
                    pointsStyle.push(styles.pointsGold);
                } else if (formattedPosition === 2) {
                    pointsStyle.push(styles.pointsSilver);
                } else if (formattedPosition === 3) {
                    pointsStyle.push(styles.pointsBronze);
                }

                let listRowStyle = [styles.listRow];
                if (user.userId === loggedInUserId) {
                    listRowStyle.push(styles.listRowUser);
                }

                return (
                    <TouchableOpacity
                        key={position}
                        onPress={() => navigate(
                            'ActivityFeed',
                            {
                                userId: user.userId,
                                userName: user.userName
                            })
                        }
                    >
                        <View style={listRowStyle}>
                            <Text style={styles.number}>#{formattedPosition}</Text>
                            <Image style={styles.listImage} source={require('../images/avatar.png')} />
                            <Text style={styles.listText}>
                                {user.userName}
                            </Text>
                            <View style={pointsStyle}>
                                <Text style={styles.transparent}>
                                    {user.points}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            });

            return (
                <View key={key}>
                    {groupTitle}
                    {userRows}
                </View>
            );
        });
    }
    render() {
        return (
            <View style={styles.bg}>
                <ScrollView>
                    {this.getUsers()}
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
    textWhite: {
        color: '#fff'
    },
    textMuted: {
        color: '#777'
    },
    textError: {
        color: '#f34043'
    },
    textNotify: {
        textAlign: 'center',
        marginVertical: 30
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
    listRowUser: {
        backgroundColor: '#fff7e5'
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
        borderRadius: 20,
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
        borderRadius: 19,
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
    }
});
