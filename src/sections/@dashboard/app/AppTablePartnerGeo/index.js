import { connect } from 'react-redux';

import { AppTablePartnerGeo } from './AppTablePartnerGeo';

const mapStateToProps = (state, ownProps) => {

    return {  ...ownProps };
};

const mapDispatchToProps = {
 
};

const ConnectedAppTablePartnerGeo = connect(mapStateToProps, mapDispatchToProps)(AppTablePartnerGeo);

export { ConnectedAppTablePartnerGeo as AppTablePartnerGeo };