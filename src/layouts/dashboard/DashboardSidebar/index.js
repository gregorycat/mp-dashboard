import { connect } from 'react-redux';

import { getUserInfo } from 'src/ducks/user/thunk';
import { connectedUserSelector, userTokenSelector, cellUrlSelector } from 'src/ducks/user/selector';
import { DashboardSidebar } from './DashboardSidebar';

const mapStateToProps = (state, ownProps) => {
    const connectedUser = connectedUserSelector(state);
    const token = userTokenSelector(state);
    const baseUrl = cellUrlSelector(state);

    return { connectedUser, token, baseUrl, ...ownProps };
};

const mapDispatchToProps = {
    getUserInfo,
};

const ConnectedDashboardSidebar = connect(mapStateToProps, mapDispatchToProps)(DashboardSidebar);

export { ConnectedDashboardSidebar as DashboardSidebar };