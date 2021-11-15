import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { connect } from "react-redux";
import { handleInitialData } from '../actions';
import DeckView from './DeckView';
import {setLocalNotification} from '../utils/helpers';


function DeckListItem(props) {
  const { deck, navigation} = props
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('DeckView', { deckId: deck.id })}>
        <Text style={styles.paragraph}>
          {deck.topic}
        </Text>
        <Text style={styles.paragraph}>
          {deck.cards.length} cards
        </Text>
      </Pressable>
    </View>
  );
}

class DeckListView extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
    setLocalNotification()
  }

    render() {
  return (
    <ScrollView>
    <View style={styles.container}>
      {this.props.deckIds.map((deckId) => (
              <DeckListItem key={deckId} deck={this.props.decks[deckId]} navigation={this.props.navigation} />
          ))}
    </View>
    </ScrollView>
  );}
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


function mapStateToProps(decks) {
  return {
    deckIds: Object.keys(decks),
    decks,
  };
}

export default connect(mapStateToProps)(DeckListView);