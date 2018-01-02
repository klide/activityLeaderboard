import React from 'react';
import {
    StyleSheet,
    Image
} from 'react-native';
import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';
import LeaderBoard from './components/leaderBoard';
import Challenges from './components/challenges';

export default TabNavigator({
    LeaderBoard: {
        screen: LeaderBoard,
        navigationOptions: {
            tabBarLabel: 'Leaderboard',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('./images/icon-leaderboard.png')}
                    style={styles.icon}
                />
            )
        }
    },
    Challenges: {
        screen: Challenges,
        navigationOptions: {
            tabBarLabel: 'Challenges',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('./images/icon-challenges.png')}
                    style={styles.icon}
                />
            ),
        }
    },
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#e91e63',
    }
});

const styles = StyleSheet.create({
    icon: {
        height: 35,
        width: 35
    }
});
