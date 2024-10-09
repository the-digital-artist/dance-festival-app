import { Dimensions, Image, Platform, Text, View } from 'react-native';
import DataModel from '../../DataModel';
import LauncherController from '../../LauncherController';
import TransitionLinkToArtistPage from '../../transitions/TransitionLinkToArtistPage';
import ButtonSmall from '../ButtonSmall';
import LText from '../../core/LText';
import ActionSessionListOnDetailsBtn from '../../actions/ActionSessionListOnDetailsBtn';
import ButtonText from '../ButtonText';
import LComponent from '../../core/LComponent';
import ScheduleItemToggle from './ScheduleItemToggle';
import ActionItemFavToggleStateUpdate from '../../actions/ActionItemFavToggleStateUpdate';
import { createRef, PureComponent, useState } from 'react';
import TransitionScheduleItemFavSelect from '../../transitions/TransitionScheduleItemFavSelect';



class ScheduleListItemType4 extends PureComponent<any, any> {
  toggleButtonReference: any = createRef();
  constructor(props) {
    super(props)
    this.state = { dataItem: props.item, favState: props.item.favoriteState };
  }

  render() {
    // console.log("ScheduleListItem: " + JSON.stringify(item, null, 2));
    const item = this.state.dataItem;

    if (item.itemType != 'type4') return;

    const sessionCategoryName = (item.groupTitle != undefined) ? item.groupTitle : " Special Track "
    const artistData1 = DataModel.getInstance().static.dataArtists[item.artistOne];
    const artistData2 = item.artistTwo ? DataModel.getInstance().static.dataArtists[item.artistTwo] : null;
    const verticalOffsetTitleLength = item.lineCount != undefined ? (item.lineCount * 19) : 19;
    const preSignupRequired = ((item.sessionMainTitle as string).toLowerCase().indexOf("absolute beginner") == -1)

    const paddingLeftAndRight = 5;
    const tileWidth = Dimensions.get('screen').width / 2 - paddingLeftAndRight;
    const fontSizeMainTitle = tileWidth * (15 / 200);
    const fontSizeArtistName = tileWidth * (23 / 200)


    const companyString = (artistData1 != undefined && artistData1.artistCompany != undefined) ? artistData1.artistCompany : '';

    return (
      <>
        <LComponent
          name={"ScheduleItemHighlight" + item.id}
          style={{
            backgroundColor: '#f2aa3e',
            borderBottomWidth: 1,
            borderColor: '#efc787'
          }}
          visualProperties={{
            alpha: item.favoriteState ? 1.0 : 0.0, x: 0, y: 30,
            h: (item.itemHeight - 30), w: Dimensions.get('screen').width
          }}
        />
        <Text allowFontScaling={false} id='textSessionCategoryAndRoom' style={{
          // position: 'absolute',
          // top: 60,
          marginTop: 40,
          marginBottom: 5,
          left: Dimensions.get('screen').width / 2 - 200 / 2,
          width: 200,
          fontFamily: 'Cabin-Regular',
          letterSpacing: 1.2,
          opacity: 1.0,
          padding: 2,
          backgroundColor: '#e4d5bd',
          // backgroundColor: '#600f2c',
          textAlign: 'center',
          color: '#232323',
          fontSize: 11,
        }}>
          {sessionCategoryName.toLocaleUpperCase() + "  |  " + (item.room ? (item.room as string).toLocaleUpperCase() + " " : "")}
        </Text >

        {preSignupRequired && <Text allowFontScaling={false} id='textPreSignup' style={{
          left: 0,
          // width: Dimensions.get('screen').width - 90,
          // height: 15,
          fontFamily: 'Cabin-Regular',
          letterSpacing: 1.2,
          // opacity: 0.5,
          // backgroundColor: 'indigo',
          textAlign: 'center',
          color: '#FFFFFF',
          fontSize: 10,
        }}>
          {"PRE-SIGNUP REQUIRED"}
        </Text >
        }

        <ScheduleItemToggle
          ref={(r) => { this.toggleButtonReference = r }}
          name={("ImageToggle" + item.id)}
          style={{
            // backgroundColor: 'indigo',
            position: 'relative',
            right: (item.orientation == 'left' ? 0 : undefined),
            left: (item.orientation == 'right' ? 0 : undefined),
            top: -15,
            width: Dimensions.get('screen').width,
            height: 55,
          }}
          imgStyle={{
            top: 23,
            width: 20, height: 20,
          }}
          initialCheckedState={this.state.favState}
          onSelect={(newState) => {
            ActionItemFavToggleStateUpdate(this, newState)
          }}
          sourceOn={require('../../../assets/icon_fav_active.png')}
          sourceOff={require('../../../assets/icon_fav_inactive.png')}
        />



        <View
          style={{
            // backgroundColor: 'skyblue',
            flex: 1, flexDirection: 'column',
            top: -15,
            // left: 85,
            // width: Dimensions.get('screen').width / 2,
            // height: 10
          }}>


          <ButtonText
            name={("ItemRendererLabelMainTitle" + item.id)}
            style={{
              position: 'relative',
            }}
            fontStyle={{
              fontFamily: 'AktivGrotesk-Regular',
              // backgroundColor: 'indigo',
              letterSpacing: 0.0,
              textAlign: 'center',
              color: this.state.favState ? '#2a1d08' : '#f2aa3e',
              fontSize: fontSizeMainTitle,

            }}
            onPress={() => {
              if (artistData1 == undefined) return;
              LauncherController.getInstance().context.navigationHistory.push({ out: "SchedulerScreen", transition: "TransitionLinkToArtistPage", data: {} });
              TransitionLinkToArtistPage(artistData1)
            }}
            text={(item.sessionMainTitle ? (item.sessionMainTitle as string) : "") + "  "}
          />



          <ButtonText
            name={("ItemRendererLabelArtist" + item.id)}
            style={{
              position: 'relative',
              marginTop: 5,
              left: 0,
            }}
            fontStyle={{
              fontFamily: 'RamaGothicEW01-Regular',
              letterSpacing: -0.1,
              fontSize: fontSizeArtistName,
              // backgroundColor: 'indigo',
              textAlign: 'center',
              color: this.state.favState ? '#2a1d08' : '#ffffff',

            }}
            onPress={() => {
              if (artistData1 == undefined) return;
              LauncherController.getInstance().context.navigationHistory.push({ out: "SchedulerScreen", transition: "TransitionLinkToArtistPage", data: {} });
              TransitionLinkToArtistPage(artistData1)
            }}
            text={item.artistName ? (item.artistName as string) : ""}
          />


        </View >
        <ButtonSmall
          name={("ScheduleListArtistDetailsButton" + item.id)}
          source={null}
          style={{
            left: Dimensions.get('screen').width / 2 - 120 / 2,
            bottom: 20,
            height: 20, width: 120,
          }}
          text={"ARTIST DETAILS"}
          bgBoxVisible={true}
          bgBoxStyle={{
            // backgroundColor: '#36373a',
            borderColor: '#FFFFFF',
            borderWidth: 1,
            height: 20, width: 120
          }}
          fontStyle={{
            top: ((Platform.OS == 'android')) ? 0 : 5,
            width: 120,
            color: '#ffffff',
            fontFamily: 'AktivGrotesk-Regular',
            textAlign: 'center',
            textAlignVertical: 'center',
            letterSpacing: 2.0,
            height: 20,
            fontSize: 9,
          }}
          visualProperties={{ alpha: 1 }}
          onSelect={() => {
            if (artistData1 == undefined) return;
            LauncherController.getInstance().context.navigationHistory.push({ out: "SchedulerScreen", transition: "TransitionLinkToArtistPage", data: {} });
            TransitionLinkToArtistPage(artistData1)
          }}
        />
        {/* <ButtonSmall
        name={("ScheduleListArtistDetailsButton" + item.id)}
        source={null}
        style={{
          position: 'absolute',
          left: 80,
          top: item.itemHeight - 40,
          height: 23, width: 130,
        }}
        text={"SESSION INFO"}
        bgBoxVisible={true}
        bgBoxStyle={{
          backgroundColor: '#600f2c',
          opacity: 0.4,
          height: 23, width: 130
        }}
        fontStyle={{
          width: 130,
          top: ((Platform.OS == 'android')) ? -2 : 5,
          color: '#EFEFEF',
          fontFamily: 'Cabin-Regular',
          textAlign: 'center',
          textAlignVertical: 'center',
          letterSpacing: 2.0,
          fontSize: 9,
          height: 23,
        }}
        visualProperties={{ alpha: 1 }}
        onSelect={() => {
          ActionSessionListOnDetailsBtn(item)
        }}
      /> */}

        {/* <ButtonSmall
        name={("artistImageButton1" + item.id)
        }
        source={artistData1 ? artistData1.imgSrc : null}
        style={{
          position: 'absolute',
          // backgroundColor: 'skyblue',
          top: 10,
          left: Dimensions.get('screen').width - 140,
          width: 135,
          height: 135,
        }}
        imageStyle={
          [{
            position: 'absolute',
            right: undefined, left: undefined,
            width: 135,
            height: 135,
            resizeMode: 'cover',
            opacity: 0.9,
          }]}
        bgBoxVisible={false}
        bgBoxStyle={{
          backgroundColor: '#FFFFFF',
          opacity: 0.1,
          left: -5,
          width: 145,
          height: 145,
        }}
        visualProperties={{ alpha: 1 }}
        onSelect={() => {
          if (artistData1 == undefined) return;
          LauncherController.getInstance().context.navigationHistory.push({ out: "SchedulerScreen", transition: "TransitionLinkToArtistPage", data: {} });
          TransitionLinkToArtistPage(artistData1)
        }}
      /> */}
      </>
    );
  }
  componentDidMount(): void {
    TransitionScheduleItemFavSelect(this.state.dataItem)
  }

  setFavoriteState(value: boolean) {
    console.log('setFavoriteState');
    this.state.dataItem.favoriteState = value;
    this.setState({ dataItem: this.state.dataItem, favState: value });
    TransitionScheduleItemFavSelect(this.state.dataItem)
  }
}

export default ScheduleListItemType4;