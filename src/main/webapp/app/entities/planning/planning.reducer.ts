import axios from 'axios';
import {ICrudDeleteAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction} from 'react-jhipster';

import {cleanEntity} from 'app/shared/util/entity-utils';
import {FAILURE, REQUEST, SUCCESS} from 'app/shared/reducers/action-type.util';

import {defaultValue, IPlanning} from 'app/shared/model/planning.model';

export const ACTION_TYPES = {
  FETCH_PLANNING_LIST: 'planning/FETCH_PLANNING_LIST',
  FETCH_PLANNING: 'planning/FETCH_PLANNING',
  CREATE_PLANNING: 'planning/CREATE_PLANNING',
  UPDATE_PLANNING: 'planning/UPDATE_PLANNING',
  DELETE_PLANNING: 'planning/DELETE_PLANNING',
  RESET: 'planning/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPlanning>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PlanningState = Readonly<typeof initialState>;

// Reducer

export default (state: PlanningState = initialState, action): PlanningState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PLANNING_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PLANNING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PLANNING):
    case REQUEST(ACTION_TYPES.UPDATE_PLANNING):
    case REQUEST(ACTION_TYPES.DELETE_PLANNING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PLANNING_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PLANNING):
    case FAILURE(ACTION_TYPES.CREATE_PLANNING):
    case FAILURE(ACTION_TYPES.UPDATE_PLANNING):
    case FAILURE(ACTION_TYPES.DELETE_PLANNING):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLANNING_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLANNING):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PLANNING):
    case SUCCESS(ACTION_TYPES.UPDATE_PLANNING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PLANNING):
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

const apiUrl = 'api/plannings';

// Actions

export const getEntities: ICrudGetAllAction<IPlanning> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PLANNING_LIST,
    payload: axios.get<IPlanning>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IPlanning> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PLANNING,
    payload: axios.get<IPlanning>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPlanning> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PLANNING,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPlanning> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PLANNING,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPlanning> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PLANNING,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
