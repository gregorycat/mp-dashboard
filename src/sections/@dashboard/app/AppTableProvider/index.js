import { connect } from 'react-redux';

import { userTokenSelector, } from 'src/ducks/user/selector';
import { AppTableProvider } from './AppTableProvider';

const mapStateToProps = (state, ownProps) => {
    const token = userTokenSelector(state);

    return { token, ...ownProps }
};

const mapDispatchToProps = {};

const ConnectedAppTableProvider = connect(mapStateToProps, mapDispatchToProps)(AppTableProvider);

export { ConnectedAppTableProvider as AppTableProvider };