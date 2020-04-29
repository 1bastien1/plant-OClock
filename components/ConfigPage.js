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
        <View style={styles.firstView}>
          <Text>Page de configuration</Text>
        </View>
        <View style={styles.inputView}>
          <Text>Votre position : </Text>
          <Input
            placeholder={
              this.state.localisation == undefined
                ? 'Votre ville'
                : this.state.localisation
            }
          />
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={async function () {
              await removeItemApp();
              await removeAllCalendar();
            }}>
            <Text style={styles.text}>
              Supprimer toutes les données de l'appli
            </Text>
          </TouchableOpacity>
        </View>
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
    display: 'flex',
    flex: 5,
    flexDirection: 'column',
  },
  inputView: {
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
  buttonView: {
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    marginBottom: 10,
    borderColor: '#5CB85C',
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: 'center',
  },
  firstView: {
    flex: 3,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    marginBottom: 10,
    borderColor: '#5CB85C',
    borderRadius: 25,
    borderBottomWidth: 2,
    alignItems: 'center',
  },
});
