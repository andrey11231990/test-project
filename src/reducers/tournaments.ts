import { AnyAction } from "redux";
import { Tournament } from "../api/tournament.types"
import { TOURNAMENTS_GET_REQUEST, TOURNAMENTS_GET_FAILURE, TOURNAMENTS_GET_SUCCESS, TOURNAMENTS_PATCH_FAILURE, TOURNAMENTS_PATCH_SUCCESS } from '../constants/action-names';
import { TournamentGetSuccessAction, TournamentPatchSuccessAction, StateArrayValue } from './tournaments.types'

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
    case TOURNAMENTS_GET_FAILURE:
    case TOURNAMENTS_PATCH_FAILURE:
      return {
        loading: false,
        data: [],
        error: 'Something went wrong.'
      }
    default:
      return state;
  }
}
