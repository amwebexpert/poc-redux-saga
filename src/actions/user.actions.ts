import axios, { AxiosError, AxiosResponse } from 'axios';

export enum UserActions {
    USER_ACTION_START_FETCHING = 'USER_ACTION_START_FETCHING',
    USER_ACTION_DATA_RETRIEVED = 'USER_ACTION_DATA_RETRIEVED',
    USER_ACTION_DATA_ERROR = 'USER_ACTION_DATA_ERROR',
};

export const fetchUserAsync = () => {

    return (dispatch: any) => {
        dispatch({ type: UserActions.USER_ACTION_START_FETCHING });

        axios.get('https://jsonplaceholder.typicode.com/users/1')
            .then((response: AxiosResponse) => {
                console.dir(response);
                dispatch({ type: UserActions.USER_ACTION_DATA_RETRIEVED, payload: response.data });
            })
            .catch((e: AxiosError) => {
                console.log(e);
                dispatch({ type: UserActions.USER_ACTION_DATA_ERROR });
            });
    };

};
