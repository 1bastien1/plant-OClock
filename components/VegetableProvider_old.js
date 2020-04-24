import React, {createContext, Component} from 'react';
import {Text, View} from 'react-native';

export const VegetablesContext = createContext({
  vegetables: [],
  addVegetable: () => {},
  initVegetablesArray: () => {},
});

export default class VegetableProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vegetables: [],
      addVegetable: (v) => this.setState((state) => state.vegetables.push(v)),
      initVegetablesArray: (vArray) => this.setState({vegetables: vArray}),
    };
  }

  render() {
    return (
      <VegetablesContext.Provider value={this.state}>
        {this.props.children}
      </VegetablesContext.Provider>
    );
  }
}
