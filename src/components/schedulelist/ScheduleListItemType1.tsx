import { PureComponent, ReactNode, createRef } from 'react';
import { Dimensions, Image, Platform, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import DataModel from '../../DataModel';
import LauncherController from '../../LauncherController';
import ActionItemFavToggleStateUpdate from '../../actions/ActionItemFavToggleStateUpdate';
import LComponent from '../../core/LComponent';
import TransitionLinkToArtistPage from '../../transitions/TransitionLinkToArtistPage';
import TransitionScheduleItemFavSelect from '../../transitions/TransitionScheduleItemFavSelect';
import ButtonSmall from '../ButtonSmall';
import ScheduleItemToggle from './ScheduleItemToggle';


class ScheduleListItemType1 extends PureComponent<any, any> {
  // ({ item, orientation, rowHeight, group, groupIndex, groupIndexUpdateFunction })

  toggleButtonReference: any = createRef();

  constructor(props) {
    super(props)

    props.item['orientation'] = props.orientation;
    props.item['rowHeight'] = props.rowHeight;
    props.item['groupIndex'] = props.groupIndex;
    props.item['groupIndexUpdateFunction'] = props.groupIndexUpsdateFunction;
    props.item['renderer'] = this;
    props.item['assignedListIndex'] = props.assignedListIndex

    this.state = { dataItem: props.item, favState: props.item.favoriteState };
  }


  render(): ReactNode {


    let item = this.state.dataItem;
    if (item.itemType != 'type1') return;


    const levelData = [
      { src: require('../../../assets/schedule-levelicon-1.png'), srcBlack: require('../../../assets/schedule-levelicon-1-black.png'), text: "BEGINNER", textWidth: 54 },
      { src: require('../../../assets/schedule-levelicon-2.png'), srcBlack: require('../../../assets/schedule-levelicon-2-black.png'), text: "INTERMEDIATE", textWidth: 72 },
      { src: require('../../../assets/schedule-levelicon-25.png'), srcBlack: require('../../../assets/schedule-levelicon-25-black.png'), text: "INTERM./ADV.", textWidth: 72 },
      { src: require('../../../assets/schedule-levelicon-3.png'), srcBlack: require('../../../assets/schedule-levelicon-3-black.png'), text: "ADVANCED", textWidth: 56 }
    ]
    const levelId = item.level != undefined ? item.level : -1;
    const levelImageSize = 12;
    const levelStr = item.levelString != undefined ? item.levelString : '';
    console.log("ScheduleListItemType1 tileWidth: " + this.props.tileWidth);
    //get data of artists
    const artistData1 = DataModel.getInstance().static.dataArtists[item.artistOne];
    const artistData2 = item.artistTwo ? DataModel.getInstance().dyn_dataArtistsList[item.artistTwo] : null;

    const itemHeight = item.rowHeight != undefined ? item.rowHeight : 100;
    const roomBoxOffsetY = 20
    const verticalOffsetTitleLength = item.lineCount != undefined ? 0 : 0;
    const verticalOffsetLevel = (item.levelSpecial != undefined && item.levelSpecial == '1') ? 20 : 0

    const imageWidthArtistImagex1 = this.props.tileWidth / (2.0) * (160 / 305);
    const imageWidthArtistImagex2 = imageWidthArtistImagex1 * 0.7;

    const imageOffsetYArtistImage = 30 + ((305 - this.props.tileWidth) / (305 - 245)) * 10
    const imageOffsetXRArtistImage = 10;
    const imageOffsetXLArtistImage = 10;
    const fontSizeMainTitle = this.props.tileWidth * (15/ 200);
    const fontSizeArtistName = this.props.tileWidth * (23 / 200)

    // console.log("ScheduleListItemType1 tileLength " + this.props.tileWidth + " artistImageWidth: "+ imageWidthArtistImage);

    return (
      <Animated.View
        style={[{
          position: 'absolute',
          left: this.props.tileOffsetLeft, top: this.props.tileOffsetTop,
          height: itemHeight, width: this.props.tileWidth,
          opacity: 1,
          // backgroundColor: 'red',
        }, this.props.dynamicVisualProperties0]}
      >

        <View
          //  name={"ScheduleItemFrame1_" + item.id}
          style={{
            position: 'absolute',
            // backgroundColor: '#000000',
            borderColor: '#9F509F',
            // borderLeftWidth: 3,
            // borderRightWidth: 3,
            borderTopWidth: 0,
            // borderBottomWidth: 3,
            opacity: 1.0,
            left: 0,
            top: roomBoxOffsetY,
            height: (itemHeight - 30),
            width: this.props.tileWidth
          }}
        />



        {/* <View
          // name={"ScheduleItemFrame2_" + item.id}
          style={{
            position: 'absolute',
            backgroundColor: 'transparent',
            borderColor: '#8e8b89',
            // borderLeftWidth: 3,
            // borderRightWidth: 3,
            borderTopWidth: 20,
            borderBottomWidth: 0,
            opacity: 1,
            left: 0,
            top: roomBoxOffsetY,
            height: (itemHeight - 30),
            width: this.props.tileWidth
          }}
        /> */}




        <View
          // name={"ScheduleItemBoundary_" + item.id}
          style={{
            position: 'absolute',
            left: 0,
            top: roomBoxOffsetY,
            height: (itemHeight - 30),
            width: this.props.tileWidth,
            opacity: 1,
            // backgroundColor:'skyblue',
          }}
        >

          {/* <Image
            source={require('../../../assets/sessionitem-frame.png')}
            style={{
              // backgroundColor: 'greenyellow',
              position: 'absolute',
              left: 3, top: roomBoxOffsetY,
              opacity: 0.0,
              width: this.props.tileWidth - 6, height: itemHeight - 50 - 3,
              resizeMode: 'contain'
            }}
          /> */}

          <LComponent
            name={"ScheduleItemHighlight" + item.id}
            style={{
              backgroundColor: '#f2aa3e',
              // borderTopWidth: 1,
              borderBottomWidth: 1,
              // borderRightWidth: (item.orientation == 'left' ? 30 : 0),
              // borderLeftWidth: (item.orientation == 'right' ? 30 : 0),
              borderColor: '#efc787'
            }}
            visualProperties={{
              alpha: item.favoriteState ? 1.0 : 0.0, x: 0, y: -13,
              h: (itemHeight + 4), w: this.props.tileWidth - 1
            }}
          />

          <Animated.Text allowFontScaling={false} id='textLocation' style={[{
            position: 'absolute',
            top: 3,
            // left: 0,
            right: (item.orientation == 'right' ? undefined : 40),
            left: (item.orientation == 'left' ? undefined : 40),
            height: 15,
            // width: this.props.tileWidth,
            fontFamily: 'AktivGrotesk-Regular',
            // backgroundColor: 'skyblue',
            textAlign: 'center',
            color: '#FFFFFF',
            fontSize: 11,
            letterSpacing: 1.2
          }]}>
            {(item.room as string).toLocaleUpperCase()}
          </Animated.Text>



          <Animated.View
            style={this.props.dynamicVisualProperties1}


          >

            <View
              style={{
                position: 'absolute',
                // backgroundColor: 'skyblue',
                // right: (item.orientation == 'right' ? undefined : (-4)),
                left: (item.orientation == 'right' ? 40 : 5),
                width: Dimensions.get('screen').width / 2 - 45,
                top: 25,
                flex: 1, flexDirection: 'column',
                opacity: 1.0
              }}>

              <Animated.Text allowFontScaling={false} id='textSessionMainTitle' style={{
                marginBottom: 2,
                fontFamily: 'AktivGrotesk-Regular',
                fontSize: fontSizeMainTitle,
                // backgroundColor: 'indigo',
                textAlign: (item.orientation == 'right' ? 'left' : 'right'),
                color: this.state.favState ? '#2a1d08' : '#f2aa3e',
                // color: this.state.favState?'#f2aa3e':'#2a1d08',
              }}>
                {item.sessionMainTitle}
              </Animated.Text>


              <Text allowFontScaling={false} id='textSessionArtistName' style={{
                marginBottom: 5, marginTop: 5,
                fontFamily: 'RamaGothicEW01-Regular',
                fontSize: (fontSizeArtistName),
                letterSpacing: -0.1,
                // backgroundColor: 'indigo',
                textAlign: (item.orientation == 'right' ? 'left' : 'right'),
                color: this.state.favState ? '#2a1d08' : '#ffffff',

              }}>
                {item.artistName ? (item.artistName as string) : ""}
              </Text >

              {(levelStr != '' || levelData[levelId] != undefined) &&
                <View
                  style={{
                    // backgroundColor: 'lemonchiffon',
                    height: levelImageSize,
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <LComponent
                    style={{
                      // backgroundColor: 'green',
                      right: (item.orientation == 'right' ? undefined : 0),
                      left: (item.orientation == 'left' ? undefined : 0),
                      flexDirection: item.orientation == 'left' ? 'row-reverse' : 'row',
                      // width: (200),
                      height: levelImageSize,
                      alignContent: 'center',
                      justifyContent: 'center',
                      resizeMode: 'cover'
                    }}>


                    {(levelStr != '' || levelData[levelId] != undefined) &&
                      <Text allowFontScaling={false} id='textSessionLevel' style={{
                        // right: (item.orientation == 'right' ? undefined : (4)),
                        // left: (item.orientation == 'left' ? undefined : (4)),
                        // height: levelImageSize-3,
                        fontFamily: 'AktivGrotesk-Regular',
                        letterSpacing: 1.2,
                        // opacity: 0.5,
                        // backgroundColor: 'indigo',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        textAlign: (item.orientation == 'right' ? 'left' : 'right'),
                        color: this.state.favState ? '#2a1d08' : '#e5e4cf',
                        fontSize: 10,
                      }}>
                        {(levelData[levelId] != undefined ? levelData[levelId].text : levelStr).toLocaleUpperCase()}
                      </Text >
                    }

                    {levelData[levelId] != undefined &&
                      <Image
                        source={this.state.favState ? levelData[levelId].srcBlack : levelData[levelId].src}
                        style={{
                          // backgroundColor: 'greenyellow',
                          marginLeft: 5,
                          marginRight: 5,
                          // right: (item.orientation == 'right' ? undefined : (75)),
                          // left: (item.orientation == 'left' ? undefined : (75)),
                          width: levelImageSize * 120 / 60,
                          height: levelImageSize,
                          resizeMode: 'cover'
                        }}>
                      </Image>
                    }


                  </LComponent>
                </View>
              }

              {/* {item.levelSpecial != undefined && item.levelSpecial == '1' && levelData[levelId] != undefined &&
              <>
                <Image
                  source={require('../../../assets/scheduler-levelicon-specialdrums.png')}
                  style={{
                    // backgroundColor: 'greenyellow',
                    position: 'absolute',
                    top: (40 + verticalOffsetTitleLength),
                    right: (item.orientation == 'right' ? undefined : (levelData[levelId].textWidth + 47)),
                    left: (item.orientation == 'left' ? undefined : (levelData[levelId].textWidth + 47)),
                    width: levelImageSize * 1.4,
                    height: levelImageSize * 1.4,
                    resizeMode: 'cover'
                  }}>
                </Image>

                <Text allowFontScaling={false} id='textSessionLevel' style={{
                  position: 'absolute',
                  top: (40 + verticalOffsetTitleLength),
                  right: (item.orientation == 'right' ? undefined : (4 + 35)),
                  left: (item.orientation == 'left' ? undefined : (4 + 35)),
                  // height: levelImageSize,
                  width: (100 - 15),
                    fontFamily: 'AktivGrotesk-Regular',
                  letterSpacing: 1.2,
                  // opacity: 0.5,
                  // backgroundColor: 'indigo',
                  textAlign: (item.orientation == 'right' ? 'left' : 'right'),
                  color: '#e5e4cf',
                  fontSize: 9,
                }}>
                  {'PERCUSSION'}
                </Text >
              </>

            } */}

              {/* {item.levelSpecial != undefined && item.levelSpecial == '3' &&
              <>
                <Image
                  source={require('../../../assets/scheduler-levelicon-specialtheory.png')}
                  style={{
                    // backgroundColor: 'greenyellow',
                    position: 'absolute',
                    top: (25 + verticalOffsetTitleLength),
                    right: (item.orientation == 'right' ? undefined : (35 + 47)),
                    left: (item.orientation == 'left' ? undefined : (30 + 47)),
                    width: levelImageSize * 1.4,
                    height: levelImageSize * 1.4,
                    resizeMode: 'cover'
                  }}>
                </Image>

                <Text allowFontScaling={false} id='textSessionLevel' style={{
                  position: 'absolute',
                  top: (25 + verticalOffsetTitleLength),
                  right: (item.orientation == 'right' ? undefined : (4 + 35)),
                  left: (item.orientation == 'left' ? undefined : (4 + 35)),
                  // height: levelImageSize,
                  width: (100 - 15),
                  fontFamily: 'AktivGrotesk-Regular',
                  letterSpacing: 1.2,
                  // opacity: 0.5,
                  // backgroundColor: 'indigo',
                  textAlign: (item.orientation == 'right' ? 'left' : 'right'),
                  color: '#e5e4cf',
                  fontSize: 9,
                }}>
                  {'THEORY'}
                </Text >
              </>

            } */}

              {(item.id != 'focus') &&

                <View style={{
                  marginTop: 20,
                  // backgroundColor: 'lightpink',
                  borderColor: '#FFFFFF',
                  flexDirection: item.orientation == 'left' ? 'row-reverse' : 'row',
                  height: 20,
                }}
                >

                </View>
              }

            </View>

            <ScheduleItemToggle
              ref={(r) => { this.toggleButtonReference = r }}
              name={("ImageToggle" + item.id)}
              style={{
                // backgroundColor: 'indigo',
                position: 'absolute',
                right: (item.orientation == 'left' ? 10 : undefined),
                left: (item.orientation == 'right' ? 8 : undefined),
                top: (-3),
                width: 20, height: 20,
              }}
              initialCheckedState={this.state.favState}
              onSelect={(newState) => {
                ActionItemFavToggleStateUpdate(this, newState)
              }}
              sourceOn={require('../../../assets/icon_fav_active.png')}
              sourceOff={require('../../../assets/icon_fav_inactive.png')}
            />

            <ButtonSmall
              name={("ScheduleListArtistDetailsButton" + item.id)}
              source={null}
              style={{
                position: 'absolute',
                right: (item.orientation == 'right' ? undefined : 40),
                left: (item.orientation == 'left' ? undefined : 40),
                top: itemHeight - 20 - 30,
                height: 20, width: 120,
              }}
              text={"ARTIST DETAILS"}
              bgBoxVisible={true}
              bgBoxStyle={{
                // backgroundColor: '#36373a',
                borderColor: this.state.favState ? '#ffffff' : '#e5e4cf',
                // borderColor: '#FFFFFF',
                borderWidth: 1,
                height: 20, width: 120
              }}
              fontStyle={{
                top: ((Platform.OS == 'android')) ? -1 : 5,
                width: 120,
                color: this.state.favState ? '#ffffff' : '#ffffff',
                // color: '#ffffff',
                fontFamily: 'AktivGrotesk-Regular',
                textAlign: 'center',
                textAlignVertical: 'center',
                letterSpacing: 2.0,
                height: 21,
                fontSize: 9,
              }}
              visualProperties={{ alpha: 1 }}
              onSelect={() => {
                if (artistData1 == undefined) return;
                LauncherController.getInstance().context.navigationHistory.push({ out: "SchedulerScreen", transition: "TransitionLinkToArtistPage", data: {} });
                TransitionLinkToArtistPage(artistData1)
              }}
            />


          </Animated.View>

        </View>



      </Animated.View>
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

export default ScheduleListItemType1;