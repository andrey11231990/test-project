import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux'
import { RootState } from '../reducers';
import { getTournaments, postTournament, deleteTournament } from '../api/tournament'
import {
    tournamentDeleteFailure,
    tournamentDeleteSuccess,
    tournamentGetFailure,
    tournamentGetRequest,
    tournamentGetSuccess,
    tournamentPatchFailure,
    tournamentPatchSuccess,
    tournamentPostFailure,
    tournamentPostSuccess
} from './tournaments'
import {
    Action
} from '../reducers/tournaments.types'

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

export function tournamentPost(
    newTournamentName: string
): ThunkAction<void, RootState, unknown, Action> {
    return async function tournamentPostThunk(
        dispatch: Dispatch
    ) {
        // do not trigger loading state according to the task description
        try {
            const tournament = await postTournament(newTournamentName)
            dispatch(tournamentPostSuccess(tournament))
        } catch (e) {
            dispatch(tournamentPostFailure())
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