import React, {Component} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, Text} from 'react-native';
import {Button} from 'native-base';
import Vegetable from './Vegetable';
import {getAllKeys, _retrieveData, _storeData} from '../js/dataAcess';
import {LocalNotification} from '../js/pushNotificationService';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import RNLocation from 'react-native-location';
import {
  createEventVegetable,
  removeAllEventCurrentCalendar,
} from '../js/calendarAccess';

export default class Subscriber extends Component {
  getAllVegetables() {
    _retrieveData('vegetables').then(
      (vegetables) => {
        this.setState({vegetables: vegetables});
        console.log(
          'retrieve all vegetables from storage mount subscriber : ',
          vegetables,
        );
      },
      (reason) => console.warn('error retreive all vegetable : ', reason),
    );
  }

  /**
   *
   * @param {*} isSub
   * @param {*} name
   * prend le légume à modifier (tab à 1 seul elt), modifie l'attr isSub, prend les autres légumes et concat les deux tableau
   * à optimiser
   */
  async setIsSubVegetable(isSub, name) {
    console.log('set isSub vegetable : ', isSub, name); //ok
    console.log('vegetables state before: ', this.state.vegetables);
    let vegetableToModify;
    this.state.vegetables.forEach((v) => {
      if (name == v.name) {
        vegetableToModify = v;
      }
      //need break
    });
    vegetableToModify.isSub = isSub;
    console.log('mon legume choisi : ', vegetableToModify); //ok
    //maj state
    this.setState((prevState) => ({
      vegetables: [...this.state.vegetables, vegetableToModify],
    }));
    console.log('vegetables state after update: ', this.state.vegetables);
  }

  /**
   * update asyncStorage from the state and create all event
   */
  async majStoreddata() {
    console.log(
      'will store async vegetables updated : ',
      this.state.vegetables,
    ); // store is correctly updated
    await _storeData('vegetables', JSON.stringify(this.state.vegetables)); //_retrieveData is used to verify if data are correctly stored
    _retrieveData('vegetables').then((vegetables) => {
      console.log('vegetables after storage my boy : ', vegetables);
    }); //ok data are same than expected
    this.createAllEvent(); //ok all event are created than expected (so data are correctly store)
  }

  async createAllEvent() {
    //supp tous les events
    await removeAllEventCurrentCalendar();
    this.state.vegetables.forEach((v) => {
      if (v.isSub) {
        createEventVegetable(
          'semis des ' + v.name,
          {
            jour: v.dateDebSemisJour,
            mois: v.dateDebSemisMois,
          },
          {
            jour: v.dateFinSemisJour,
            mois: v.dateFinSemisMois,
          },
          'le moment est venu de commencer les semis de ' + v.name,
          'la saison des semis de ' +
            v.name +
            ' est bientôt terminée, dépechez-vous de semer ! ',
        );
      }
    });
  }

  getLocalisation() {
    check(PERMISSIONS.ACCESS_FINE_LOCATION)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            RNLocation.getLatestLocation((info) => info);
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        console.log('error getLocalisation : ', error);
      });
  }

  componentDidMount() {
    this.getAllVegetables();
    //console.log('localisation : ', this.getLocalisation());
  }

  /**
   *
   * @param {*} props
   * state is used to avoid empty data with async function : here we need async function to get all keys and second async function to get all vegetables (first promise )
   */
  constructor(props) {
    super(props);
    this.state = {keys: [], vegetables: []};
  }

  render() {
    console.log('render sub : ', this.state.vegetables);
    return (
      <ScrollView style={styles.container}>
        {this.state.vegetables.map((v) => (
          <Vegetable
            key={v.name}
            vegetable={v}
            majVegetable={(isSub) => this.setIsSubVegetable(isSub, v.name)}
          />
        ))}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.majStoreddata();
          }}>
          <Text style={styles.text}>Mettre à jour les abonnements</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#5CB85C',
    margin: 10,
    alignItems: 'center',
    alignContent: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 0,
    paddingLeft: 25,
  },
  button: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: '#5CB85C',
    borderRadius: 25,
    borderWidth: 2,
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 20,
    marginTop: 25,
    marginRight: 25,
  },
});
