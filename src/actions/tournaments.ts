import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux'
import { RootState } from '../reducers';
import { Tournament } from "../api/tournament.types"
import { getTournaments } from '../api/tournament'
import { TOURNAMENTS_GET_REQUEST, TOURNAMENTS_GET_FAILURE, TOURNAMENTS_GET_SUCCESS } from '../constants/action-names';
import { TournamentGetAction, TournamentGetSuccessAction, TournamentGetFailureAction, Action } from '../reducers/tournaments.types'

export const tournamentGetRequest = (): TournamentGetAction => ({
    type: TOURNAMENTS_GET_REQUEST
})

export const tournamentGetSuccess = (data: Tournament[]): TournamentGetSuccessAction => ({
    type: TOURNAMENTS_GET_SUCCESS,
    payload: {
        data
    }
})

export const tournamentGetFailure = (): TournamentGetFailureAction => ({
    type: TOURNAMENTS_GET_FAILURE,
})

export function tournamentGet(): ThunkAction<void, RootState, unknown, Action> {
    return async function tournamentGetThunk(
        dispatch: Dispatch
    ) {
        dispatch(tournamentGetRequest());

        try {
            const tournaments = await getTournaments()
            dispatch(tournamentGetSuccess(tournaments))
        } catch (e) {
            dispatch(tournamentGetFailure())
        }
    };
}