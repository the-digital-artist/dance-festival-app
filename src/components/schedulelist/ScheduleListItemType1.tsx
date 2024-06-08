import { PureComponent, ReactNode, createRef } from 'react';
import { Image, View } from 'react-native';
import Animated from 'react-native-reanimated';
import DataModel from '../../DataModel';
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

    this.state = { dataItem: props.item };

  }


  render(): ReactNode {
    // console.log("ScheduleListItemType1 Render Function Called: " + this.state.dataItem.id);

    let item = this.state.dataItem;
    if (item.itemType != 'type1') return;

    let isNightPartyItem = false;
    if (item.artistOne == '') isNightPartyItem = true;

    const itemHeight = item.rowHeight != undefined ? item.rowHeight : 100;
    const roomBoxOffsetY = !isNightPartyItem?20:25;
    const artistData = DataModel.dataArtists[item.artistOne];
    const verticalOffsetTitleLength = item.lineCount != undefined ? (item.lineCount * 19) : 19;

    const imageWidthArtistImage = this.props.tileWidth * (160 / 305);
    const imageOffsetYArtistImage = ((305 - this.props.tileWidth) / (305 - 245)) * 10
    const fontSizeMainTitle = this.props.tileWidth * (17 / 305);
    const fontSizeArtistName = !isNightPartyItem?this.props.tileWidth * (13 / 305):this.props.tileWidth * (12 / 305);

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
            backgroundColor: '#ffffff',
            borderColor: '#9F509F',
            borderLeftWidth: 3,
            borderRightWidth: 3,
            borderTopWidth: 0,
            borderBottomWidth: 3,
            opacity: 0.68,
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
            borderColor: '#9F509F',
            borderLeftWidth: 3,
            borderRightWidth: 3,
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

          <Image
            source={require('../../../assets/sessionitem-frame.png')}
            style={{
              // backgroundColor: 'greenyellow',
              position: 'absolute',
              left: 3, top: roomBoxOffsetY,
              opacity: 0.1,
              width: this.props.tileWidth - 6, height: itemHeight - 50 - 3,
              resizeMode: 'contain'
            }}
          />

          <LComponent
            name={"ScheduleItemHighlight" + item.id}
            style={{
              backgroundColor: '#EF4260',
            }}
            visualProperties={{ alpha: 0, x: 3, y: 20, h: (itemHeight - 30 - 20 - 3), w: this.props.tileWidth - 6 }}
          />

          <Animated.Text allowFontScaling={false} id='textLocation' style={[{
            position: 'absolute',
            top: 1,
            left: (this.props.tileWidth - 60) / 2,
            // right: (item.orientation == 'right' ? undefined : 10),
            // left: (item.orientation == 'left' ? undefined : 10),
            height: 15,
            width: 60,
            fontFamily: 'Antonio-Regular',
            // backgroundColor: 'skyblue',
            textAlign: 'center',
            color: '#FFFFFF',
            fontSize: 12,
          }, this.props.dynamicVisualProperties2]}>
            {(item.room as string).toLocaleUpperCase()}
          </Animated.Text>

          <Animated.Image
            source={artistData ? artistData.imgSrc : null}
            style={[{
              // backgroundColor: 'greenyellow',
              position: 'absolute',
              top: -2 + imageOffsetYArtistImage,
              right: (item.orientation == 'right' ? -25 : undefined),
              left: (item.orientation == 'left' ? -20 : undefined),
              width: imageWidthArtistImage, height: imageWidthArtistImage,
              resizeMode: 'cover'
            }, this.props.dynamicVisualProperties1]}
          />


          <Animated.View
            style={this.props.dynamicVisualProperties1}>



            <Animated.Text allowFontScaling={false} id='textSessionMainTitle' style={{
              position: 'absolute',
              top: 26,
              right: (item.orientation == 'right' ? undefined : (4 + 35)),
              left: (item.orientation == 'left' ? undefined : (4 + 35)),
              width: 170,
              fontFamily: 'ArtBrush',
              // backgroundColor: 'indigo',
              textAlign: (item.orientation == 'right' ? 'left' : 'right'),
              color: '#58503e',
              fontSize: (fontSizeMainTitle),
            }}>
              {item.sessionMainTitle}
            </Animated.Text>


            <Animated.Text allowFontScaling={false} id='textSessionArtistName' style={{
              position: 'absolute',
              top: (26 + verticalOffsetTitleLength),
              right: (item.orientation == 'right' ? undefined : (4 + 35)),
              left: (item.orientation == 'left' ? undefined : (4 + 35)),
              height: (itemHeight - 30-(26 + verticalOffsetTitleLength)-10), 
              width: this.props.tileWidth-35-4-10,
              fontFamily: 'Cabin-Regular',
              letterSpacing: 2.0,
              // backgroundColor: 'indigo',
              textAlign: (item.orientation == 'right' ? 'left' : 'right'),
              color: '#58503e',
              fontSize: (fontSizeArtistName),
            }}>
              {item.artistName ? (item.artistName as string).toLocaleUpperCase() : ""}
            </Animated.Text >


            {/* <Pressable id='buttonCenter'
              style={{
                position: 'absolute',
                top: 30,
                left: 80,
                width: 270, height: 60,
              }}
              onPress={() => {
                // TransitionScreenL1toL2() 
              }}
            /> */}


            <ScheduleItemToggle
              ref={(r) => { this.toggleButtonReference = r }}
              name={("ImageToggle" + item.id)}
              style={{
                // backgroundColor: 'indigo',
                position: 'absolute',
                right: (item.orientation == 'left' ? 3 : undefined),
                left: (item.orientation == 'right' ? (3) : undefined),
                top: (27),
                width: 35, height: 35,
              }}
              initialCheckedState={this.state.dataItem.favoriteState}
              onSelect={(newState) => { 
                ActionItemFavToggleStateUpdate(this, newState) 
              }}
              sourceOn={require('../../../assets/button-fav-on.png')}
              sourceOff={require('../../../assets/button-fav-off.png')}
            />

            {(item.id != 'focus' && !isNightPartyItem) &&

              <ButtonSmall
                name={("artistButton")}
                source={null}
                style={{
                  position: 'absolute',
                  right: (item.orientation == 'right' ? undefined : (4 + 33)),
                  left: (item.orientation == 'left' ? undefined : (4 + 33)),
                  top: (46 + verticalOffsetTitleLength),
                  height: 23, width: 100,
                }}
                text={"ARTIST DETAILS"}
                bgBoxVisible={true}
                bgBoxStyle={{
                  backgroundColor: '#EF4260',
                  height: 23, width: 100
                }}
                fontStyle={{
                  width: 100,
                  fontFamily: 'Cabin-Regular',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  letterSpacing: 2.0,
                  color: '#FFFFFF',
                  fontSize: 8,
                }}
                visualProperties={{ alpha: 1 }}
                onSelect={() => {
                  if (artistData == undefined) return;
                  TransitionLinkToArtistPage(artistData)
                }}
              />
            }

            {/* {item.id != 'focus' &&

              <ButtonSmall
                name={("InfoButton" + item.id)}
                source={require('../../../assets/button-info.png')}
                style={{
                  position: 'absolute',
                  right: (item.orientation == 'right' ? undefined : (4 + 24)),
                  left: (item.orientation == 'left' ? undefined : (4 + 24)),
                  top: (42 + verticalOffsetTitleLength),
                  height: 35, width: (300 * 35 / 110),
                }}
                text={"VIEW DETAILS"}
                bgBoxStyle={{
                  height: 35, width: 100
                }}
                fontStyle={{
                  fontFamily: 'Cabin-Regular',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  letterSpacing: 2.0,
                  color: '#FFFFFF',
                  fontSize: 8,
                }}
                visualProperties={{ alpha: 1 }}
                onSelect={() => { ActionSetFocusItem(item); TransitionScheduleItemSelect(item) }}
              />
            } */}

          </Animated.View>

        </View>
        {/* <GestureDetector gesture={this.props.tileTapGestureHandler}>
          <Animated.View
            style={[
              {width:centerPieceWidth, height:itemHeight - 30},
             ]}
          />
          </GestureDetector> */}


        {item.id != 'focus' && false &&
          <>
            {/* <ButtonSmall
              name={"BtnScrollLeft" + item.id}
              style={{
                position: 'absolute',
                left: (45 + 2), top: 70,
                width: 32, height: 28,
                opacity: (item.groupIndex > 0 ? 1 : 0.1)
              }}
              visualProperties={{ x: 0, y: 0, z: 0 }}
              onSelect={() => { if (item.groupIndex > 0) item.groupIndexUpdateFunction(1) }}
              source={require('../../../assets/button-prev.png')}
            /> */}
            {/* 
            <ButtonSmall
              name={"BtnScrollRight" + item.id}
              style={{
                position: 'absolute',
                left: (45 + 35 + this.props.tileWidth + 2), top: 70,
                width: 32, height: 28,
                opacity: (item.groupIndex < (this.props.group.length - 1) ? 1 : 0.1)
              }}
              visualProperties={{ x: 0, y: 0, z: 0 }}
              onSelect={() => { if (item.groupIndex < (this.props.group.length - 1)) item.groupIndexUpdateFunction(-1) }}
              source={require('../../../assets/button-next.png')}
            /> */}
          </>
        }
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