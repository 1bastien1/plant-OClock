import * as React from 'react';
import Home from './components/Home';
import Subscriber from './components/Subscriber';
import ConfigPage from './components/ConfigPage';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//Root for toast native-base
import {Root} from 'native-base';
import PushController from './js/pushNotificationService';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <Root>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Bienvenue !">
          <Tab.Screen name="Bienvenue !" component={Home} />
          <Tab.Screen name="Abonnements" component={Subscriber} />
          <Tab.Screen name="Configuration" component={ConfigPage} />
        </Tab.Navigator>
      </NavigationContainer>
      <PushController />
    </Root>
  );
}

export default App;
