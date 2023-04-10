import { Action as BaseAction } from 'redux'
import { Tournament } from "../api/tournament.types"

export interface TournamentGetAction extends BaseAction { }
export interface TournamentGetSuccessAction extends BaseAction { payload: { data: Tournament[] } }
export interface TournamentGetFailureAction extends BaseAction { }

export type Action = TournamentGetAction | TournamentGetSuccessAction | TournamentGetFailureAction

export interface StateArrayValue<T> {
    loading: boolean,
    data: T[],
    error: string
}