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
     
      </>
    );
  }

}

export default ScheduleListItemType6;