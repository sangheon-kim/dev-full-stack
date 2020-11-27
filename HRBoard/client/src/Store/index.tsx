import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension" // 리덕스 개발자 도구
import createSagaMiddleware from "redux-saga";
import { rootReducer, rootSaga } from "./roots";

const _isEnv:boolean = process.env.NODE_ENV === 'development';
export const sagaMiddleware  = createSagaMiddleware();

const _enhancer = _isEnv 
                ? composeWithDevTools(applyMiddleware(sagaMiddleware)) // 개발 모드
                : applyMiddleware(sagaMiddleware); // 상용 모드의 경우 리덕스 개발자도구를 숨기는 것이 좋다.

                
export const store = createStore(rootReducer, _enhancer);

sagaMiddleware.run(rootSaga);