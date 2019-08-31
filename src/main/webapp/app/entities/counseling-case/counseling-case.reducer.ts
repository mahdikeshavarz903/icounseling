import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICounselingCase, defaultValue } from 'app/shared/model/counseling-case.model';

export const ACTION_TYPES = {
  FETCH_COUNSELINGCASE_LIST: 'counselingCase/FETCH_COUNSELINGCASE_LIST',
  FETCH_COUNSELINGCASE: 'counselingCase/FETCH_COUNSELINGCASE',
  CREATE_COUNSELINGCASE: 'counselingCase/CREATE_COUNSELINGCASE',
  UPDATE_COUNSELINGCASE: 'counselingCase/UPDATE_COUNSELINGCASE',
  DELETE_COUNSELINGCASE: 'counselingCase/DELETE_COUNSELINGCASE',
  RESET: 'counselingCase/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICounselingCase>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CounselingCaseState = Readonly<typeof initialState>;

// Reducer

export default (state: CounselingCaseState = initialState, action): CounselingCaseState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COUNSELINGCASE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COUNSELINGCASE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COUNSELINGCASE):
    case REQUEST(ACTION_TYPES.UPDATE_COUNSELINGCASE):
    case REQUEST(ACTION_TYPES.DELETE_COUNSELINGCASE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_COUNSELINGCASE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COUNSELINGCASE):
    case FAILURE(ACTION_TYPES.CREATE_COUNSELINGCASE):
    case FAILURE(ACTION_TYPES.UPDATE_COUNSELINGCASE):
    case FAILURE(ACTION_TYPES.DELETE_COUNSELINGCASE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_COUNSELINGCASE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COUNSELINGCASE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COUNSELINGCASE):
    case SUCCESS(ACTION_TYPES.UPDATE_COUNSELINGCASE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COUNSELINGCASE):
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

const apiUrl = 'api/counseling-cases';

// Actions

export const getEntities: ICrudGetAllAction<ICounselingCase> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_COUNSELINGCASE_LIST,
    payload: axios.get<ICounselingCase>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ICounselingCase> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COUNSELINGCASE,
    payload: axios.get<ICounselingCase>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICounselingCase> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COUNSELINGCASE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICounselingCase> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COUNSELINGCASE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICounselingCase> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COUNSELINGCASE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
