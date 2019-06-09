import { createStackNavigator } from 'react-navigation';

// screens
import Login from './Login';
import Register from './Register';

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
  },
  Register: {
    screen: Register,
  },
}, {
  headerMode: 'none',
});

export default AuthStack;
