import axios from 'axios';
import { AnyAction } from 'redux';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { UserActions } from './../actions/user.actions';

// Moved api call into own function (for easy test swapping)
export function fetchFromApi(userId: number) {
    return axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action: AnyAction) {
    yield put({ type: UserActions.USER_ACTION_START_FETCHING });
    yield delay(2000);

    try {
        const response = yield call(fetchFromApi, action.payload);
        yield put({ type: UserActions.USER_ACTION_DATA_RETRIEVED, payload: response.data });
    } catch (e) {
        console.log('Error occured', e);
        yield put({ type: UserActions.USER_ACTION_DATA_ERROR });
    }
}

/*
  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
export function* rootSaga() {
    yield takeLatest(UserActions.USER_FETCH_REQUESTED, fetchUser);
}
