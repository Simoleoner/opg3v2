import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

import ToDoTask from './ToDoTask';

export default class ToDoList extends React.Component {
  state = {
    tasks: {},
  };

  componentDidMount() {
    firebase
        .database()
        .ref('/Tasks')
        .on('value', snapshot => {
          this.setState({ tasks: snapshot.val() });
        });
  }

  handleSelectOpgave = id => {
    console.log("IDDD",id)
    this.props.navigation.navigate('TaskDetails', { id } );
  };

  render() {
    const { tasks } = this.state;

    //hvis der ikke er nogen opgaver, vises der intet
      //sikre at det ikke crasher
    if (!tasks) {
      return null
    }
    //Her tages vores values fra opgave objekterne og lægger dem i som array til listen.
    const taskArray = Object.values(tasks);

    //id
    const taskKeys = Object.keys(tasks);
    return (
        <View>
          <FlatList
              data={taskArray}
              //her bruges der taskKeys til at finde til at finde id på opgaven, hvor det returneres som key.
              keyExtractor={(item, index) => taskKeys[index]}
              renderItem={({ item, index }) => (
                  <ToDoTask
                      task={item}
                      id={taskKeys[index]}
                      //her til handleselect funktione.
                      onSelect={this.handleSelectOpgave}
                  />
              )}
          />
        </View>
    );
  }
}
