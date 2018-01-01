import {
  StackNavigator,
} from 'react-navigation';
import LeaderBoard from './components/leaderBoard';
import ActivityFeed from './components/activityFeed';

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: '#1f7fbd'
    },
    headerTitleStyle: {
        color: '#fff'
    },
    headerTintColor: '#fff'
}

export default StackNavigator({
    LeaderBoard: {
        screen: LeaderBoard,
        navigationOptions: Object.assign({
            title: 'Leaderboard',
        }, defaultNavigationOptions)
    },
    ActivityFeed: {
        screen: ActivityFeed,
        navigationOptions: defaultNavigationOptions
    },
}, {
    initialRouteName: 'LeaderBoard'
});
