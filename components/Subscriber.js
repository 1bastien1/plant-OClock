import React, {Component} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, Text} from 'react-native';
import {Toast} from 'native-base';
import Vegetable from './Vegetable';
import {_retrieveData, _storeData} from '../js/dataAcess';
import {
  createEventVegetable,
  removeAllEventCurrentCalendar,
} from '../js/calendarAccess';

export default class Subscriber extends Component {
  getAllVegetables() {
    _retrieveData('vegetables').then(
      (vegetables) => {
        this.setState({vegetables: vegetables});
      },
      (reason) => {
        this.showToastError();
        console.warn('error retreive all vegetable : ', reason);
      },
    );
  }

  /**
   *
   * @param {*} isSub
   * @param {*} name
   * prend le légume à modifier (tab à 1 seul elt), modifie l'attr isSub du légume, et remplace l'ancien légume par le nouveau
   * à optimiser
   */
  async setIsSubVegetable(isSub, name) {
    let vegetableToModify;
    let otherVegetables = [];
    this.state.vegetables.forEach((v) => {
      if (name == v.name) {
        vegetableToModify = v;
      } else {
        otherVegetables.push(v);
      }
      //need break
    });
    vegetableToModify.isSub = isSub;
    //maj state
    this.setState((prevState) => ({
      vegetables: [...otherVegetables, vegetableToModify],
    }));
  }

  /**
   * update asyncStorage from the state and create all event
   */
  async majStoreddata() {
    await _storeData('vegetables', JSON.stringify(this.state.vegetables)); //_retrieveData is used to verify if data are correctly stored
    this.createAllEvent(); //ok all event are created than expected (so data are correctly store)
    this.showToastSuccess();
  }

  showToastSuccess() {
    Toast.show({
      text: 'Mise à jour des abonnements effectuée !',
      buttonText: 'Ok',
      type: 'success',
      duration: 2000,
    });
  }

  showToastError() {
    Toast.show({
      text: 'Erreur dans la récupération des légumes',
      buttonText: 'Ok',
      type: 'Danger',
      duration: 2000,
    });
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

  componentDidMount() {
    this.getAllVegetables();
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
