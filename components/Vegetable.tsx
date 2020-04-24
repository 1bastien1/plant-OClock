import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {CheckBox, Card, CardItem, Body} from 'native-base';
import {Ivegetable} from '../interface/interface';
import {_storeData, mergeData} from '../js/dataAcess';
import {imageSet} from '../js/ImageRequire';
interface iProps {
  vegetable: Ivegetable;
  majVegetable: (isSub: boolean) => {};
}

interface iState {
  opened: boolean;
  checked: boolean;
}

export class Vegetable extends Component<iProps, iState> {
  constructor(props) {
    super(props);
    this.state = {opened: false, checked: false};
  }

  getEnsolleiment(s: -1 | 0 | 1) {
    if (s == 0) {
      return 'mi-ombre';
    } else if (s == -1) {
      return 'ombre';
    } else {
      return 'plein soleil';
    }
  }

  /**
   * Description : {this.props.vegetable.name}, se sème entre le
              {this.props.vegetable.dateDebSemisJour + '/' + this.props.vegetable.dateDebSemisMois}
              et le {this.props.vegetable.dateFinSemisJour + '/' + this.props.vegetable.dateFinSemisMois}
              et nécessite un ensolleiment de type : {this.getEnsolleiment(this.props.vegetable.soleil)}
   */
  render() {
    console.log('render vegetable : ', this.props.vegetable);
    let card = (
      <View>
        <Card>
          <CardItem>
            <Body>
              <Text>
                Description : {this.props.vegetable.name}, se sème entre le
                {' ' +
                  this.props.vegetable.dateDebSemisJour +
                  '/' +
                  this.props.vegetable.dateDebSemisMois +
                  ' '}
                et le{' '}
                {' ' +
                  this.props.vegetable.dateFinSemisJour +
                  '/' +
                  this.props.vegetable.dateFinSemisMois +
                  ' '}
                et nécessite un ensolleiment de type :{' '}
                {this.getEnsolleiment(this.props.vegetable.soleil)}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </View>
    );

    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => this.setState({opened: !this.state.opened})}>
            <Image
              style={styles.tinyLogo}
              source={imageSet[this.props.vegetable.name]}
            />
            <Text style={styles.text}>{this.props.vegetable.name}</Text>
          </TouchableOpacity>
          <View style={styles.checkbox}>
            <CheckBox
              checked={this.props.vegetable.isSub}
              color="green"
              onPress={() => {
                this.setState({checked: !this.state.checked});
                this.props.majVegetable(!this.state.checked);
              }}
            />
          </View>
        </View>
        {this.state.opened ? card : null}
      </View>
    );
  }
}

export default Vegetable;

const styles = StyleSheet.create({
  text: {
    color: '#5CB85C',
    margin: 5,
    fontSize: 25,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderColor: '#5CB85C',
    borderRadius: 25,
    borderWidth: 2,
  },
  logoFleche: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  container: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  infoButton: {
    flex: 3,
    flexDirection: 'row',
    marginRight: 35,
  },
  checkbox: {
    flex: 2,
  },
});
