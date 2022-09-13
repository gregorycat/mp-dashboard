import { connect } from 'react-redux';
import { partnerListSelector, versionsSelector } from 'src/ducks/extensions/selector';
import { loadPartnerVersions } from 'src/ducks/extensions/thunk';
import { userTokenSelector, } from 'src/ducks/user/selector';

import { Partner } from './Partner';

const mapStateToProps = (state, ownProps) => {
    const partnersList = partnerListSelector(state);
    const token = userTokenSelector(state);
    const { isLoading: isVersionsLoading} = versionsSelector(state);

    return { partnersList, token, isVersionsLoading, ...ownProps };
};

const mapDispatchToProps = {
    loadPartnerVersions,
};

const ConnectedPartner = connect(mapStateToProps, mapDispatchToProps)(Partner);

export { ConnectedPartner as Partner };