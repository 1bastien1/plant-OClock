import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
} from 'native-base';

interface iProps {
  header: string;
  content: string;
  footer: string;
}
/**
 * @props header, content, footer : string
 */
export default class CardCustom extends Component {
  render() {
    return (
      <Card>
        <CardItem header bordered>
          <Text style={styles.text}>{this.props.header}</Text>
        </CardItem>
        <CardItem bordered>
          <Body>
            <Text>{this.props.content}</Text>
          </Body>
        </CardItem>
        <CardItem footer bordered>
          <Text style={styles.text}>{this.props.footer}</Text>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#5CB85C',
  },
});