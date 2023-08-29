import React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
};

type MainStackParamList = {
  Initial: undefined;
  FormSheetStack: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Detail Screen"
        onPress={() => navigation.navigate('Detail', {showHeaderRight: true})}
      />
      <Button
        title="Go to Detail Screen Without headerRight"
        onPress={() => navigation.navigate('Detail', {showHeaderRight: false})}
      />
    </View>
  );
};

const DetailScreen: React.FC<{navigation: any}> = (props) => {
  React.useEffect(() => {
    if (props.route.params.showHeaderRight) {
      props.navigation.setOptions({
        headerRight: () => (
          <Button title="Right" onPress={() => alert('Clicked!')} />
        ),
      });
    }
  }, [props.navigation, props.route.params.showHeaderRight]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Detail Screen</Text>
    </View>
  );
};

const FormSheetStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerTitle: () => <Text>Home</Text>}}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{headerTitle: () => <Text>Detail</Text>}}
      />
    </Stack.Navigator>
  );
};

const InitialScreen: React.FC<{navigation: any}> = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Initial Screen</Text>
      <Button
        title="Open FormSheet Stack"
        onPress={() => navigation.navigate('FormSheetStack')}
      />
    </View>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Initial">
        <MainStack.Screen
          name="Initial"
          component={InitialScreen}
          options={{headerTitle: 'Initial Screen'}}
        />
        <MainStack.Screen
          name="FormSheetStack"
          component={FormSheetStack}
          options={{presentation: 'formSheet', headerShown: false}}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
