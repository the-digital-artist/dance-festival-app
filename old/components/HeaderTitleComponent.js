
import { StyleSheet, TouchableOpacity, Button, Text, Image, View, ScrollView, Dimensions, SectionList, SafeAreaView, useWindowDimensions, Platform, Alert, Linking } from 'react-native';
import DataModel from '../DataModel';


const HeaderTitleComponent = ({ title }) => {
    return (

      <View style={{
        // backgroundColor: 'pink',
        width: Dimensions.get('window').width,
        height: 28
      }}>
        <Text id='headerTitle' style={{
          position: 'absolute', top: 0, left: 0,
          fontFamily: 'RamaGothicEW01-Regular',
          color: '#ffbf11',
          fontSize: 28,
          letterSpacing: 3,
          height: 28
        }}>
          {title.toUpperCase()}
        </Text>
        {/* <Image
          style={{
            top:0, right: 10, position: 'absolute',
            width: 99, height: 28, resizeMode:'contain'
          }}
          source={require('../assets/header_logo_small.png')}
        /> */}
      </View>

    );
  }

  export default HeaderTitleComponent;