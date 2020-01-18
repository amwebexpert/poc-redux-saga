import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { IUserState, userReducer } from '../reducers/user.reducer';

const logger = createLogger({
    // ...options
});

export interface IApplicationState {
    user: IUserState,
    localeCode: string;
}

class StoreFactory {
    public init(): Store {
        const reducers = combineReducers({
            user: userReducer
        });

        const storeInstance = createStore(reducers, {}, applyMiddleware(logger, thunk));
        storeInstance.subscribe(
            () => console.log('Store updated. New state:', storeInstance.getState())
        );

        return storeInstance;
    }
}

export const store = new StoreFactory().init();
