import DataModel from "../../DataModel";
import LComponent from "../../core/LComponent";
import ButtonSmall from "../ButtonSmall";

class ProfileScreen extends LComponent {

    constructor(props) {
        super(props);
        this.state = { expanded: false};
    }

    render() {
        let userDataIndexLoggedIn = DataModel.getInstance().dyn_userManagement.userDataIndexLoggedIn
        let userData = DataModel.getInstance().dyn_userManagement.userData


        return (
            <>
            {userDataIndexLoggedIn != -1 &&
                <ButtonSmall
                    name='userIconLoggedIn'
                    style={{
                        position: 'absolute',
                        top: 80, right: 30,
                        width: 60, height: 60,
                        opacity: 0.7
                    }}
                    visualProperties={{ alpha: 1,  x: 0, y: 0, z: 0 }}
                    onSelect={() => { }}
                    source={userData[userDataIndexLoggedIn].imgSrc}
                />
            }
            </>

        );
    }

}

export default ProfileScreen;