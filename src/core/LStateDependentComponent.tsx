
import React, { Component, PropsWithChildren } from 'react';

class StateDependentComponent extends Component<any,any> {
    _controllerReference = null;

    constructor(props:PropsWithChildren) {
        super(props);
    }

    render() {

        if (this.props['controller'] == undefined || this.props['states'] == undefined)
            return (<>{this.props['children']}</>);
            
        this._controllerReference = this.props['controller']
        if (!this._controllerReference.view.state.appIsInitialized)
            return (<></>);


        let validState = false;

        for (let i = 0; i < this.props['states'].length; i++) {
            if (this._controllerReference.context.state == this.props['states'][i]) {
                validState = true;
                // console.log('valid state');
                break;
            }
        }
        return (<>{validState ? this.props['children'] : null}</>)
    }
}

export default StateDependentComponent;