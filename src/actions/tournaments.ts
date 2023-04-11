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
    TournamentGetAction,
    TournamentGetSuccessAction,
    TournamentGetFailureAction,
    TournamentPatchFailureAction,
    TournamentPatchSuccessAction,
    TournamentPostFailureAction,
    TournamentPostSuccessAction,
    TournamentDeleteFailureAction,
    TournamentDeleteSuccessAction
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

export const tournamentPostFailure = (): TournamentPostFailureAction => ({
    type: TOURNAMENTS_POST_FAILURE,
})

export const tournamentPostSuccess = (data: Tournament): TournamentPostSuccessAction => ({
    type: TOURNAMENTS_POST_SUCCESS,
    payload: {
        data
    }
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