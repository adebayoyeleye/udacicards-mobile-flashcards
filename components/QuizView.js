import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { connect } from "react-redux";
import {setLocalNotification, clearLocalNotification} from '../utils/helpers';


class QuizView extends Component {

    state = {
    questionNo: 0,
    total: 0,
    correctlyAnswered: 0,
    showAnswer: false,
    showScore: false,
  };
  
  resetQuiz = () => {
    this.setState(() => ({
    questionNo: 1,
    total: this.props.deck.cards.length,
    correctlyAnswered: 0,
    showAnswer: false,
    showScore: false,
 }));
  };
    
  handleShowAnswer = () => {
    this.setState((state) => ({
      showAnswer: !state.showAnswer,
    }));
  };

    handleCorrectAndNextQuestion = (correct) => {

    this.setState((state) => ({
      questionNo: state.questionNo===state.total?state.questionNo:state.questionNo+1,
    correctlyAnswered: correct?state.correctlyAnswered+1:state.correctlyAnswered,
      showAnswer: !state.showAnswer,
      showScore: state.questionNo===state.total?true:false,
    }));
  };

  componentDidMount() {
    this.resetQuiz()
  }
  render(){
    const { deck, navigation } = this.props
    const {questionNo, total, correctlyAnswered, showAnswer, showScore } = this.state
    const questionIndex = questionNo===0?questionNo:questionNo-1
    if(showScore){
      clearLocalNotification().then(setLocalNotification)
    }

  return (
    <View style={styles.container}>
    {
      showScore?
      <View style={styles.container}>
      <Text style={styles.paragraph}>
        Score
      </Text>
      <Text style={styles.paragraph}>
        Correctly answered: {correctlyAnswered} => {correctlyAnswered/total * 100}%
      </Text>
       <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'red' : 'blue',
          },
          styles.button,
          styles.paragraph,
        ]}
        onPress={this.resetQuiz}>
        <Text style={styles.buttonText}>Restart Quiz</Text>
      </Pressable>
                <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'red' : 'blue',
          },
          styles.button,
          styles.paragraph,
        ]}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back to Deck</Text>
      </Pressable>
      </View>:
      <View style={styles.container}>
      <Text style={styles.paragraph}>
        {questionNo===1? `${1} question`:`${total-questionNo} questions`} remaining
      </Text>
      <Text style={styles.paragraph}>
        Question {questionNo}: {deck.cards[questionIndex].question}
      </Text>
      {
        showAnswer?
        <View style={styles.container}>
          <Text style={styles.paragraph}>
            Answer: {deck.cards[questionIndex].answer}
          </Text>
          <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'red' : 'blue',
          },
          styles.button,
          styles.paragraph,
        ]}
        onPress={() => this.handleCorrectAndNextQuestion(true)}>
        <Text style={styles.buttonText}>Correct?</Text>
      </Pressable>
                <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'red' : 'blue',
          },
          styles.button,
          styles.paragraph,
        ]}
        onPress={() => this.handleCorrectAndNextQuestion(false)}>
        <Text style={styles.buttonText}>Incorrect?</Text>
      </Pressable>
      </View>
           :
          <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'red' : 'blue',
          },
          styles.button,
          styles.paragraph,
        ]}
        onPress={this.handleShowAnswer}>
        <Text style={styles.buttonText}>Show Answer</Text>
      </Pressable>
      }
    </View>

    }
    </View>
    
  );
  }
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

export default connect(mapStateToProps)(QuizView);