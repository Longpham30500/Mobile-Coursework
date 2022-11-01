import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import Detail from './screens/detail';
import Home from "./screens/home";
import EditDetail from "./screens/editDetail";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'My home' }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{ title: 'All Trips' }}
        />
        <Stack.Screen name="EditDetail" 
        component={EditDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
