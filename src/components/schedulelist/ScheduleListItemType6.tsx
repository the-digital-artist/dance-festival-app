import { PureComponent, ReactNode, createRef } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';


class ScheduleListItemType6 extends PureComponent<any, any> {
  toggleButtonReference: any = createRef();

  constructor(props) {
    super(props)
    props.item['assignedListIndex'] = props.assignedListIndex
  }


  render(): ReactNode {
    console.log("ScheduleListItemType6 Render Function Called");
    let item = this.props.item;

    return (
      <>
        <View
          style={{
            position:'absolute',
            width: Dimensions.get('screen').width,
            height: item.itemHeight-10,
            opacity: 0.3,
            backgroundColor: '#e8b18c',

          }}
        />
        {/* <Image source={require('../../../assets/schedule-dynwave.png')}
          style={{
            position:'absolute',
            width: Dimensions.get('screen').width,
            opacity: 0.3,
            height: item.itemHeight-10,
            backgroundColor: '#d5b0b4'
          }}
        /> */}

        <Text allowFontScaling={false} id='textSessionCategoryAndRoom' style={{
          position: 'absolute',
          top: 7,
          left: 0,
          fontFamily: 'Cabin-Regular',
          letterSpacing: 1.2,
          opacity: 1.0,
          padding: 2,
          // backgroundColor: '#e8b18c',
          width: Dimensions.get('screen').width,
          textAlign: 'left',
          color: '#232323',
          fontSize: 15,
        }}>
          {item.sessionMainTitle.toLocaleUpperCase()}
        </Text >
      </>
    );
  }

}

export default ScheduleListItemType6;