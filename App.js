import {
  StackNavigator,
} from 'react-navigation';
import LeaderBoard from './components/leaderboard';
import ActivityFeed from './components/activityfeed';

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: '#1f7fbd'
    },
    headerTitleStyle: {
        color: '#fff'
    }
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
      navigationOptions: Object.assign({
          title: 'Activity Feed',
      }, defaultNavigationOptions)
  },
}, {
    initialRouteName: 'LeaderBoard'
});
