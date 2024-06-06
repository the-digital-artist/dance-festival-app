import Eventl from "./LEventl";
import FocusModel from "./LFocusModel";
import OperatorInteraction from "./LOperatorInteraction";

class OperatorStates extends OperatorInteraction {
    //state management
    flow            =   null;     //holds the definition for overall interaction flow/state transitions
    context         =   null;     //context objects holds state
                        // context = {        
                        //     "view":  null, 
                        //     "state": "main" 
                        // }; 

    eventTypes      =   []; //initialized during setup, holds all event types
    changeWatchers  =   [];
    lastEvent       =    null;

    _view           =   null;
    _self           =   null;

    
    constructor() {
        super();
    }
    
    setup() {
        this._self= this;
        
        if (!this.flow || !this.context) return;
        
        if (this.context.view != this._view)
            this.context.view = this._view;
        
        //build events listener types
        var types = new Array();
        for (var i = 0; i < this.flow.length; i++) {
            for (var k = 0; k < this.flow[i].changes.length; k++) {
                var stateObjectTypes = 
                    (this.flow[i].changes[k].type instanceof Array ? this.flow[i].changes[k].type : [this.flow[i].changes[k].type]);
                for (var t = 0; t < stateObjectTypes.length; t++)
                    types.push(stateObjectTypes[t]);
            }
        }
        types.sort();
        this.eventTypes = types.filter(function (e, i, a) {
            return a.indexOf(e) == i;
        });
    }
    
    processEvent(e:Eventl) {
        this._self.lastEvent = e;
        console.log("OperatorState - event: "+e.type);
        this._self.update.call(this._self);
    }

    
    processUserInput(e) {
        this._self.lastEvent = e;
        this._self.update.call(this._self);
    }
    
    update() {
        for (var i = 0; i < this.flow.length; i++) {
            var s = this.flow[i];
            
            if (this.context["state"] == s["state"] || s["state"] == "global") {
                
                var q = s["changes"];
                
                for (var j = 0; j < q.length; j++) {
                    var stateChange = q[j];


                    //iterate through all events and then trigger the actions and transitions
                    var types = stateChange["type"] instanceof Array ? stateChange["type"] : [stateChange["type"]];

                    for (var u = 0; u < types.length; u++) {
                        if (types[u] != this.lastEvent.type)
                            continue;
                      
                        //guard is true?
                        var guardValue = true;
                        if (stateChange.hasOwnProperty("guard")) {
                            var f = stateChange["guard"];
                            var transtioner = this.context;
                            guardValue = f();
                        }
                        if (!guardValue)
                            continue;

                        if (stateChange.hasOwnProperty("transition") && stateChange["transition"] != null) {

                            for (var k = 0; k < stateChange["transition"].length; k++) {
                                (stateChange["transition"][k]).call(this.context, this.lastEvent);
                            }
                        }

                        if (stateChange.hasOwnProperty("actions") && stateChange["actions"] != null) {
                            for (var k2 = 0; k2 < stateChange["actions"].length; k2++) {
                                (stateChange["actions"][k2]).call(this.context);
                            }
                        }

                        if (stateChange.hasOwnProperty("focusActivate") && stateChange["focusActivate"] != null) {
                            var c = stateChange["focusActivate"][0];
                            FocusModel.instance.activate(this.view[c].controllers[0]);
                        }
                        if (stateChange.hasOwnProperty("focusDeactivate") && stateChange["focusDeactivate"] != null) {
                            var c2 = stateChange["focusDeactivate"];
                            FocusModel.instance.deactivate(this.view[c2].controllers[0]);
                        }


                        if (!stateChange.hasOwnProperty("newState"))
                            return;

                        let previousState = this.context["state"];
                        if (previousState == stateChange["newState"]) {
                            this.context["state"] = stateChange["newState"];
                            return;
                        }

                        if (s.hasOwnProperty("onLeave") && s["onLeave"] != null) {
                            for (k = 0; k < s["onLeave"].length; k++) {
                                (s["onLeave"][k]).call(this.context);
                            }
                        }

                        
                        console.log('StateManagement - old State: <'+this.context["state"]+'> new State: <'+stateChange["newState"]+">")
                 
                        this.context["state"] = stateChange["newState"];
                        this.stateChange(previousState, this.context["state"]);
                        // this.view.forceUpdate();

                        for (j = 0; j < this.flow.length; j++) {
                            s = this.flow[j];
                            if (this.context["state"] == s["state"]) {
                                if (s.hasOwnProperty("onEnter") && s["onEnter"] != null) {
                                    for (k = 0; k < s["onEnter"].length; k++) {
                                        (s["onEnter"][k]).call(this.context);
                                    }
                                }
                            }
                        }  
                        return;
                    }
                }
            }
        }
    }
    
    stateChange(oldState, newState): void {}

    get view() { return this._view ; }
    set view(v) { 
        // console.log("OperatorStates - setting view");
            if (this._view == v) return;
            this._view = v;
            this.setup();
            FocusModel.instance.availableViews.push(v);
            this.processUserInput(new Eventl("viewAttached"));
    }
}

export default OperatorStates;