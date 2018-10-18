import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator, //a component that will render a spinner to indicate loading
  StatusBar, //built-in component that allows us to modify the app status bar at the top of the device
} from 'react-native';

import { fetchLocationId, fetchWeather } from './utils/api' //methods to interact with Weather API
import getImageForWeather from './utils/getImageForWeather.'

import SearchInput from './components/SearchInput';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false, //used to store the error message, should there be one
      loading: false,
      location: '',  //these bottom three are data that we'll get from the API
      temperature: 0,
      weather: ''
    };
  }

  componentDidMount() { // this lifecycle method is commonly used to trigger network requests to fetch data that the component would need
    console.log('Component has mounted!');
    this.handleUpdateLocation('San Francisco'); //when component mounts, location will be updated to San Francisco
    this.setState({ weather: 'Clear' }, () => console.log(this.state)); //an example to demonstrate async. weather: 'Clear' is logged right after our component finishes mounting
  }

  handleUpdateLocation = city => { //asynchronous action to fetch weather data for a city happens here. Therefore it makes sense to call this method when our component first loads
    if (!city) return;
    this.setState({ loading: true }, async () => { //this 'async' is a callback that will fire after the state is updated. the cb allows updates to our state to happen asynchronously
      try {
        const locationId = await fetchLocationId(city); //we call fetchLocationId and pass the locationId to fetchWeather to return an object that contains the required information ( location , weather , and temperature )
        const { location, weather, temperature } = await fetchWeather(
          locationId,
        );

        this.setState({ //our state will be updated here only once the above fetch functions have been completed. if any of the calls error, then our catch statement will update the error property to true
          loading: false,
          error: false,
          location,
          weather,
          temperature,
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: true,
        });
      }
    });  
  };


  render() {
    const { loading, error, location, weather, temperature  } = this.state;
    return (
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior="padding">
        <StatusBar 
          barStyle="light-content" //changes color of status bar (iOS). we can configure Androoid statusbar in app.json
        /> 
        <ImageBackground
          source={getImageForWeather(weather)} //display appropriate image according to weather conditions
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator 
              animating={loading} //this prop is responsible for whether or not the indicator component shows 
              color='white' 
              size='large'
            />
            {!loading && ( //render this if loading is false
              <View>
                {error && ( //render this if there is an error
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Could not load weather. Please try a different city.
                  </Text>
                )}
                {!error && ( //render this if there is no error
                  <View>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {location} {/* the reason we pass in this prop is because we need a way for our child component to modify that field and communicate back up to our container App component*/}
                    </Text>
                    <Text style={[styles.smallText, styles.textStyle]}>
                      {weather}
                    </Text>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {`${Math.round(temperature)}°`} 
                    </Text>
                  </View>
                )}
            )}

                <SearchInput 
                  placeholder="Search any city" //this prop gets passed down to the child component
                  onSubmit={this.handleUpdateLocation} //here, the SearchInput comp. is communicating with the parent whenever the user submits the input field. We do this because we want our parent component to handle the event of the user typing and submitting a new city
                />
              </View>
            )}
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
    flex: 1  //flex attribute means that they will expand to take up any room remaining in their parent container in relation to any sibling components
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
