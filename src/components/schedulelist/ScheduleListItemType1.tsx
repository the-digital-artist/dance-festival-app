import { PureComponent, ReactNode, createRef } from 'react';
import { Image, Platform, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import DataModel from '../../DataModel';
import ActionItemFavToggleStateUpdate from '../../actions/ActionItemFavToggleStateUpdate';
import LComponent from '../../core/LComponent';
import TransitionLinkToArtistPage from '../../transitions/TransitionLinkToArtistPage';
import TransitionScheduleItemFavSelect from '../../transitions/TransitionScheduleItemFavSelect';
import ButtonSmall from '../ButtonSmall';
import ScheduleItemToggle from './ScheduleItemToggle';
import LauncherController from '../../LauncherController';
import { GestureDetector } from 'react-native-gesture-handler';
import { tapGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/TapGestureHandler';


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

    this.state = { dataItem: props.item };

  }


  render(): ReactNode {
    // console.log("ScheduleListItemType1 Render Function Called: " + this.state.dataItem.id);

    let item = this.state.dataItem;
    if (item.itemType != 'type1') return;


    const levelData = [
      { src: require('../../../assets/schedule-levelicon-1.png'), text: "BEGINNER", textWidth: 54 },
      { src: require('../../../assets/schedule-levelicon-2.png'), text: "INTERMEDIATE", textWidth: 72 },
      { src: require('../../../assets/schedule-levelicon-3.png'), text: "ADVANCED", textWidth: 56 }
    ]
    const levelId = item.level != undefined ? item.level : -1;
    const levelImageSize = 10;
    //get data of artists
    const artistData1 = DataModel.dataArtists[item.artistOne];
    const artistData2 = item.artistTwo ? DataModel.dataArtists[item.artistTwo] : null;

    const itemHeight = item.rowHeight != undefined ? item.rowHeight : 100;
    const roomBoxOffsetY = 20
    const verticalOffsetTitleLength = item.lineCount != undefined ? (item.lineCount * 19) : 19;
    const verticalOffsetLevel = (item.levelSpecial != undefined && item.levelSpecial == '1') ? 20 : 0

    const imageWidthArtistImagex1 = this.props.tileWidth / (2.0) * (160 / 305);
    const imageWidthArtistImagex2 = imageWidthArtistImagex1 * 0.7;

    const imageOffsetYArtistImage = 30 + ((305 - this.props.tileWidth) / (305 - 245)) * 10
    const imageOffsetXRArtistImage = 10;
    const imageOffsetXLArtistImage = 10;
    const fontSizeMainTitle = this.props.tileWidth * (17 / 305);
    const fontSizeArtistName = this.props.tileWidth * (14 / 305)

    // console.log("ScheduleListItemType1 tileLength " + this.props.tileWidth + " artistImageWidth: "+ imageWidthArtistImage);

    return (
      <Animated.View
        style={[{
          position: 'absolute',
          left: this.props.tileOffsetLeft, top: this.props.tileOffsetTop,
          height: itemHeight, width: this.props.tileWidth,
          opacity: 1,
          // backgroundColor:'red',
        }, this.props.dynamicVisualProperties0]}
      >

        <View
          //  name={"ScheduleItemFrame1_" + item.id}
          style={{
            position: 'absolute',
            backgroundColor: '#76777d',
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



        <View
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
        />




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
              backgroundColor: '#615a83',
            }}
            visualProperties={{ alpha: 0, x: 3, y: 0, h: (itemHeight - 30 - 3), w: this.props.tileWidth - 6 }}
          />

          <Animated.Text allowFontScaling={false} id='textLocation' style={[{
            position: 'absolute',
            top: 3,
            left: (this.props.tileWidth - 75) / 2,
            // right: (item.orientation == 'right' ? undefined : 10),
            // left: (item.orientation == 'left' ? undefined : 10),
            height: 15,
            width: 75,
            fontFamily: 'RobotoCondensed-Medium',
            // backgroundColor: 'skyblue',
            textAlign: 'center',
            color: '#FFFFFF',
            fontSize: 11,
            letterSpacing: 1.2
          }, this.props.dynamicVisualProperties2]}>
            {(item.room as string).toLocaleUpperCase()}
          </Animated.Text>



          <Animated.View
            style={this.props.dynamicVisualProperties1}>

            {artistData2 != null &&

              <ButtonSmall
                name={("artistImageButton2" + item.id)}
                source={artistData2 ? artistData2.imgSrc : null}
                style={{
                  position: 'absolute',
                  top: 2 + imageOffsetYArtistImage + (imageWidthArtistImagex1 - imageWidthArtistImagex2) / 2,
                  right: (item.orientation == 'right' ? (imageWidthArtistImagex2 + imageOffsetXRArtistImage - 10) : undefined),
                  left: (item.orientation == 'left' ? (imageWidthArtistImagex2 + imageOffsetXLArtistImage - 10) : undefined),
                  width: imageWidthArtistImagex2,
                  height: imageWidthArtistImagex2,

                }}
                imageStyle={[{
                  position: 'absolute',
                  right: undefined, left: undefined,
                  width: imageWidthArtistImagex2,
                  height: imageWidthArtistImagex2,
                  resizeMode: 'cover',
                  opacity: 0.9,
                }]}
                bgBoxVisible={false}
                visualProperties={{ alpha: 1 }}
                onSelect={() => {
                  if (artistData1 == undefined) return;
                  LauncherController.getInstance().context.navigationHistory.push({ out: "SchedulerScreen", transition: "TransitionLinkToArtistPage" });
                  TransitionLinkToArtistPage(artistData2)
                }}
              />
            }

            <ButtonSmall
              name={("artistImageButton1" + item.id)}
              source={artistData1 ? artistData1.imgSrc : null}
              style={{
                position: 'absolute',
                top: 2 + (artistData2 ? imageOffsetYArtistImage + (imageWidthArtistImagex1 - imageWidthArtistImagex2) / 2 : imageOffsetYArtistImage),
                right: (item.orientation == 'right' ? imageOffsetXRArtistImage : undefined),
                left: (item.orientation == 'left' ? imageOffsetXLArtistImage : undefined),
                width: (artistData2 ? imageWidthArtistImagex2 : imageWidthArtistImagex1),
                height: (artistData2 ? imageWidthArtistImagex2 : imageWidthArtistImagex1),
              }}
              imageStyle={[{
                position: 'absolute',
                right: undefined, left: undefined,
                width: (artistData2 ? imageWidthArtistImagex2 : imageWidthArtistImagex1),
                height: (artistData2 ? imageWidthArtistImagex2 : imageWidthArtistImagex1),
                resizeMode: 'cover',
                opacity: 0.9,
              }]}
              bgBoxVisible={false}
              visualProperties={{ alpha: 1 }}
              onSelect={() => {
                if (artistData1 == undefined) return;
                LauncherController.getInstance().context.navigationHistory.push({ out: "SchedulerScreen", transition: "TransitionLinkToArtistPage" });
                TransitionLinkToArtistPage(artistData1)
              }}
            />


            <Animated.Text allowFontScaling={false} id='textSessionMainTitle' style={{
              position: 'absolute',
              top: 26,
              right: (item.orientation == 'right' ? undefined : (4 + 35)),
              left: (item.orientation == 'left' ? undefined : (4 + 35)),
              width: 210,
              fontFamily: 'LuckiestGuy-Regular',
              // backgroundColor: 'indigo',
              textAlign: (item.orientation == 'right' ? 'left' : 'right'),
              color: '#f2aa3e',
              fontSize: (fontSizeMainTitle),
            }}>
              {item.sessionMainTitle}
            </Animated.Text>


            <Text allowFontScaling={false} id='textSessionArtistName' style={{
              position: 'absolute',
              top: (40 + verticalOffsetTitleLength + verticalOffsetLevel),
              right: (item.orientation == 'right' ? undefined : (4 + 35)),
              left: (item.orientation == 'left' ? undefined : (4 + 35)),
              height: fontSizeArtistName * 2.5,
              width: this.props.tileWidth - 35 - 4 - 10 - imageWidthArtistImagex1,
              fontFamily: 'RobotoCondensed-Medium',
              letterSpacing: 1.2,
              // backgroundColor: 'indigo',
              textAlign: (item.orientation == 'right' ? 'left' : 'right'),
              color: '#f8f6d3',
              fontSize: (fontSizeArtistName),
            }}>
              {item.artistName ? (item.artistName as string).toLocaleUpperCase() : ""}
            </Text >





            {levelData[levelId] != undefined &&
              <>
                <Image
                  source={levelData[levelId].src}
                  style={{
                    // backgroundColor: 'greenyellow',
                    position: 'absolute',
                    top: (25 + verticalOffsetTitleLength),
                    right: (item.orientation == 'right' ? undefined : (levelData[levelId].textWidth + 40)),
                    left: (item.orientation == 'left' ? undefined : (levelData[levelId].textWidth + 40)),
                    width: levelImageSize * 105 / 33,
                    height: levelImageSize,
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
                  fontFamily: 'RobotoCondensed-Medium',
                  letterSpacing: 1.2,
                  // opacity: 0.5,
                  // backgroundColor: 'indigo',
                  textAlign: (item.orientation == 'right' ? 'left' : 'right'),
                  color: '#e5e4cf',
                  fontSize: 9,
                }}>
                  {levelData[levelId].text}
                </Text >
              </>
            }

            {item.levelSpecial != undefined && item.levelSpecial == '1' && levelData[levelId] != undefined &&
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
                  fontFamily: 'RobotoCondensed-Medium',
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

            }

            {item.levelSpecial != undefined && item.levelSpecial == '3' &&
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
                  fontFamily: 'RobotoCondensed-Medium',
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

            }

            <ScheduleItemToggle
              ref={(r) => { this.toggleButtonReference = r }}
              name={("ImageToggle" + item.id)}
              style={{
                // backgroundColor: 'indigo',
                position: 'absolute',
                right: (item.orientation == 'left' ? 3 : undefined),
                left: (item.orientation == 'right' ? (3) : undefined),
                top: (20),
                width: 35, height: 35,
              }}
              initialCheckedState={this.state.dataItem.favoriteState}
              onSelect={(newState) => {
                ActionItemFavToggleStateUpdate(this, newState)
              }}
              sourceOn={require('../../../assets/button-fav-on.png')}
              sourceOff={require('../../../assets/button-fav-off.png')}
            />

            {(item.id != 'focus') &&

              <ButtonSmall
                name={("ScheduleListArtistDetailsButton"+item.id)}
                source={null}
                style={{
                  position: 'absolute',
                  right: (item.orientation == 'right' ? undefined : (4 + 29)),
                  left: (item.orientation == 'left' ? undefined : (4 + 29)),
                  top: (63 + verticalOffsetTitleLength + verticalOffsetLevel),
                  height: 23, width: 120,
                }}
                text={"ARTIST DETAILS"}
                bgBoxVisible={true}
                bgBoxStyle={{
                  backgroundColor: '#36373a',
                  height: 23, width: 120
                }}
                fontStyle={{
                  top: ((Platform.OS == 'android'))?-2:5,
                  width: 120,
                  color: '#f2a33a',
                  fontFamily: 'Cabin-Regular',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  letterSpacing: 2.0,
                  height: 23,
                  fontSize: 9,
                }}
                visualProperties={{ alpha: 1 }}
                onSelect={() => {
                  if (artistData1 == undefined) return;
                  LauncherController.getInstance().context.navigationHistory.push({ out: "SchedulerScreen", transition: "TransitionLinkToArtistPage" });
                  TransitionLinkToArtistPage(artistData1)
                }}
              />
            }



          </Animated.View>

        </View>

      </Animated.View>
    );
  }

  componentDidMount(): void {
    TransitionScheduleItemFavSelect(this.state.dataItem)
  }

  setFavoriteState(value: boolean) {
    this.state.dataItem.favoriteState = value;
    this.setState({ dataItem: this.state.dataItem });
    TransitionScheduleItemFavSelect(this.state.dataItem)
  }
}

export default ScheduleListItemType1;