import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Input} from 'native-base';
import {_storeData, _retrieveData, removeItemApp} from '../js/dataAcess';
import {getTest} from '../js/calendarAccess';
import {removeAllCalendar} from '../js/calendarAccess';

export default class ConfigPage extends Component {
  constructor(props) {
    super(props);
    this.state = {localisation: undefined};
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          style={styles.input}
          placeholder={
            this.state.localisation == undefined
              ? 'Votre ville'
              : this.state.localisation
          }
        />
        <TouchableOpacity
          style={styles.input}
          onPress={async function () {
            await removeItemApp();
            await removeAllCalendar();
          }}>
          <Text style={styles.text}>
            Supprimer toutes les données de l'appli
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.input}
          onPress={async function () {
            await fuckUp();
          }}>
          <Text>await test</Text>
        </TouchableOpacity>
      </View>
    );
  }

  componentDidMount() {
    _retrieveData('localisation').then((localisation) => {
      this.setState({localisation: localisation});
      console.log('localisation :', this.state.localisation, localisation);
    });
  }
}

async function fuckUp() {
  let toto = await getTest();
  console.log('test function await : ', toto);
}

const styles = StyleSheet.create({
  text: {
    color: '#5CB85C',
    alignItems: 'center',
    alignContent: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 3,
    flexDirection: 'column',
    paddingTop: 0,
    paddingLeft: 25,
    padding: 50,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    marginBottom: 10,
    borderColor: '#5CB85C',
    borderRadius: 25,
    borderWidth: 2,
    alignContent: 'center',
    alignItems: 'center',
  },
});
