import axios from 'axios';
import {ICrudDeleteAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction} from 'react-jhipster';

import {cleanEntity} from 'app/shared/util/entity-utils';
import {FAILURE, REQUEST, SUCCESS} from 'app/shared/reducers/action-type.util';

import {defaultValue, IReseume} from 'app/shared/model/reseume.model';

export const ACTION_TYPES = {
  FETCH_RESEUME_LIST: 'reseume/FETCH_RESEUME_LIST',
  FETCH_RESEUME: 'reseume/FETCH_RESEUME',
  CREATE_RESEUME: 'reseume/CREATE_RESEUME',
  UPDATE_RESEUME: 'reseume/UPDATE_RESEUME',
  DELETE_RESEUME: 'reseume/DELETE_RESEUME',
  RESET: 'reseume/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IReseume>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ReseumeState = Readonly<typeof initialState>;

// Reducer

export default (state: ReseumeState = initialState, action): ReseumeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RESEUME_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RESEUME):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RESEUME):
    case REQUEST(ACTION_TYPES.UPDATE_RESEUME):
    case REQUEST(ACTION_TYPES.DELETE_RESEUME):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_RESEUME_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RESEUME):
    case FAILURE(ACTION_TYPES.CREATE_RESEUME):
    case FAILURE(ACTION_TYPES.UPDATE_RESEUME):
    case FAILURE(ACTION_TYPES.DELETE_RESEUME):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESEUME_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESEUME):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RESEUME):
    case SUCCESS(ACTION_TYPES.UPDATE_RESEUME):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RESEUME):
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

const apiUrl = 'api/reseumes';

// Actions

export const getEntities: ICrudGetAllAction<IReseume> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RESEUME_LIST,
    payload: axios.get<IReseume>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IReseume> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RESEUME,
    payload: axios.get<IReseume>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IReseume> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RESEUME,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IReseume> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RESEUME,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IReseume> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RESEUME,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
