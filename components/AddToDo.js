import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import firebase from 'firebase';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  row: {
    flexDirection: 'row',
    height: 30,
    margin: 10,
  },
  label: { fontWeight: 'bold', width: 100 },
  input: { borderWidth: 1, flex: 1 },
});

export default class AddToDo extends React.Component {
  state = {
    TaskTitel: '',
    Priority: '',
    Duration: '',

  };

  handleTaskTitelChange = text => this.setState({ TaskTitel: text });

  handlePriorityChange = text => this.setState({ Priority: text });

  handleDurationChange = text => this.setState({ Duration: text });


  handleSave = () => {
    const { TaskTitel, Priority, Duration } = this.state;
    try {
      const reference = firebase
          .database()
          .ref('/Tasks/')
          .push({ TaskTitel, Priority, Duration});
      Alert.alert(`Saved`);
      this.setState({
        TaskTitel: '',
        Priority: '',
        Duration: '',
      });
    } catch (error) {
      Alert.alert(`Error: ${error.message}`);
    }
  };

  render() {
    const { TaskTitel, Priority, Duration} = this.state;
    return (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.row}>
              <Text style={styles.label}>Task Titel</Text>
              <TextInput
                  value={TaskTitel}
                  onChangeText={this.handleTaskTitelChange}
                  style={styles.input}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Priority</Text>
              <TextInput
                  value={Priority}
                  onChangeText={this.handlePriorityChange}
                  style={styles.input}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Duration</Text>
              <TextInput
                  value={Duration}
                  onChangeText={this.handleDurationChange}
                  style={styles.input}
              />
            </View>
            <Button title="Add Task" onPress={this.handleSave} />
          </ScrollView>
        </SafeAreaView>
    );
  }
}
