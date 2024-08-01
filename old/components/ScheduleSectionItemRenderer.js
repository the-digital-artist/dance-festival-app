
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';

import { StyleSheet, TouchableOpacity, Button, Text, Image, View, ScrollView, Dimensions, SectionList, SafeAreaView, useWindowDimensions, Platform, Alert, Linking } from 'react-native';

const ScheduleSectionItemRenderer = ({ section }) => {
  return (
    <Text style={{
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 28,
      fontFamily: 'RamaGothicEW01-Regular',
      fontWeight: 'normal',
      backgroundColor: 'rgba(247,247,247,1.0)',
    }}>{section.title}</Text>
  );

}

export default ScheduleSectionItemRenderer;