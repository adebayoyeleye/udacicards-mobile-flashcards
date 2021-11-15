import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, TextInput } from 'react-native';
import { connect } from "react-redux";
import { addDeck } from "../actions";
import { generateUID } from '../utils/_DATA';


class NewDeckForm extends Component {
  state = {
    topic: "",
    toDeck: null,
  };
  handleChange = (e) => {
    this.setState(() => ({
      topic: e,
    }));
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { topic } = this.state;
    const { dispatch } = this.props;
    const deck = {
    id: generateUID(),
    topic,
    cards: [],
    createdAt: Date.now(),
  }

    dispatch(addDeck(deck));

    this.setState(() => ({
      topic: "",
      toDeck: deck.id,
    }));
  };
  render() {
    const { question, answer, toDeck } = this.state;
    const { navigation, route } = this.props;

    if (toDeck) {
      navigation.navigate('DeckView', { deckId: toDeck });
    }

    return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner, styles.paragraph}>
          <Text style={styles.header, styles.paragraph}>New Deck</Text>
          <TextInput placeholder="Topic" style={styles.textInput, styles.paragraph} value={question}
            onChangeText={this.handleChange}/>
          <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'red' : 'blue',
          },
          styles.button,
          styles.paragraph,
        ]}
        onPress={this.handleSubmit}
        disabled={question === "" || answer === ""}>
        <Text style={styles.buttonText}>Create Deck</Text>
      </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
  }
}

export default connect()(NewDeckForm);


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
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
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

