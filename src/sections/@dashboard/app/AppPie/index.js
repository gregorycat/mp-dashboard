import { connect } from 'react-redux';

import { AppPie } from './AppPie';

const mapStateToProps = (state, ownProps) => {

    return {  ...ownProps };
};

const mapDispatchToProps = {
 
};

const ConnectedAppPie = connect(mapStateToProps, mapDispatchToProps)(AppPie);

export { ConnectedAppPie as AppPie };