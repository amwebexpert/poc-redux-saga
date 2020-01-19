import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
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
        const middlewares = [logger, sagaMiddleware];

        // Reducers
        const reducers = combineReducers({
            user: userReducer,
        });

        // Store with sagas
        const composeEnhancers =
            typeof window === 'object' &&
                (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
                (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
        const storeInstance = createStore(reducers, {}, composeEnhancers(applyMiddleware(...middlewares)));
        sagaMiddleware.run(rootSaga);

        return storeInstance;
    }
}

export const store = new StoreFactory().init();
