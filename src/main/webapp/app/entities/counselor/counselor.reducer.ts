import axios from 'axios';
import {ICrudDeleteAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction} from 'react-jhipster';

import {cleanEntity} from 'app/shared/util/entity-utils';
import {FAILURE, REQUEST, SUCCESS} from 'app/shared/reducers/action-type.util';

import {defaultValue, ICounselor} from 'app/shared/model/counselor.model';

export const ACTION_TYPES = {
  FETCH_COUNSELOR_LIST: 'counselor/FETCH_COUNSELOR_LIST',
  FETCH_COUNSELOR: 'counselor/FETCH_COUNSELOR',
  CREATE_COUNSELOR: 'counselor/CREATE_COUNSELOR',
  UPDATE_COUNSELOR: 'counselor/UPDATE_COUNSELOR',
  DELETE_COUNSELOR: 'counselor/DELETE_COUNSELOR',
  RESET: 'counselor/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICounselor>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CounselorState = Readonly<typeof initialState>;

// Reducer

export default (state: CounselorState = initialState, action): CounselorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COUNSELOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COUNSELOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COUNSELOR):
    case REQUEST(ACTION_TYPES.UPDATE_COUNSELOR):
    case REQUEST(ACTION_TYPES.DELETE_COUNSELOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_COUNSELOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COUNSELOR):
    case FAILURE(ACTION_TYPES.CREATE_COUNSELOR):
    case FAILURE(ACTION_TYPES.UPDATE_COUNSELOR):
    case FAILURE(ACTION_TYPES.DELETE_COUNSELOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_COUNSELOR_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COUNSELOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COUNSELOR):
    case SUCCESS(ACTION_TYPES.UPDATE_COUNSELOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COUNSELOR):
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

const apiUrl = 'api/counselors';

// Actions

export const getEntities: ICrudGetAllAction<ICounselor> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_COUNSELOR_LIST,
    payload: axios.get<ICounselor>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ICounselor> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COUNSELOR,
    payload: axios.get<ICounselor>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICounselor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COUNSELOR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICounselor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COUNSELOR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICounselor> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COUNSELOR,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
