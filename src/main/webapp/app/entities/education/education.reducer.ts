import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEducation, defaultValue } from 'app/shared/model/education.model';

export const ACTION_TYPES = {
  FETCH_EDUCATION_LIST: 'education/FETCH_EDUCATION_LIST',
  FETCH_EDUCATION: 'education/FETCH_EDUCATION',
  CREATE_EDUCATION: 'education/CREATE_EDUCATION',
  UPDATE_EDUCATION: 'education/UPDATE_EDUCATION',
  DELETE_EDUCATION: 'education/DELETE_EDUCATION',
  RESET: 'education/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEducation>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type EducationState = Readonly<typeof initialState>;

// Reducer

export default (state: EducationState = initialState, action): EducationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EDUCATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EDUCATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EDUCATION):
    case REQUEST(ACTION_TYPES.UPDATE_EDUCATION):
    case REQUEST(ACTION_TYPES.DELETE_EDUCATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EDUCATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EDUCATION):
    case FAILURE(ACTION_TYPES.CREATE_EDUCATION):
    case FAILURE(ACTION_TYPES.UPDATE_EDUCATION):
    case FAILURE(ACTION_TYPES.DELETE_EDUCATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EDUCATION_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EDUCATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EDUCATION):
    case SUCCESS(ACTION_TYPES.UPDATE_EDUCATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EDUCATION):
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

const apiUrl = 'api/educations';

// Actions

export const getEntities: ICrudGetAllAction<IEducation> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_EDUCATION_LIST,
    payload: axios.get<IEducation>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IEducation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EDUCATION,
    payload: axios.get<IEducation>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEducation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EDUCATION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEducation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EDUCATION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEducation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EDUCATION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
