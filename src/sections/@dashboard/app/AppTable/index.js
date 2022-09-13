import { connect } from 'react-redux';

import { AppTable } from './AppTable';

const mapStateToProps = (state, ownProps) => {

    return {  ...ownProps };
};

const mapDispatchToProps = {
 
};

const ConnectedAppTable = connect(mapStateToProps, mapDispatchToProps)(AppTable);

export { ConnectedAppTable as AppTable };