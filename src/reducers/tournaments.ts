import { AnyAction } from "redux";
import { Tournament } from "../api/tournament.types"
import {
  TOURNAMENTS_GET_REQUEST,
  TOURNAMENTS_GET_FAILURE,
  TOURNAMENTS_GET_SUCCESS,
  TOURNAMENTS_PATCH_FAILURE,
  TOURNAMENTS_PATCH_SUCCESS,
  TOURNAMENTS_POST_FAILURE,
  TOURNAMENTS_POST_SUCCESS,
  TOURNAMENTS_DELETE_FAILURE,
  TOURNAMENTS_DELETE_SUCCESS
} from '../constants/action-names';
import {
  TournamentGetSuccessAction,
  TournamentPatchSuccessAction,
  TournamentPostSuccessAction,
  TournamentDeleteSuccessAction,
  StateArrayValue
} from './tournaments.types'

const initialState: StateArrayValue<Tournament> = {
  loading: false,
  data: [],
  error: ''
};

export default function tournaments(
  state: StateArrayValue<Tournament> = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case TOURNAMENTS_GET_REQUEST:
      return {
        loading: true,
        data: [],
        error: ''
      }
    case TOURNAMENTS_GET_SUCCESS:
      return {
        loading: false,
        data: (action as TournamentGetSuccessAction).payload.data,
        error: ''
      }
    case TOURNAMENTS_POST_SUCCESS:
      return {
        loading: false,
        data: [(action as TournamentPostSuccessAction).payload.data, ...state.data],
        error: ''
      }
    case TOURNAMENTS_PATCH_SUCCESS:
      return {
        loading: false,
        data: state.data.map((tournament) => {
          const { id, name } = (action as TournamentPatchSuccessAction).payload;
          if (tournament.id === id) {
            return {
              ...tournament,
              name
            }
          } else {
            return tournament
          }
        }),
        error: ''
      }
    case TOURNAMENTS_DELETE_SUCCESS:
      const id = (action as TournamentDeleteSuccessAction).payload.id
      return {
        loading: false,
        data: state.data.filter(tournament => tournament.id !== id),
        error: ''
      }
    case TOURNAMENTS_GET_FAILURE:
    case TOURNAMENTS_PATCH_FAILURE:
    case TOURNAMENTS_POST_FAILURE:
    case TOURNAMENTS_DELETE_FAILURE:
      return {
        loading: false,
        data: [],
        error: 'Something went wrong.'
      }
    default:
      return state;
  }
}
