import axios from 'axios';
import {ICrudDeleteAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction} from 'react-jhipster';

import {cleanEntity} from 'app/shared/util/entity-utils';
import {FAILURE, REQUEST, SUCCESS} from 'app/shared/reducers/action-type.util';

import {defaultValue, ITimeReserved} from 'app/shared/model/time-reserved.model';

export const ACTION_TYPES = {
  FETCH_TIMERESERVED_LIST: 'timeReserved/FETCH_TIMERESERVED_LIST',
  FETCH_TIMERESERVED: 'timeReserved/FETCH_TIMERESERVED',
  CREATE_TIMERESERVED: 'timeReserved/CREATE_TIMERESERVED',
  UPDATE_TIMERESERVED: 'timeReserved/UPDATE_TIMERESERVED',
  DELETE_TIMERESERVED: 'timeReserved/DELETE_TIMERESERVED',
  RESET: 'timeReserved/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITimeReserved>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TimeReservedState = Readonly<typeof initialState>;

// Reducer

export default (state: TimeReservedState = initialState, action): TimeReservedState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TIMERESERVED_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIMERESERVED):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TIMERESERVED):
    case REQUEST(ACTION_TYPES.UPDATE_TIMERESERVED):
    case REQUEST(ACTION_TYPES.DELETE_TIMERESERVED):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TIMERESERVED_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIMERESERVED):
    case FAILURE(ACTION_TYPES.CREATE_TIMERESERVED):
    case FAILURE(ACTION_TYPES.UPDATE_TIMERESERVED):
    case FAILURE(ACTION_TYPES.DELETE_TIMERESERVED):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIMERESERVED_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIMERESERVED):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIMERESERVED):
    case SUCCESS(ACTION_TYPES.UPDATE_TIMERESERVED):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIMERESERVED):
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

const apiUrl = 'api/time-reserveds';

// Actions

export const getEntities: ICrudGetAllAction<ITimeReserved> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TIMERESERVED_LIST,
    payload: axios.get<ITimeReserved>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ITimeReserved> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIMERESERVED,
    payload: axios.get<ITimeReserved>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITimeReserved> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIMERESERVED,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITimeReserved> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIMERESERVED,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITimeReserved> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIMERESERVED,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
