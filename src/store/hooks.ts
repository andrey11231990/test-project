import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import type { RootState } from '../reducers/index'
import { Action } from '../reducers/tournaments.types'

// Creates Dispatch that knows about Thunk
type DispatchFunc = () => ThunkDispatch<RootState, unknown, Action>
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector