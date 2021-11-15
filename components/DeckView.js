import * as React from 'react';
import { Text, View, StyleSheet, Pressable, Alert } from 'react-native';
import { connect } from "react-redux";


function DeckView(props) {
    const { deck, navigation } = props
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        {deck.topic}
      </Text>
      <Text style={styles.paragraph}>
        {deck.cards.length} cards
      </Text>
      {
        deck.cards.length===0?
              <Text style={styles.paragraph}>
        You dont have any cards in this deck. Add cards to enable quiz feature
      </Text>:
<Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'red' : 'blue',
          },
          styles.button,
          styles.paragraph,
        ]}
        onPress={() => navigation.navigate('QuizView', { deckId: deck.id })}>
        <Text style={styles.buttonText}>Start Quiz</Text>
      </Pressable>
      }
      
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'red' : 'blue',
          },
          styles.button,
          styles.paragraph,
        ]}
        onPress={() => navigation.navigate('NewCard', { deckId: deck.id })}>
        <Text style={styles.buttonText}>Add New Card</Text>
      </Pressable>
    </View>
  );
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
    button: {
    borderRadius: 8,
    padding: 6,
    height: 50,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },

});

function mapStateToProps(decks, {route}) {
  return {
    deck: decks[route.params.deckId]
  };
}

export default connect(mapStateToProps)(DeckView);