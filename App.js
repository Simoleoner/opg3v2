import * as React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import firebase from 'firebase';
import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';
import TaskDetails from './components/TaskDetails';
import EditToDO from './components/EditToDO';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


const StackNavigator = createStackNavigator(
    {
      ToDoList: { screen: ToDoList },
      TaskDetails: { screen: TaskDetails },
      EditToDo: {screen: EditToDO},
    },
    { initialRouteKey: 'ToDoList' }
);

const TabNavigator = createBottomTabNavigator({
      ToDoList: {
        screen:StackNavigator,
        navigationOptions: {
          tabBarLabel:"To-Do List",
          tabBarIcon: ({ tintColor }) => (
              <FontAwesome5 name="tasks" size={24} color="black" />
          )
        },
      },
      AddTask: {
        screen:AddToDo,
        navigationOptions: {
          tabBarLabel:"Add To-Do task",
          tabBarIcon: ({ tintColor }) => (
              <Entypo name="add-to-list" size={24} color="black" />
          )
        },
        EditToDo: {
          screen:EditToDO,
          navigationOptions: {
            tabBarLabel:"Edit Task",
            tabBarIcon: ({ tintColor }) => (
                <AntDesign name="pluscircleo" size={24} color={tintColor} />
            )
          },
        },} , },


    {
      tabBarOptions: {
        showIcon:true,
        labelStyle: {
          fontSize: 15,
        },
        activeTintColor: 'darkblue',
        inactiveTintColor: 'gray',
        size:40
      }
    });
const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {
  componentWillMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyCsZ5HEoYW-O-xKiecdEBO0m9ivYt6LeBw",
      authDomain: "opg3v2.firebaseapp.com",
      databaseURL: "https://opg3v2.firebaseio.com",
      projectId: "opg3v2",
      storageBucket: "opg3v2.appspot.com",
      messagingSenderId: "565643001084",
      appId: "1:565643001084:web:b633afa3bde1614a232b79"
    };

    // Her sikrer vi os at der ikke allerede er initialiseret instans af firebase.

    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
  }
  render() {
    return <AppContainer />;
  }
}
