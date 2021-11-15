import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, TextInput } from 'react-native';
import { connect } from "react-redux";
import { addCard } from "../actions";

class NewCard extends Component {
  state = {
    question: "",
    answer: "",
    toDeck: false,
  };
  handleChange = (e, option) => {
    this.setState(() => ({
      [option]: e,
    }));
  };
  handleSubmit = (e, id) => {
    e.preventDefault();
    const { question, answer } = this.state;
    const { dispatch } = this.props;
    const card = [ { question, answer } ]

    dispatch(addCard({ id, card }));

    this.setState(() => ({
      question: "",
      answer: "",
      toDeck: true,
    }));
  };
  render() {
    const { question, answer, toDeck } = this.state;
    const { navigation, route } = this.props;

    if (toDeck === true) {
      navigation.goBack();
    }

    return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner, styles.paragraph}>
          <Text style={styles.header, styles.paragraph}>Add New Card</Text>
          <TextInput placeholder="Question" style={styles.textInput, styles.paragraph} value={question}
            onChangeText={(e) => this.handleChange(e, "question")}/>
          <TextInput placeholder="Answer" style={styles.textInput, styles.paragraph} value={answer}
            onChangeText={(e) => this.handleChange(e, "answer")}/>
          <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'red' : 'blue',
          },
          styles.button,
          styles.paragraph,
        ]}
        onPress={(e)=>{this.handleSubmit(e, route.params.deckId)}}
        disabled={question === "" || answer === ""}>
        <Text style={styles.buttonText}>Add New Card</Text>
      </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
  }
}

export default connect()(NewCard);


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

