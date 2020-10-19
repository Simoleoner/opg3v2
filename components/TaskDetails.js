import * as React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import firebase from "firebase";
import {Alert, Platform} from "react-native-web";
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});



export default class TaskDetails extends React.Component {
    componentDidMount() {

        //her tager vi id'et fra navigation parameteret.
        //hentes fra TodDoList-> handleSelectOpgave funktionen
        const id = this.props.navigation.getParam('id');
        this.loadTask(id)
    }

    state = {
        task:null
    }

    //her indlæser vi opgaverne med ID, fra database stien
    loadTask = id =>  {
        //firebase connection.
        firebase.database().ref('/Tasks/'+id ).on( 'value', task_retrived => {
            //her sætter vi så staten på opgaven og dens info(duration, priority) med hvad vi har hentet fra databasen
            this.setState({task: task_retrived.val()});
            console.log(task_retrived.val())
        });
    }

    handleEdit = () => {
        //her navigeres til videre til edit task viewet, hvor idet sendes med videre
        const id = this.props.navigation.getParam('id');
        this.props.navigation.navigate('EditToDo', { id } );
    };

    confirmDelete = () => {
        if (Platform.OS === 'ios'|| Platform.OS === 'android') {
            Alert.alert('er du sikker på du vil slette bilen?', [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Slet', style: 'destructive', onPress: this.handleDelete()}
            ]);
        }else {
            if (confirm('Er du sikker?')) {
                this.handleDelete()
            }
        }
    };

    handleDelete = () => {
        const { navigation }= this.props;
        const id = navigation.getParam('id');
        try {
            //her sættes id'et på den bestemte opgave, der skal slettes, ind i stien. I remove fjernes den så.
            firebase.database().ref('/Tasks/' + id).remove();
            //og bliver nagiveret tilbage.
            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }


    }


    render() {
        const {task} = this.state;
        if(!task){
            return (
                <Text>Ingen biler</Text>
            )
        } else {

            return (
                <View style={styles.container}>

                    <Button title="Edit" onPress={this.handleEdit}/>
                    <Button title="Delete" onPress={this.confirmDelete}/>

                    <View style={styles.row}>
                        <Text style={styles.label}>Task Titel</Text>
                        <Text style={styles.value}>{task.TaskTitel}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Priority</Text>
                        <Text style={styles.value}>{task.Priority}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Duration</Text>
                        <Text style={styles.value}>{task.Duration}</Text>
                    </View>


                </View>
            );
        }
    }
}
