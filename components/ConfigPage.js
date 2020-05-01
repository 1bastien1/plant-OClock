import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Spinner, Toast} from 'native-base';
import {_storeData, _retrieveData, removeItemApp} from '../js/dataAcess';
import {removeAllCalendar} from '../js/calendarAccess';
import RNLocation from 'react-native-location';
export default class ConfigPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localisation: {latitude: undefined, longitude: undefined},
      weather: undefined,
      waiting: true,
    };
  }

  render() {
    var infos;
    var wait;
    if (this.state.weather != undefined) {
      let w = this.state.weather;
      infos = (
        <View>
          <Text>
            temp min/max/actuelle: {w.main.temp_min - 273.15}°C,
            {w.main.temp_max - 273.15}°C ,{w.main.temp - 273.15}°C
          </Text>
          <Text>Pression: {w.main.pressure} Hpa</Text>
          <Text>Humidité: {w.main.humidity}%</Text>
          <Text>Ressenti: {w.main.feels_like - 273.15}°C</Text>
          <Text>
            Vent: {w.wind.speed * 1.60934}Km/h Dir: {w.wind.deg}°
          </Text>
          <Text>Couverture nuageuse: {w.clouds.all}%</Text>
          <Text>Description météo: {w.weather[0].description}</Text>
        </View>
      );
    }
    if (this.state.waiting) {
      wait = (
        <View>
          <Spinner color="green" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.firstView}>
          <Text>Page de configuration</Text>
          {infos}
          {wait}
        </View>
        <View style={styles.inputView}>
          <Text>Votre position : </Text>
          <Text>
            {this.state.localisation == undefined
              ? 'Votre latitude'
              : 'Latitude: ' + this.state.localisation.latitude}
          </Text>
          <Text>
            {this.state.localisation == undefined
              ? 'Votre longitude'
              : 'Longitude: ' + this.state.localisation.longitude}
          </Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={async function () {
              await removeItemApp();
              await removeAllCalendar();
            }}>
            <Text style={styles.text}>
              Supprimer toutes les données de l'application
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  componentDidMount() {
    _retrieveData('localisation').then((localisation) => {
      this.setState({localisation: localisation});
    });
    this.getLocalisationAndWeather();
  }

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
  /**
   * setState the localisation {lat, long} and save it in asyncStorage (key: localisation) only if not already defined in component state
   */
  async getLocalisationAndWeather() {
    if (this.state.localisation != undefined) {
      await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
        },
      })
        .then((response) => {
          return JSON.parse(response);
        })
        .then((granted) => {
          if (granted) {
            this.locationSubscription = RNLocation.subscribeToLocationUpdates(
              (locations) => {
                console.log('location config page : ', locations[0].longitude);
                _storeData(
                  'localisation',
                  JSON.stringify({
                    longitude: locations[0].longitude,
                    latitude: locations[0].latitude,
                  }),
                );
                this.setState({
                  localisation: {
                    longitude: locations[0].longitude,
                    latitude: locations[0].latitude,
                  },
                });
                this.getWeather(locations[0].latitude, locations[0].longitude);
              },
            );
          } else {
            this.showToastErrorLocalisation();
          }
        });
    }
  }

  /**
   * setState the weather
   */
  getWeather(lat, long) {
    let tryUrl =
      'http://api.openweathermap.org/data/2.5/weather?lat=' +
      lat +
      '&lon=' +
      long +
      '&appid=8bfd18a82183435001ca3f38713a00a5';
    fetch(tryUrl)
      .then((json) => json.json())
      .then(
        (weather) => {
          console.log('weather : ', weather);
          this.setState({weather: weather, waiting: false});
          _storeData('weather', JSON.stringify(weather));
        },
        (err) => {
          this.showToastErrorWeather();
          this.showToastErrorPerso(err);
        },
      );
    //api key 8bfd18a82183435001ca3f38713a00a5
    //api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=8bfd18a82183435001ca3f38713a00a5
  }

  showToastErrorWeather() {
    Toast.show({
      text: "Les données météo n'ont pas pu être récupérées",
      buttonText: 'Ok',
      type: 'Danger',
      duration: 2000,
    });
  }

  showToastErrorLocalisation() {
    Toast.show({
      text: "Les données de localisation n'ont pas pu être récupérées",
      buttonText: 'Ok',
      type: 'Danger',
      duration: 2000,
    });
  }

  showToastErrorPerso(text) {
    Toast.show({
      text: text,
      buttonText: 'Ok',
      type: 'Danger',
      duration: 2000,
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
    justifyContent: 'center',
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
