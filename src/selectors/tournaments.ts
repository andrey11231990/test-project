import { RootState } from '../reducers';
import { createSelector } from 'reselect';

const selectTournamentState = (state: RootState) => state.tournaments;

export const selectTournamentData = createSelector(
    selectTournamentState,
    (state) => state.data
);
export const selectTournamentError = createSelector(
    selectTournamentState,
    (state) => state.error
);
export const selectTournamentIsLoading = createSelector(
    selectTournamentState,
    (state) => state.loading
);
