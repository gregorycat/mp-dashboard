import { connect } from 'react-redux';

import { AppCalendar } from './AppCalendar';

const mapStateToProps = (state, ownProps) => {

    return {  ...ownProps };
};

const mapDispatchToProps = {
 
};

const ConnectedAppCalendar = connect(mapStateToProps, mapDispatchToProps)(AppCalendar);

export { ConnectedAppCalendar as AppCalendar };