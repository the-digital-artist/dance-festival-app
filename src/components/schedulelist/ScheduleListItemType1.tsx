import { PureComponent, ReactNode, createRef } from 'react';
import { Dimensions, Image, Platform, Text, View } from 'react-native';
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
    // if (item.itemType != 'type1') return;


    const levelData = [
      { src: require('../../../assets/schedule-levelicon-1.png'), text: "BEGINNER", textWidth: 52 },
      { src: require('../../../assets/schedule-levelicon-2.png'), text: "INTERMEDIATE", textWidth: 72 },
      { src: require('../../../assets/schedule-levelicon-3.png'), text: "ADVANCED", textWidth: 54 }
    ]
    let levelId = item.level != undefined ? item.level : -1;
    // levelId = 0; //DEBUG always set a level
    const levelImageSize = 10;
    //get data of artists
    const artistData1 = DataModel.getInstance().static.dataArtists[item.artistOne];
    const artistData2 = item.artistTwo ? DataModel.getInstance().static.dataArtists[item.artistTwo] : null;

    const itemHeight = item.rowHeight != undefined ? item.rowHeight : 100;
    const reduceInnerTileHeightBy = item.dateString != "Thu, October 17, 2024" ? 30 : 5;

    const itemOrientation: string = 'left'//item.orientation
    const roomBoxOffsetY = 20
    const verticalOffsetTitleLength = item.lineCount != undefined ? (item.lineCount * 19) : 19;
    const verticalOffsetLevel = (item.levelSpecial != undefined && item.levelSpecial == '1') ? 20 : 0

    // const imageWidthArtistImagex1 = this.props.tileWidth / (1.4) * (160 / 305);
    const imageWidthArtistImagex1 = (itemHeight - reduceInnerTileHeightBy - 40);
    const imageWidthArtistImagex2 = imageWidthArtistImagex1 * 0.7;

    const imageWidthArtistImage = this.props.tileWidth * (120 / 305) * 0.9;
    const imageOffsetYArtistImage = 15 + ((305 - this.props.tileWidth) / (305 - 245)) * 10
    const imageOffsetXRArtistImage = 0;
    const imageOffsetXLArtistImage = 8;
    const fontSizeMainTitle = this.props.tileWidth * (16 / 305);
    // const fontSizeArtistName = this.props.tileWidth * (13 / 305)
    // const fontSizeMainTitle =20;
    const fontSizeArtistName = 16;

    const roomString = (item.groupTitle.toLocaleUpperCase() == 'GROUP CLASS' ? 'Group Class Space'.toLocaleUpperCase() : item.groupTitle.toLocaleUpperCase());

    const colorMap = {
      'GROUP CLASS SPACE': { color1: '#b63391', color2: '#c3aabe' },
      'CONVERSATION CIRCLES': { color1: '#4872a6', color2: '#8996a6' },
      'OUTSIDE': { color1: '#ee785d', color2: '#ddb9a3' }
    }
    const categoryColor = colorMap[roomString] != undefined ? colorMap[roomString] : '#a23963'


    // console.log("ScheduleListItemType1 tileLength " + this.props.tileWidth + " artistImageWidth: "+ imageWidthArtistImage);

    return (
      <Animated.View
        style={[{
          position: 'absolute',
          left: this.props.tileOffsetLeft, top: this.props.tileOffsetTop,
          height: itemHeight, width: this.props.tileWidth,
          opacity: 1,
          // backgroundColor:'#121212',
        }, this.props.dynamicVisualProperties0]}
      >




        <View
          // name={"ScheduleItemFrame2_" + item.id}
          style={{
            position: 'absolute',
            backgroundColor: categoryColor.color2,
            borderColor: categoryColor.color1,
            // borderLeftWidth: 3,
            // borderRightWidth: 3,
            borderTopWidth: 20,
            borderBottomWidth: 0,
            opacity: 0.5,
            left: 0,
            top: roomBoxOffsetY,
            height: (itemHeight - reduceInnerTileHeightBy),
            width: this.props.tileWidth
          }}
        />




        <View
          // name={"ScheduleItemBoundary_" + item.id}
          style={{
            position: 'absolute',
            left: 0,
            top: roomBoxOffsetY,
            height: (itemHeight - reduceInnerTileHeightBy),
            width: this.props.tileWidth,
            opacity: 1,
            // backgroundColor:'skyblue',
          }}
        >

          <LComponent
            name={"ScheduleItemHighlight" + item.id}
            style={{
              backgroundColor: '#615a83',
            }}
            visualProperties={{ alpha: 0, x: 0, y: 0, h: (itemHeight - reduceInnerTileHeightBy), w: this.props.tileWidth }}
          />
          <Animated.Text allowFontScaling={false} id='textLocation' style={[{
            top: (Platform.OS=="ios"?2:1),
            left: (this.props.tileWidth - 160) / 2,
            // right: (itemOrientation == 'right' ? undefined : 10),
            // left: (itemOrientation == 'left' ? undefined : 10),
            width: 160,
            fontFamily: 'Cabin-Regular',
            letterSpacing: 1.8,
            opacity: 1.0,
            padding: 2,
            textAlign: 'center',
            color: '#FFFFFF',
            fontSize: 10,
          }, this.props.dynamicVisualProperties2]}>
            {roomString}
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
                  right: (itemOrientation == 'right' ? (imageWidthArtistImagex2 + imageOffsetXRArtistImage - 10) : undefined),
                  left: (itemOrientation == 'left' ? (imageWidthArtistImagex2 + imageOffsetXLArtistImage - 10) : undefined),
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
                top: 0 + (artistData2 ? imageOffsetYArtistImage + (imageWidthArtistImagex1 - imageWidthArtistImagex2) / 2 : imageOffsetYArtistImage),
                right: (itemOrientation == 'right' ? imageOffsetXRArtistImage : undefined),
                left: (itemOrientation == 'left' ? imageOffsetXLArtistImage : undefined),
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

            <View
              style={{
                position: 'absolute',
                top: 8,
                // right: (itemOrientation == 'right' ? undefined : (4 + 35)),
                left: imageWidthArtistImagex1 + 10,
                // backgroundColor: 'skyblue',
                // flex: 1, flexDirection: 'column',
                width: this.props.tileWidth - imageWidthArtistImagex1 - 45,
                height: 100
              }}>

              <Text allowFontScaling={false} id='textSessionMainTitle' style={{
                right: (itemOrientation == 'right' ? undefined : 0),
                left: (itemOrientation == 'left' ? undefined : 0),
                fontFamily: 'RobotoCondensed-Regular',
                letterSpacing: 0.0,
                // backgroundColor: 'indigo',
                textAlign: (itemOrientation == 'right' ? 'left' : 'right'),
                color: '#fefefe',
                fontSize: (fontSizeMainTitle),
                opacity: 1.0
              }}>
                {(item.sessionMainTitle as string)}
              </Text>


              <Text allowFontScaling={false} id='textSessionArtistName' style={{
                top: 5,
                right: (itemOrientation == 'right' ? undefined : 0),
                left: (itemOrientation == 'left' ? undefined : 0),
                fontFamily: 'Cabin-Regular',
                width: this.props.tileWidth - imageWidthArtistImagex1 - 40,
                letterSpacing: 2.0,
                fontSize: 12,
                // backgroundColor: 'red',
                textAlign: (itemOrientation == 'right' ? 'left' : 'right'),
                color: '#3f3639',
                // fontSize: (fontSizeArtistName),
              }}>
                {item.artistName ? (item.artistName as string).toLocaleUpperCase() : ""}
              </Text >


            </View>
            <ButtonSmall
              name={("ScheduleListArtistDetailsButton" + item.id)}
              source={null}
              style={{
                right: (itemOrientation == 'right' ? undefined : undefined),
                left: (itemOrientation == 'left' ? this.props.tileWidth - 120 - 10 : 0),
                top: itemHeight - 25 - 50,
                height: 23, width: 120,
              }}
              text={"DETAILS"}
              bgBoxVisible={true}
              bgBoxStyle={{
                backgroundColor: '#232323',
                opacity: 0.5,
                height: 23, width: 120
              }}
              fontStyle={{
                width: 120,
                top: ((Platform.OS == 'android')) ? -2 : 5,
                color: '#FFFFFF',
                fontFamily: 'Cabin-Regular',
                textAlign: 'center',
                textAlignVertical: 'center',
                letterSpacing: 2.0,
                // color: '#FFFFFF',
                fontSize: 9,
                height: 23,
              }}
              visualProperties={{ alpha: 1 }}
              onSelect={() => {
                if (artistData1 == undefined) return;
                LauncherController.getInstance().context.navigationHistory.push({ out: "SchedulerScreen", transition: "TransitionLinkToArtistPage" });
                TransitionLinkToArtistPage(artistData1)
              }}
            />
          </Animated.View >




          {/* <Animated.Image
            source={artistData1 ? artistData1.imgSrc : null}
            style={[{
              // backgroundColor: 'greenyellow',
              position: 'absolute',
              top: 2 + imageOffsetYArtistImage,
              right: (itemOrientation == 'right' ? -imageOffsetXArtistImage : undefined),
              left: (itemOrientation == 'left' ? -imageOffsetXArtistImage : undefined),
              width: imageWidthArtistImage, height: imageWidthArtistImage,
              resizeMode: 'cover'
            }, this.props.dynamicVisualProperties1]}
          /> */}



          {/* {levelData[levelId] != undefined &&
              <>
                <Image
                  source={levelData[levelId].src}
                  style={{
                    // backgroundColor: 'greenyellow',
                    position: 'absolute',
                    top: (34 + verticalOffsetTitleLength),
                    right: (itemOrientation == 'right' ? undefined : (levelData[levelId].textWidth + 40)),
                    left: (itemOrientation == 'left' ? undefined : (levelData[levelId].textWidth + 38)),
                    width: levelImageSize*(105/33),
                    height: levelImageSize,
                    resizeMode: 'cover'
                  }}>
                </Image>

                <Text allowFontScaling={false} id='textSessionLevel' style={{
                  position: 'absolute',
                  top: (35 + verticalOffsetTitleLength - 1),
                  right: (itemOrientation == 'right' ? undefined : (4 + 35)),
                  left: (itemOrientation == 'left' ? undefined : (4 + 35)),
                  // height: levelImageSize,
                  width: (100 - 15),
                  fontFamily: 'Cabin-Regular',
                  letterSpacing: 1.2,
                  // opacity: 0.5,
                  // backgroundColor: 'indigo',
                  textAlign: (itemOrientation == 'right' ? 'left' : 'right'),
                  color: '#232323',
                  fontSize: 8.5,
                }}>
                  {levelData[levelId].text}
                </Text >
              </>

            } */}

          <ScheduleItemToggle
            ref={(r) => { this.toggleButtonReference = r }}
            name={("ImageToggle" + item.id)}
            style={{
              // backgroundColor: 'indigo',
              position: 'absolute',
              right: (itemOrientation == 'left' ? 7 : undefined),
              left: (itemOrientation == 'right' ? (7) : undefined),
              top: (28),
              width: 25, height: 25,
            }}
            initialCheckedState={this.state.dataItem.favoriteState}
            onSelect={(newState) => {
              ActionItemFavToggleStateUpdate(this, newState)
            }}
            sourceOn={require('../../../assets/button-fav-on.png')}
            sourceOff={require('../../../assets/button-fav-off.png')}
          />





        </View >

      </Animated.View >
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