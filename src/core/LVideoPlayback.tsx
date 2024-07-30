import { ResizeMode, Video } from "expo-av";
import { PureComponent } from "react";

class LVideoPlayback extends PureComponent<any, any> {

    videoRef = null;
    videoPlayer = null;

    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false,
        }


    }

    render() {
        return (
            <>
                <Video
                    ref={(c) => this.videoRef = c}
                    style={[this.props.style, {
                        position: 'absolute',
                    }]}
                    source={this.props.videoSrc}
                    usePoster={true}
                    posterSource={this.props.posterSource}
                    shouldPlay={this.props.shouldPlay}
                    useNativeControls={false}
                    resizeMode={ResizeMode.COVER}
                    isLooping={false}
                    progressUpdateIntervalMillis={500}
                    rate={1}
                    onPlaybackStatusUpdate={(u) => { }}
                />
            </>
        );
    }
}

export default LVideoPlayback;