

import { createDrawerNavigator } from '@react-navigation/drawer';

const SideDrawerComponent = () => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home"
                component={ScheduleListWithDetailsStackView}
                options={{
                    title: 'Festival Program',
                    headerStyle: { backgroundColor: 'black' },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'RamaGothicEW01-Regular',
                        fontSize: 24,
                        color: '#febc11',
                    },
                    // headerTitle: (props) => <LogoTitle {...props} />
                }}
            />
            <Drawer.Screen name="Announcements" component={SideBar} />
        </Drawer.Navigator>
    );
}

export default SideDrawerComponent;