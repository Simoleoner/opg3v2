import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    flex: 1,
    borderWidth: 1,
    margin: 5,
    padding: 5,
    height: 50,
    justifyContent:'center'
  },
  label: { fontWeight: 'bold' },
});

export default class TaskDetails extends React.Component {
  handlePress = () => {
    const {id, onSelect} = this.props
    onSelect(id)
  };

  render() {
    const { task } = this.props;
    return (
        <TouchableOpacity style={styles.container} onPress={this.handlePress}>
          <Text style={styles.label}>
            {task.TaskTitel}
          </Text>
        </TouchableOpacity>
    );
  }
}
