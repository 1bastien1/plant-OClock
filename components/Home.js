import React, {Component} from 'react';
import {Text, View, StyleSheet, ImageBackground} from 'react-native';
import CardCustom from './displayComponents/CardCustom';
import {Button, Input} from 'native-base';
import {_storeData, _retrieveData, initDB} from '../js/dataAcess';
import {saveNewCalendar, getAutorisations} from '../js/calendarAccess';
import RNLocation from 'react-native-location';

//api.openweathermap.org/data/2.5/weather?q={city name},FR&appid={your api key}
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: undefined,
      latitude: undefined,
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
    saveNewCalendar();
    getAutorisations();
    this.getWeather();
  }

  /**
 /* Example location returned
    {
      speed: -1,
      longitude: -0.1337,
      latitude: 51.50998,
      accuracy: 5,
      heading: -1,
      altitude: 0,
      altitudeAccuracy: -1
      floor: 0
      timestamp: 1446007304457.029,
      fromMockProvider: false
    }
*/
  async getLocalisation() {
    await RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
      },
    }).then((granted) => {
      if (granted) {
        this.locationSubscription = RNLocation.subscribeToLocationUpdates(
          async (locations) => {
            console.log('location : ', locations);
            await _storeData(
              'localisation',
              JSON.stringify({
                longitude: locations.longitude,
                latitude: locations.latitude,
              }),
            );
            this.setState({
              localisation: {
                longitude: locations.longitude,
                latitude: locations.latitude,
              },
            });
          },
        );
      }
    });
  }

  async getWeather() {
    await this.getLocalisation();
    fetch(
      'api.openweathermap.org/data/2.5/weather?lat=' +
        this.state.latitude +
        '&lon=' +
        this.state.longitude +
        '&appid=8bfd18a82183435001ca3f38713a00a5',
    ).then(
      (weather) => {
        console.log('weather : ', weather);
        this.setState({weather: weather});
      },
      (err) => {
        console.log(
          'error fetch weather : ',
          err,
          '//',
          'api.openweathermap.org/data/2.5/weather?lat=' +
            this.state.latitude +
            '&lon=' +
            this.state.longitude +
            '&appid=8bfd18a82183435001ca3f38713a00a5',
        );
      },
    );
    //8bfd18a82183435001ca3f38713a00a5
    //api.openweathermap.org/data/2.5/weather?lat=35&lon=139
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
