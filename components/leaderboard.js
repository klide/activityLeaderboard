import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Image
} from 'react-native';
import {
  StackNavigator,
  NavigationActions
} from 'react-navigation';
import AddActivityModal from './addActivityModal';
import LeaderBoardList from './leaderBoardList';
import ActivityFeed from './activityFeed';

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: '#1f7fbd'
    },
    headerTitleStyle: {
        color: '#fff'
    },
    headerTintColor: '#fff'
}

const LeaderBoardPages = StackNavigator({
    LeaderBoardList: {
        screen: LeaderBoardList,
        navigationOptions: Object.assign({
            title: 'Leaderboard'
        }, defaultNavigationOptions)
    },
    ActivityFeed: {
        screen: ActivityFeed,
        navigationOptions: defaultNavigationOptions
    },
}, {
    initialRouteName: 'LeaderBoardList'
});

export default class LeaderBoard extends React.Component {
    state = {
        loggedInUserId: 5,
        users: [{
            userId: 1,
            userName: 'Kungfu Panda',
            photo: '../images/avatar_default.png',
            points: 83
        }, {
            userId: 2,
            userName: 'Crouching Tiger',
            photo: '../images/avatar_default.png',
            points: 72
        }, {
            userId: 3,
            userName: 'Hidden Dragon',
            photo: '../images/avatar_default.png',
            points: 70
        }, {
            userId: 4,
            userName: 'Flying Crane',
            photo: '../images/avatar_default.png',
            points: 0
        }, {
            userId: 5,
            userName: 'Praying Mantis',
            photo: '../images/avatar_default.png',
            points: 50
        }, {
            userId: 6,
            userName: 'Drunken Master',
            photo: '../images/avatar_default.png',
            points: 0
        }, {
            userId: 7,
            userName: 'Morning Glory',
            photo: '../images/avatar_default.png',
            points: 0
        }, {
            userId: 8,
            userName: 'Leaping Monkey',
            photo: '../images/avatar_default.png',
            points: 0
        }, {
            userId: 9,
            userName: 'Big Bird',
            photo: '../images/avatar_default.png',
            points: 0
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
    render() {
        const resetAction = NavigationActions.navigate({
            routeName: 'LeaderBoard',
            action: NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'LeaderBoardList'})
                ]
            })
        });
        this.props.navigation.dispatch(resetAction)
        return (
            <View style={styles.bg}>
                <StatusBar barStyle='light-content' />
                <LeaderBoardPages
                    screenProps={{
                        users: this.state.users,
                        loggedInUserId: this.state.loggedInUserId
                    }}
                />
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
    textMuted: {
        color: '#777'
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
