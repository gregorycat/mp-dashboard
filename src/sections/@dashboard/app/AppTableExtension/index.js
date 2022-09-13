import { connect } from 'react-redux';

import { AppTableExtension } from './AppTableExtension';

const mapStateToProps = (state, ownProps) => {
    return {  ...ownProps };
};

const mapDispatchToProps = {};

const ConnectedAppTableExtension = connect(mapStateToProps, mapDispatchToProps)(AppTableExtension);

export { ConnectedAppTableExtension as AppTableExtension };