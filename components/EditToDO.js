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

export default class EditToDO extends React.Component {
//hente noget data der bliver preloadet. Når der skal ændres.
    state = {
        TaskTitel: '',
        Priority: '',
        Duration: '',

    };

    componentDidMount() {
        const id = this.props.navigation.getParam('id');
        this.getTask(id)
    }

    getTask = id =>  {
        //igen her loeades opgavens data (duration, titel, priority) ud fra det id, vi har fået med fra navigationen
        firebase
            .database()
            .ref('/Tasks/'+id )
            .once( 'value', dataObject => {
                //her hentes opgaven fra databasen
                const task = dataObject.val();
                //her deles de forskellige værdier op
                const { TaskTitel, Priority, Duration} = task;
                //her sættes staten så f.eks. opgavens titel er loadet når man går ind på siden
                this.setState({TaskTitel, Priority, Duration});
            });

    }

    handleTaskTitelChange = text => this.setState({ TaskTitel: text });

    handlePriorityChange = text => this.setState({ Priority: text });

    handleDurationChange = text => this.setState({ Duration: text });



    updateTask = () =>  {
        const {navigation} = this.props;
        //henter staten på opgavens values
        const { TaskTitel, Priority, Duration} = this.state;

        //henter id'et fra navigationen
        const id = navigation.getParam('id');

        console.log('prøve '+TaskTitel)
        try {
            //her opdateres KUN de felter, som vi har sagt må opdateres. (update > push)
            firebase.database().ref('/Tasks/'+id).update({TaskTitel, Priority,Duration});
            Alert.alert("Dine informationer er nu opdateret :)");
            navigation.goBack();
        }catch (error) {
            Alert.alert('Error: ${error.message}');
        }
    }

    render() {


        const { TaskTitel, Priority, Duration} = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.row}>
                        <Text style={styles.label}>TaskTitel:</Text>
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
                    <Button title="Edit Task" onPress={this.updateTask} />
                </ScrollView>
            </SafeAreaView>
        );
    }
}
