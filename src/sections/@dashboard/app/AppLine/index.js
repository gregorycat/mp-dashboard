import { connect } from 'react-redux';

import { AppLine } from './AppLine';

const mapStateToProps = (state, ownProps) => {

    return {  ...ownProps };
};

const mapDispatchToProps = {
 
};

const ConnectedAppLine = connect(mapStateToProps, mapDispatchToProps)(AppLine);

export { ConnectedAppLine as AppLine };