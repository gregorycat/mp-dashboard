import { createSelector } from 'reselect';

const userSelector = (state) => state.user;

export const loginLoadingSelector = createSelector([userSelector], (user) => user.isLoginLoading );

export const cellUrlSelector = createSelector([userSelector], (user) => user.cellUrl );

export const connectedUserSelector = createSelector([userSelector], (user) => user.connectedUser );

export const userTokenSelector = createSelector([connectedUserSelector], (connectedUser) => connectedUser.token );