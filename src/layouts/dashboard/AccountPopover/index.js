import { connect } from 'react-redux';

import { getUserInfo } from 'src/ducks/user/thunk';
import { connectedUserSelector, userTokenSelector, cellUrlSelector } from 'src/ducks/user/selector';
import { AccountPopover } from './AccountPopover';

const mapStateToProps = (state) => {
    const connectedUser = connectedUserSelector(state);
    const token = userTokenSelector(state);
    const baseUrl = cellUrlSelector(state);

    return { connectedUser, token, baseUrl };
};

const mapDispatchToProps = {
    getUserInfo,
};

const ConnectedAccountPopover = connect(mapStateToProps, mapDispatchToProps)(AccountPopover);

export { ConnectedAccountPopover as AccountPopover };