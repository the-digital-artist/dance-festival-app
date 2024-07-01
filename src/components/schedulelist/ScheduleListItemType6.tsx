import { PureComponent, ReactNode, createRef } from 'react';
import { Image, Pressable, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import DataModel from '../../DataModel';
import ActionItemFavToggleStateUpdate from '../../actions/ActionItemFavToggleStateUpdate';
import LComponent from '../../core/LComponent';
import TransitionLinkToArtistPage from '../../transitions/TransitionLinkToArtistPage';
import TransitionScheduleItemFavSelect from '../../transitions/TransitionScheduleItemFavSelect';
import ButtonSmall from '../ButtonSmall';
import ScheduleItemToggle from './ScheduleItemToggle';


class ScheduleListItemType6 extends PureComponent<any, any> {
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
    if (item.itemType != 'type6') return;

    const itemHeight = item.rowHeight != undefined ? item.rowHeight : 100;
    const artistData = DataModel.dataArtists[item.artistOne];
    const verticalOffsetTitleLength = item.lineCount != undefined ? (item.lineCount * 19) : 19;


    return (
      <Animated.View
        style={[{
          position: 'absolute',
          left: this.props.tileOffsetLeft, top: this.props.tileOffsetTop,
          height: itemHeight, width: this.props.tileWidth,
          opacity: 1,
        }, this.props.dynamicVisualProperties0]}
      >
        <LComponent
          name={"ScheduleItemFrame1_" + item.id}
          style={{
            backgroundColor: '#ffffff',
            borderColor: '#9F509F',
            borderLeftWidth: 3,
            borderRightWidth: 3,
            borderTopWidth: 0,
            borderBottomWidth: 3
          }}
          visualProperties={{ alpha: 0.68, x: 0, y: 20, h: (itemHeight - 30), w: this.props.tileWidth }}
        />

        <LComponent
          name={"ScheduleItemFrame2_" + item.id}
          style={{
            backgroundColor: 'transparent',
            borderColor: '#9F509F',
            borderLeftWidth: 3,
            borderRightWidth: 3,
            borderTopWidth: 20,
            borderBottomWidth: 0
          }}
          visualProperties={{ alpha: 1, x: 0, y: 20, h: (itemHeight - 30), w: this.props.tileWidth }}
        />




        <LComponent
          name={"ScheduleItemBoundary_" + item.id}
          style={{
            // backgroundColor: 'skyblue'
          }}
          visualProperties={{ alpha: 1, x: 0, y: 20, h: (itemHeight - 30), w: this.props.tileWidth }}
        >

          <Image
            source={require('../../../assets/sessionitem-frame.png')}
            style={{
              // backgroundColor: 'greenyellow',
              position: 'absolute',
              left: 3, top: 20,
              opacity: 0.1,
              width: this.props.tileWidth - 6, height: itemHeight - 50 - 3,
              resizeMode: 'repeat'
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
            fontFamily: 'RobotoCondensed-Medium',
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
              bottom: -38,
              right: (item.orientation == 'right' ? -25 : undefined),
              left: (item.orientation == 'left' ? -25 : undefined),
              width: 160, height: 160,
              resizeMode: 'cover'
            }, this.props.dynamicVisualProperties1]}
          />


          <Animated.View
            style={this.props.dynamicVisualProperties1}>



            <Text allowFontScaling={false} id='textSessionMainTitle' style={{
              position: 'absolute',
              top: 26,
              right: (item.orientation == 'right' ? undefined : (4 + 35)),
              left: (item.orientation == 'left' ? undefined : (4 + 35)),
              width: 170,
              fontFamily: 'LuckiestGuy-Regular',
              // backgroundColor: 'indigo',
              textAlign: (item.orientation == 'right' ? 'left' : 'right'),
              color: '#58503e',
              fontSize: 17,
            }}>
              {item.sessionMainTitle}
            </Text>


            <Text allowFontScaling={false} id='textSessionArtistName' style={{
              position: 'absolute',
              top: (26 + verticalOffsetTitleLength),
              right: (item.orientation == 'right' ? undefined : (4 + 35)),
              left: (item.orientation == 'left' ? undefined : (4 + 35)),
              height: 22, width: 300,
              fontFamily: 'Cabin-Regular',
              letterSpacing: 2.0,
              // backgroundColor: 'indigo',
              textAlign: (item.orientation == 'right' ? 'left' : 'right'),
              color: '#58503e',
              fontSize: 14,
            }}>
              {item.artistName ? (item.artistName as string).toLocaleUpperCase() : ""}
            </Text >


            <Pressable id='buttonCenter'
              style={{
                position: 'absolute',
                top: 30,
                left: 80,
                width: 270, height: 60,
              }}
              onPress={() => {
                // TransitionScreenL1toL2() 
              }}
            />


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
              onSelect={(newState) => { ActionItemFavToggleStateUpdate(this, newState) }}
              sourceOn={require('../../../assets/button-fav-on.png')}
              sourceOff={require('../../../assets/button-fav-off.png')}
            />

            {item.id != 'focus' &&

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
                  TransitionLinkToArtistPage(artistData)
                }}
              />
            }

          </Animated.View>
        </LComponent>
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

export default ScheduleListItemType6;