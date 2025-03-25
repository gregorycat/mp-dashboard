import { connect } from 'react-redux';

import { AppGeoMap } from './AppGeoMap';

const mapStateToProps = (state, ownProps) => {

    return {  ...ownProps };
};

const mapDispatchToProps = {
 
};

const ConnectedAppGeoMap = connect(mapStateToProps, mapDispatchToProps)(AppGeoMap);

export { ConnectedAppGeoMap as AppGeoMap };