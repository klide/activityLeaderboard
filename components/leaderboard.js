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
import AddActivityModal from './addActivityModal';

export default class LeaderBoard extends React.Component {
    state = {
        loggedInUserId: 5,
        users: [{
            userId: 1,
            userName: 'Kunfu Panda',
            points: 83
        }, {
            userId: 2,
            userName: 'Crouching Tiger',
            points: 72
        }, {
            userId: 3,
            userName: 'Hidden Dragon',
            points: 70
        }, {
            userId: 4,
            userName: 'Flying Crane',
            points: 67
        }, {
            userId: 5,
            userName: 'Praying Mantis',
            points: 63
        }, {
            userId: 6,
            userName: 'Drunken Master',
            points: 36
        }, {
            userId: 7,
            userName: 'Morning Glory',
            points: 45
        }, {
            userId: 8,
            userName: 'Leaping Monkey',
            points: 60
        }, {
            userId: 9,
            userName: 'Big Bird',
            points: 58
        }]
    }
    updatePoints(addedPoints) {
        const updatedUsers = this.state.users.map((user) => {
            if (user.userId === this.state.loggedInUserId) {
                user.points += addedPoints;
            }
            return user;
        });
        this.setState({
            users: updatedUsers
        });
    }
    getUserGroups() {
        let userGroups = {
            leaders: [],
            others: []
        };
        const users = this.state.users.sort((a, b) => {
            return b.points - a.points;
        });
        users.forEach((user, key) => {
            if (key < 3) {
                userGroups.leaders.push(user);
            } else {
                userGroups.others.push(user);
            }
        });
        return userGroups;
    }
    getUsers() {
        const userGroups = this.getUserGroups();
        const { navigate } = this.props.navigation;
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
                if (user.userId === this.state.loggedInUserId) {
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
                            <View style={styles.listImage}></View>
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
                <StatusBar barStyle='light-content' />
                <ScrollView>
                    {this.getUsers()}
                </ScrollView>
                <AddActivityModal
                    updatePoints={(addedPoints) => {this.updatePoints(addedPoints)}}
                />
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
    }
});
