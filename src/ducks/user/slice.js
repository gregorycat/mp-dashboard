import { createSlice } from '@reduxjs/toolkit'


export const initialState = {
    isLoginLoading: false,
    cellUrl: undefined,
    connectedUser: {
        name: undefined,
        lastName: undefined,
        email: undefined,
        token: undefined,
        refreshToken: undefined
    },
};

const { actions, reducer } = createSlice({
    name: 'users',
    initialState,
    reducers: {
        //Login loading
        setIsLoadingLogin: (state, action) => {
            const { payload } = action;
            const { loading } = payload;

            state.isLoginLoading = loading;
        },
        // Set user token
        setUserToken: (state, action) => {
            const { payload: user } = action;
            state.connectedUser.token = user.token;
            state.connectedUser.refreshToken = user.refreshToken;
            state.cellUrl= user.cellUrl;
        },
        //Set user info
        setUserInfo: (state, action) => {
            const { payload: user} = action;
            state.connectedUser.name = user.firstName;
            state.connectedUser.lastname = user.lastName;
            state.connectedUser.displayName = `${user.firstName} ${user.lastName}`;
            state.connectedUser.email = user.email;
        },
    }
});

export { actions, reducer };