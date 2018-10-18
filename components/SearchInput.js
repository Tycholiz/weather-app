/*
We can think of SearchInput as a component that provides presentational markup and does not
manage any real application data. Such components accept props from parent components which
specify the data a presentational component should render. This parent container component also
specifies behavior. If the lower level presentational component has any interactivity — like our
search input — it calls a prop-function given to it by the parent.
*/

import React from 'react';
import { 
  StyleSheet, 
  TextInput, 
  View 
} from 'react-native';

export default class SearchInput extends React.Component {
  constructor(props) { //we use constructor method to initialize our component-specific data (state). b/c of its location at the top, this method will fire before the component is mounted and rendered. here, we are defining our state object to only contain a text property
    super(props); //super() is required in derived classes (those that extend React.Component) in order to reference this within the constructor.
    this.state = {
      text: '', //we add local component state to control data being entered in input field. it's good practice to initialize components with empty state
    };
  }

  handleChangeText = text => { //this function will pass the city name typed in to the parent. because it is onChangeText, it will get executed with each keystroke
    this.setState({ text }) //note, this is object shorthand for ({text: text}). setState triggers the component to re-render
  }
  
  handleSubmitEditing = () => { // this is to notify our parent App component when the user submits a new searched value. this is the only time that data gets passed up to the parent, b/c we only need to pass the data when the user has finished typing and has pressed enter.
    const { onSubmit } = this.props;
    const { text } = this.state;

    if (!text) return; //if textfield is empty, do nothing
    onSubmit(text); //this.props.onSubmit
    this.setState({ text: '' }) //clear the text property in state
  }

  render() {
    const { placeholder } = this.props; //OBJECT DESTRUCTURING
    const { text } = this.state

    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          value={text} // this prop is responsible for the content showed in the input field. With this, we now know whatever is displayed in input field will always represent our local state.
          placeholder={placeholder} //this component accept a placeholder prop. we can write text instead of this.state.text because of object destructuring
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          style={styles.textInput}
          clearButtonMode="always" //(iOS) displays a button on right end of text field to delete all text 
          onChangeText={this.handleChangeText} // as text changes, the fn handleChangeText gets run. the text automatically gets passed as the arg. We need to “listen” to this specific event in our child component ( TextInput ) so that it can notify our parent component ( SearchInput ) to respond to this event. To do this, we pass in a function that calls another function, or in other words, a callback. note: if the function was not declared with arrow syntax, we would have to bind because the function handleChangeText has a different local scope than the component instance.
          onSubmitEditing={this.handleSubmitEditing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: '#666',
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: 'white',
    backgroundColor: '#666',
    height: 40,
    width: 300,
    alignSelf: 'center'
  },
})