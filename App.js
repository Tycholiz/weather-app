import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Platform,
  KeyboardAvoidingView,
  TextInput,
  ImageBackground
} from 'react-native';

import getImageForWeather from './utils/getImageForWeather.'

import SearchInput from './components/SearchInput';

export default class App extends React.Component {
  render() {
    const location = 'San Francisco';
    return (
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior="padding"> 
        <ImageBackground
          source={getImageForWeather('Clear')}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <Text style={[styles.largeText, styles.textStyle]}>{location} {/* the reason we pass in this prop is because we need a way for our child component to modify that field and communicate back up to our container App component*/}
            </Text>
            <Text style={[styles.smallText, styles.textStyle]}>Light Cloud</Text>
            <Text style={[styles.largeText, styles.textStyle]}>24°</Text>
            <SearchInput 
              placeholder="Search any city" //this prop gets passed down to the child component
            />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: { // Since ImageBackground is the only nested element within KeyboardAvoidingView , setting imageContainer to flex: 1 means that this element will fill up the entire space of its parent component.
    flex: 1  //flex attribute mean that they will expand to take up any room remaining in their parent container in relation to any sibling components
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover', //allows us to define how the image is resized when the Image element does not match its actual dimensions
  },
  detailsContainer: {
    flex: 1, //we’re ensuring the container within ImageBackground also fills up the entire space of its parent component as well as have its items aligned at the center of the screen
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
    ...Platform.select({
      ios: {
        fontFamily: 'AvenirNext-Regular',
      },
      android: {
        fontFamily: 'Roboto',
      },
    })
  },
    largeText: {
      fontSize: 44,
  },
    smallText: {
      fontSize: 18,
  },
});
