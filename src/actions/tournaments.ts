import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux'
import { RootState } from '../reducers';
import { Tournament } from "../api/tournament.types"
import { getTournaments, deleteTournament } from '../api/tournament'
import {
    TOURNAMENTS_GET_REQUEST,
    TOURNAMENTS_GET_FAILURE,
    TOURNAMENTS_GET_SUCCESS,
    TOURNAMENTS_PATCH_FAILURE,
    TOURNAMENTS_PATCH_SUCCESS,
    TOURNAMENTS_DELETE_FAILURE,
    TOURNAMENTS_DELETE_SUCCESS
} from '../constants/action-names';
import {
    TournamentGetAction,
    TournamentGetSuccessAction,
    TournamentGetFailureAction,
    TournamentPatchFailureAction,
    TournamentPatchSuccessAction,
    TournamentDeleteFailureAction,
    TournamentDeleteSuccessAction,
    Action
} from '../reducers/tournaments.types'

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

export const tournamentPatchSuccess = (id: string, name: string): TournamentPatchSuccessAction => ({
    type: TOURNAMENTS_PATCH_SUCCESS,
    payload: {
        id,
        name
    }
})

export const tournamentPatchFailure = (): TournamentPatchFailureAction => ({
    type: TOURNAMENTS_PATCH_FAILURE,
})

export const tournamentDeleteSuccess = (id: string): TournamentDeleteSuccessAction => ({
    type: TOURNAMENTS_DELETE_SUCCESS,
    payload: {
        id
    }
})

export const tournamentDeleteFailure = (): TournamentDeleteFailureAction => ({
    type: TOURNAMENTS_DELETE_FAILURE,
})

export function tournamentGet(name?: string): ThunkAction<void, RootState, unknown, Action> {
    return async function tournamentGetThunk(
        dispatch: Dispatch
    ) {
        dispatch(tournamentGetRequest());

        try {
            const tournaments = await getTournaments(name)
            dispatch(tournamentGetSuccess(tournaments))
        } catch (e) {
            dispatch(tournamentGetFailure())
        }
    };
}

export function tournamentPatch(
    id: string,
    newTournamentName: string
): ThunkAction<void, RootState, unknown, Action> {
    return async function tournamentPatchThunk(
        dispatch: Dispatch
    ) {
        try {
            dispatch(tournamentPatchSuccess(id, newTournamentName))
            // as I understood I shouldn't make a request to BE and update
            // the state afterwards. So, the BE call is commented out
            // const tournament = await patchTournament(id, newTournamentName)
        } catch (e) {
            dispatch(tournamentPatchFailure())
        }
    };
}

export function tournamentDelete(
    id: string
): ThunkAction<void, RootState, unknown, Action> {
    return async function tournamentDeleteThunk(
        dispatch: Dispatch
    ) {
        try {
            dispatch(tournamentDeleteSuccess(id))
            await deleteTournament(id)
        } catch (e) {
            dispatch(tournamentDeleteFailure())
        }
    };
}