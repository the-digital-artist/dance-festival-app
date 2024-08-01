

const ActionOnSessionSelection = (refToggleCurrent, refToggleOther, refItemPartCurrent, refItemPartOther, state = null) => {
    // console.log('ActionOnSessionSelection");

    if(state!=null) {
        refToggleCurrent.current.updateToggleState(state)
        refToggleCurrent.current.updateVisibilityState(state);
        refItemPartCurrent.current.updateHighlightState(state);

        if (state == true) {
            refToggleOther.current.updateToggleState(false);
            refToggleOther.current.updateVisibilityState(false);
            refItemPartOther.current.updateHighlightState(false);
        }
        return;
    }

    if(!refToggleCurrent.current.state.isVisble) return;

    let newState = !refToggleCurrent.current.state.isChecked
    refToggleCurrent.current.updateToggleState(newState)
    refItemPartCurrent.current.updateHighlightState(newState)

    if (newState == true) {
        refToggleOther.current.updateToggleState(false);
        refToggleOther.current.updateVisibilityState(false);
        refItemPartOther.current.updateHighlightState(false);
    }

    if (newState == false) {
        refToggleOther.current.updateVisibilityState(true);
    }
}

export default ActionOnSessionSelection;