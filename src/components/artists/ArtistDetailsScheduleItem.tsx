import { PureComponent, ReactNode, createRef } from 'react';
import { Image, Platform, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import DataModel from '../../DataModel';
import LauncherController from '../../LauncherController';
import ActionItemFavToggleStateUpdate from '../../actions/ActionItemFavToggleStateUpdate';
import LComponent from '../../core/LComponent';
import TransitionLinkToArtistPage from '../../transitions/TransitionLinkToArtistPage';
import TransitionScheduleItemFavSelect from '../../transitions/TransitionScheduleItemFavSelect';
import ButtonSmall from '../ButtonSmall';
import ScheduleItemToggle from '../schedulelist/ScheduleItemToggle';
import LText from '../../core/LText';


class ArtistDetailsScheduleItem extends PureComponent<any, any> {
  // ({ item, orientation, rowHeight, group, groupIndex, groupIndexUpdateFunction })

  toggleButtonReference: any = createRef();

  constructor(props) {
    super(props)

    props.item['orientation'] = 'right';
    props.item['rowHeight'] = props.rowHeight;
    props.item['groupIndex'] = 0;
    // props.item['groupIndexUpdateFunction'] = props.groupIndexUpsdateFunction;
    props.item['renderer'] = this;
    props.item['assignedListIndex'] = 0

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
    const roomBoxOffsetY = 0
    const verticalOffsetTitleLength = item.lineCount != undefined ? (item.lineCount * 19) : 19;
    const verticalOffsetLevel = (item.levelSpecial != undefined && item.levelSpecial == '1') ? 20 : 0

    const imageWidthArtistImagex1 = this.props.tileWidth / (1.3) * (160 / 305);
    const imageWidthArtistImagex2 = imageWidthArtistImagex1 * 0.7;

    const imageWidthArtistImage = this.props.tileWidth * (120 / 305)*0.9;
    const imageOffsetYArtistImage = 10 + ((305 - this.props.tileWidth) / (305 - 245)) * 10
    const imageOffsetXRArtistImage = -17;
    const imageOffsetXLArtistImage = -17;
    const fontSizeMainTitle = this.props.tileWidth * (12 / 305);
    // const fontSizeArtistName = this.props.tileWidth * (13 / 305)
    // const fontSizeMainTitle =20;
    const fontSizeArtistName =16;

    const reduceInnerTileHeightBy = 0;

    const timeTextFields = []
    const timeStringArray = item.time!=undefined?(item.time as string).toLowerCase().split('m'):[];
    for (let k = 0; k < timeStringArray.length; k++) {
      const s = timeStringArray[k]
      const charAmOrPm = s.charAt(s.length - 1);
      if (charAmOrPm != 'a' && charAmOrPm != 'p') {
        timeTextFields.push({ type: 'normal', str: s });
        continue;
      }
      timeTextFields.push({ type: 'normal', str: s.substring(0, s.length - 2) });
      timeTextFields.push({ type: 'high', str: (" "+s.substring(s.length - 1) + 'm') });
    }

    // console.log("ScheduleListItemType1 tileLength " + this.props.tileWidth + " artistImageWidth: "+ imageWidthArtistImage);

    return (
      <Animated.View
        style={[{
          position: 'absolute',
          left: this.props.tileOffsetLeft, top: this.props.tileOffsetTop,
          height: itemHeight, width: this.props.tileWidth,
          opacity:1.0
          // backgroundColor:'red',
        }]}
      >

        <View
          //  name={"ScheduleItemFrame1_" + item.id}
          style={{
            position: 'absolute',
            backgroundColor: '#517d97',
            borderColor: '#9F509F',
            // borderLeftWidth: 3,
            // borderRightWidth: 3,
            // borderLeftWidth: 3,
            // borderRightWidth: 3,
            borderTopWidth: 0,
            // borderBottomWidth: 3,
            opacity: 0.5,
            left: 0,
            top: roomBoxOffsetY,
            height: (itemHeight - reduceInnerTileHeightBy),
            width: this.props.tileWidth
          }}
        />



        <View
          // name={"ScheduleItemFrame2_" + item.id}
          style={{
            position: 'absolute',
            backgroundColor: 'transparent',
            borderColor: '#5e8099',
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
          <LText id='textTime' style={{
        position: 'absolute',
        top: -15, left: 10,
        width: 100, height: 15,
        fontFamily: 'DINNeuzeitGroteskStd-Light',
        // backgroundColor: 'skyblue',
        textAlign: 'left',
        color: '#ede8e3',
        fontSize: 11,
      }}>
         {(item.dateString as string).substring(0,4).toLocaleUpperCase()}
      </LText>
  <LText id='textTime' style={{
        position: 'absolute',
        top: -15, left: 40,
        width: 100, height: 15,
        fontFamily: 'DINNeuzeitGroteskStd-Light',
        // backgroundColor: 'skyblue',
        textAlign: 'left',
        color: '#ede8e3',
        fontSize: 15,
      }}>
        {
          timeTextFields.map((item, i) => {
            return (
              <LText 
                id={'textTime'+i}
                key={`textTime`+i}
                style={{
                  top: item.type == 'high' ? 6 : 10, margin: 2,
                  width: 70, height: 15,
                  fontFamily: 'DINNeuzeitGroteskStd-Light',
                  textAlign: 'left',
                  color: '#ede8e3',
                  fontSize: item.type == 'high' ? 8 : 12,
                }}>
                {item.str}
              </LText>
            )
          })
        }
      </LText>



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

          <Image
            source={require('../../../assets/schedulelistitem-bg-overlay.png')}
            style={{
              // backgroundColor: 'greenyellow',
              position: 'absolute',
              left: 0, top: 20,
              opacity: 0.2,
              width: this.props.tileWidth,
              height: itemHeight - reduceInnerTileHeightBy -20,
              resizeMode: 'cover'
            }}
          /> 

          <LComponent
            name={"ScheduleItemHighlight" + item.id}
            style={{
              backgroundColor: '#615a83',
            }}
            visualProperties={{ alpha: 0, x: 0, y: 0, h: (itemHeight - reduceInnerTileHeightBy), w: this.props.tileWidth}}
          />

          <Animated.Text allowFontScaling={false} id='textLocation' style={[{
            position: 'absolute',
            top: Platform.OS=='ios'?5:0,
            left: 200,
            width: this.props.tileWidth,
            fontFamily: 'DINCondensed-Regular',
            // backgroundColor: 'skyblue',
            textAlign: 'left',
            // fontFamily: 'DINNeuzeitGroteskStd-Light',
            // backgroundColor: 'red',
            color: '#ede8e3',
            fontSize: 15,
            letterSpacing: 0.0
          }, this.props.dynamicVisualProperties2]}>
            {(item.room as string).toLocaleUpperCase()}
          </Animated.Text>

          {/* <Animated.Image
            source={artistData1 ? artistData1.imgSrc : null}
            style={[{
              // backgroundColor: 'greenyellow',
              position: 'absolute',
              top: 2 + imageOffsetYArtistImage,
              right: (item.orientation == 'right' ? -imageOffsetXArtistImage : undefined),
              left: (item.orientation == 'left' ? -imageOffsetXArtistImage : undefined),
              width: imageWidthArtistImage, height: imageWidthArtistImage,
              resizeMode: 'cover'
            }, this.props.dynamicVisualProperties1]}
          /> */}


          <Animated.View
            style={this.props.dynamicVisualProperties1}>

          
            <Animated.Text allowFontScaling={false} id='textSessionMainTitle' style={{
              position: 'absolute',
              top: 30,
              right: (item.orientation == 'right' ? undefined : (4 + 35)),
              left: (item.orientation == 'left' ? undefined : (4 + 35)),
              width: 190,
              fontFamily: 'DINCondensed-Bold',
              // backgroundColor: 'indigo',
              textAlign: (item.orientation == 'right' ? 'left' : 'right'),
              color: '#fefefe',
              fontSize: (fontSizeMainTitle),
              opacity:1.0
            }}>
              {(item.sessionMainTitle as string).toLocaleUpperCase()}
            </Animated.Text>


            {/* <Text allowFontScaling={false} id='textSessionArtistName' style={{
              position: 'absolute',
              top: (47 + verticalOffsetTitleLength),
              right: (item.orientation == 'right' ? undefined : (4 + 35)),
              left: (item.orientation == 'left' ? undefined : (4 + 35)),
              height: fontSizeArtistName +4,
              width: 190,
              fontFamily: 'Cabin-Regular',
              letterSpacing: 2.0,
              fontSize: 13,
              // backgroundColor: 'indigo',
              textAlign: (item.orientation == 'right' ? 'left' : 'right'),
              color: '#e4a35e',
              // fontSize: (fontSizeArtistName),
            }}>
              {item.artistName ? (item.artistName as string).toLocaleUpperCase() : ""}
            </Text > */}

            {levelData[levelId] != undefined &&
              <>
                <Image
                  source={levelData[levelId].src}
                  style={{
                    // backgroundColor: 'greenyellow',
                    position: 'absolute',
                    top: (34 + verticalOffsetTitleLength),
                    right: (item.orientation == 'right' ? undefined : (levelData[levelId].textWidth + 40)),
                    left: (item.orientation == 'left' ? undefined : (levelData[levelId].textWidth + 38)),
                    width: levelImageSize*(105/33),
                    height: levelImageSize,
                    resizeMode: 'cover'
                  }}>
                </Image>

                <Text allowFontScaling={false} id='textSessionLevel' style={{
                  position: 'absolute',
                  top: (35 + verticalOffsetTitleLength - 1),
                  right: (item.orientation == 'right' ? undefined : (4 + 35)),
                  left: (item.orientation == 'left' ? undefined : (4 + 35)),
                  // height: levelImageSize,
                  width: (100 - 15),
                  fontFamily: 'Cabin-Regular',
                  letterSpacing: 1.2,
                  // opacity: 0.5,
                  // backgroundColor: 'indigo',
                  textAlign: (item.orientation == 'right' ? 'left' : 'right'),
                  color: '#232323',
                  fontSize: 8.5,
                }}>
                  {levelData[levelId].text}
                </Text >
              </>

            }

            <ScheduleItemToggle
              ref={(r) => { this.toggleButtonReference = r }}
              name={("ImageToggle" + item.id)}
              style={{
                // backgroundColor: 'indigo',
                position: 'absolute',
                right: (item.orientation == 'left' ? 7 : undefined),
                left: (item.orientation == 'right' ? (7) : undefined),
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

export default ArtistDetailsScheduleItem;