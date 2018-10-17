import React from 'react';
import { 
  StyleSheet, 
  TextInput, 
  View 
} from 'react-native';

export default class SearchInput extends React.Component {
  handleChangeText(newLocation) { //this function will pass the city name typed in to the parent

  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          placeholder={this.props.placeholder} //this component accept a placeholder prop
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          style={styles.textInput}
          clearButtonMode="always" //(iOS) displays a button on right end of text field to delete all text 
          onChangeText={this.handleChangeText} // as text changes, the fn handleChangeText gets run. the text automatically gets passed as the arg
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