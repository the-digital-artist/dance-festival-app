
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';

import { StyleSheet, TouchableOpacity, Button, Text, Image, View, ScrollView, Dimensions, SectionList, SafeAreaView, useWindowDimensions, Platform, Alert, Linking } from 'react-native';
import DataModel from '../DataModel';

const ArtistDetailItemRenderer = ({style, dataItemArtist }) => {
    const artistPageButtonVisible = false;

    return (
        <View style={{
            opacity: dataItemArtist == '' ? 0 : 1,
            position: style.position, top: style.top, left: style.left,
            height: 300, width: Dimensions.get('window').width
        }}>
            <Image
                source={dataItemArtist == '' ? null : DataModel.dataArtists[dataItemArtist].imgSrc}
                style={{
                    position: 'absolute', top: 6, left: 0,
                    width: 150, height: 150, resizeMode: 'cover'
                }} />

            <Text id='detailArtistTwoName' style={{
                fontFamily: 'RamaGothicEW01-Regular',
                position: 'absolute', top: 0, left: 170,
                color: '#FFFFFF',
                fontSize: 30,
                fontWeight: 'normal',
                height: 44,
            }}>{dataItemArtist}</Text>

            <View style={{
                width: 170, height: artistPageButtonVisible ? 70 : 120,
                flexGrow: 1, flexDirection: 'row',
                position: 'absolute', top: 37, left: 172,

            }}>
                <Text style={{
                    color: '#FFFFFF',
                    fontFamily: 'AktivGrotesk-Regular',
                    fontSize: 12,
                    textAlign: 'justify',
                    flex: 1
                }}>
                    {dataItemArtist != '' ? DataModel.dataArtists[dataItemArtist].bio : ''}
                </Text>
            </View>

            {
                artistPageButtonVisible ?
                    <Image id='detailArtistTwoButton'
                        source={require('../assets/button_artistpage.png')}
                        style={{
                            position: 'absolute', top: 111, left: 0,
                            height: 40, resizeMode: 'contain'
                        }} />
                    : null
            }
        </View>
    );
}

export default ArtistDetailItemRenderer;