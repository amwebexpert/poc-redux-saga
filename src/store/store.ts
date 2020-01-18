import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { IUserState, userReducer } from '../reducers/user.reducer';
import { rootSaga } from '../sagas/sagas';

export interface IApplicationState {
    user: IUserState,
    localeCode: string;
}

class StoreFactory {
    public init(): Store {
        // Middlewares
        const logger = createLogger({/** ...options */ });
        const sagaMiddleware = createSagaMiddleware();

        // Reducers
        const reducers = combineReducers({
            user: userReducer
        });

        // Store with sagas
        const storeInstance = createStore(reducers, {}, applyMiddleware(logger, sagaMiddleware));
        sagaMiddleware.run(rootSaga);

        return storeInstance;
    }
}

export const store = new StoreFactory().init();
