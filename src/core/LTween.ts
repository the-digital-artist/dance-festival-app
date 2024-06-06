class Tween {
    
    componentName = "";
    duration = 0;
    properties = {};
    componentReference = null;

    delay = 0;
    onComplete = null;

    constructor(componentName, duration, properties, componentReference = null) {
        this.componentName = componentName;
        this.duration = duration;
        this.properties = properties;
        this.componentReference = componentReference;
    }
}


export default Tween;