import { Reducer } from 'redux';
import { UserActions } from '../actions/user.actions';
import { IUser } from '../api/IUser';

export interface IUserState {
    user?: IUser;
    fetching: boolean;
    fetchError: boolean;
}

const initialState: IUserState = {
    user: undefined,
    fetching: false,
    fetchError: false,
}

export const userReducer: Reducer = (oldState = initialState, action) => {
    switch (action.type) {
        case UserActions.USER_ACTION_START_FETCHING:
            return Object.assign({}, oldState, { fetching: true });

        case UserActions.USER_ACTION_DATA_ERROR:
            return Object.assign({}, oldState, { fetching: false, fetchError: true });

        case UserActions.USER_ACTION_DATA_RETRIEVED:
            return Object.assign({}, oldState, { fetching: false, user: action.payload });

        default:
            return oldState;
    }
};
