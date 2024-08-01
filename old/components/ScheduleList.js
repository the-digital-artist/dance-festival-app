

import { Button, SectionList } from 'react-native';
import ScheduleListItem from './ScheduleListItem';
import ScheduleSectionItemRenderer from './ScheduleSectionItemRenderer';

const ScheduleList = (props) => {
    // console.log("ScheduleList:\n\n");
    // console.log(JSON.stringify( props.dataModel, null, 2));

    // const ScheduleListItemWrapper= ({ item }) => { return new ScheduleListItem().render({item}) }

    return (
        <SectionList 
            style={props.style}
            sections={props.dataModel}
            renderItem={ScheduleListItem}
            renderSectionHeader={ScheduleSectionItemRenderer}
            keyExtractor={item => `basicListEntry-${item.session1.id}`}
        />
    )
};

export default ScheduleList;