import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVisitor, defaultValue } from 'app/shared/model/visitor.model';

export const ACTION_TYPES = {
  FETCH_VISITOR_LIST: 'visitor/FETCH_VISITOR_LIST',
  FETCH_VISITOR: 'visitor/FETCH_VISITOR',
  CREATE_VISITOR: 'visitor/CREATE_VISITOR',
  UPDATE_VISITOR: 'visitor/UPDATE_VISITOR',
  DELETE_VISITOR: 'visitor/DELETE_VISITOR',
  RESET: 'visitor/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVisitor>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type VisitorState = Readonly<typeof initialState>;

// Reducer

export default (state: VisitorState = initialState, action): VisitorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VISITOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VISITOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_VISITOR):
    case REQUEST(ACTION_TYPES.UPDATE_VISITOR):
    case REQUEST(ACTION_TYPES.DELETE_VISITOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_VISITOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VISITOR):
    case FAILURE(ACTION_TYPES.CREATE_VISITOR):
    case FAILURE(ACTION_TYPES.UPDATE_VISITOR):
    case FAILURE(ACTION_TYPES.DELETE_VISITOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_VISITOR_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_VISITOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_VISITOR):
    case SUCCESS(ACTION_TYPES.UPDATE_VISITOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_VISITOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/visitors';

// Actions

export const getEntities: ICrudGetAllAction<IVisitor> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_VISITOR_LIST,
    payload: axios.get<IVisitor>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IVisitor> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VISITOR,
    payload: axios.get<IVisitor>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IVisitor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VISITOR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVisitor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VISITOR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVisitor> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VISITOR,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
