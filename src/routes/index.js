import { createSwitchNavigator } from 'react-navigation';

import AppStack from './AppStack';
import AuthStack from './AuthStack';
import Splash from './../components/Splash';

const routes = Object.freeze({
  AuthStack: {
    screen: AuthStack,

    navigationOptions: {
      gesturesEnabled: false,
    },
  },

  AppStack: {
    screen: AppStack,

    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  Splash: {
    screen: Splash,
  },
});

export default createSwitchNavigator(routes, {
  headerMode:       'none',
  mode:             'modal',
  initialRouteName: 'Splash',
});
