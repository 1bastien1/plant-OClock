import React, {Component} from 'react';
import {Text, View, StyleSheet, ImageBackground} from 'react-native';
import CardCustom from './displayComponents/CardCustom';
import {Button, Toast} from 'native-base';
import {_storeData, _retrieveData, initDB} from '../js/dataAcess';
import {saveNewCalendar, getAutorisations} from '../js/calendarAccess';
import RNLocation from 'react-native-location';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localisation: {latitude: undefined, longitude: undefined},
      weather: undefined,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/seedTest.jpg')}
          style={styles.backgroundImage}>
          <View style={styles.content}>
            <View style={styles.card}>
              <CardCustom
                header="Bienvenue sur PlantO'Clock"
                content="Bienvenue sur l'application PlantO'Clock vous pouvez vous abonnez à des légumes afin d'être averti de la saison des semis et si le temps le permet ! "
                footer="@Bastien Janon"
              />
            </View>
            <View style={styles.content}>
              <Button
                rounded
                success
                style={styles.button}
                onPress={() => this.props.navigation.navigate('Abonnements')}>
                <Text style={styles.textButton}>S'abonner ! </Text>
              </Button>
            </View>
            <View />
          </View>
        </ImageBackground>
      </View>
    );
  }
  componentDidMount() {
    initDB();
    //removeItemApp();
    getAutorisations().then((auto) => {
      if (auto != 'authorized') {
        this.showToastError();
      } else {
        saveNewCalendar();
      }
    });
  }

  showToastError() {
    Toast.show({
      text: "Erreur certaines autorisations n'ont pas été acceptée",
      buttonText: 'Ok',
      type: 'Danger',
      duration: 2000,
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: 'white',
    flexDirection: 'column',
    flexBasis: '100%',
  },
  textButton: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  button: {
    flex: 2,
    marginTop: 35,
    marginBottom: 15,
    marginLeft: 25,
    marginRight: 25,
  },
  card: {
    flex: 2,
    marginTop: 35,
    marginLeft: 10,
    marginRight: 10,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 0.5,
    backgroundColor: 'white',
    marginLeft: 25,
    marginRight: 25,
    borderColor: '#5CB85C',
    borderRadius: 25,
    borderWidth: 2,
  },
});
