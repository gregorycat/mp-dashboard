import { connect } from 'react-redux';
import { extensionListSelector, versionsSelector, reviewsSelector } from 'src/ducks/extensions/selector';
import { loadExtensionVersions, loadExtensionReview } from 'src/ducks/extensions/thunk';
import { userTokenSelector, } from 'src/ducks/user/selector';

import { Extension } from './Extension';

const mapStateToProps = (state, ownProps) => {
    const extensionList = extensionListSelector(state);
    const token = userTokenSelector(state);
    const { isLoading: isVersionsLoading} = versionsSelector(state)
    const { isLoading: isReviewsLoading} = reviewsSelector(state)

    return { extensionList, isVersionsLoading, isReviewsLoading, token, ...ownProps };
};

const mapDispatchToProps = {
    loadExtensionVersions,
    loadExtensionReview
};

const ConnectedExtension = connect(mapStateToProps, mapDispatchToProps)(Extension);

export { ConnectedExtension as Extension };