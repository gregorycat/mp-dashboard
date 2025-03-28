import { connect } from 'react-redux';

import { loadAllPartners } from 'src/ducks/extensions/thunk';
import { partnersSelector, partnerListSelector} from 'src/ducks/extensions/selector';
import { userTokenSelector, } from 'src/ducks/user/selector';
import { AppTableExtension } from './AppTableExtension';

const mapStateToProps = (state, ownProps) => {
    const partnersList = partnerListSelector(state);
    const { isLoading: isPartnersLoading} = partnersSelector(state); 
    const token = userTokenSelector(state);

    return { partnersList, isPartnersLoading, token, ...ownProps }
};

const mapDispatchToProps = {
    loadAllPartners,
};

const ConnectedAppTableExtension = connect(mapStateToProps, mapDispatchToProps)(AppTableExtension);

export { ConnectedAppTableExtension as AppTableExtension };