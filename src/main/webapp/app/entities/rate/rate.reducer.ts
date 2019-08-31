import axios from 'axios';
import {ICrudDeleteAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction} from 'react-jhipster';

import {cleanEntity} from 'app/shared/util/entity-utils';
import {FAILURE, REQUEST, SUCCESS} from 'app/shared/reducers/action-type.util';

import {defaultValue, IRate} from 'app/shared/model/rate.model';

export const ACTION_TYPES = {
  FETCH_RATE_LIST: 'rate/FETCH_RATE_LIST',
  FETCH_RATE: 'rate/FETCH_RATE',
  CREATE_RATE: 'rate/CREATE_RATE',
  UPDATE_RATE: 'rate/UPDATE_RATE',
  DELETE_RATE: 'rate/DELETE_RATE',
  RESET: 'rate/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRate>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type RateState = Readonly<typeof initialState>;

// Reducer

export default (state: RateState = initialState, action): RateState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RATE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RATE):
    case REQUEST(ACTION_TYPES.UPDATE_RATE):
    case REQUEST(ACTION_TYPES.DELETE_RATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_RATE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RATE):
    case FAILURE(ACTION_TYPES.CREATE_RATE):
    case FAILURE(ACTION_TYPES.UPDATE_RATE):
    case FAILURE(ACTION_TYPES.DELETE_RATE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_RATE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_RATE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RATE):
    case SUCCESS(ACTION_TYPES.UPDATE_RATE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RATE):
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

const apiUrl = 'api/rates';

// Actions

export const getEntities: ICrudGetAllAction<IRate> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RATE_LIST,
    payload: axios.get<IRate>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IRate> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RATE,
    payload: axios.get<IRate>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RATE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RATE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRate> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RATE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
