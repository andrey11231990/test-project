import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    selectTournamentData,
    selectTournamentError,
    selectTournamentIsLoading,
} from '../../selectors/tournaments';
import {
    tournamentGet
} from '../../actions/tournaments.thunk'
import Container from '../../components/Container';
import H4 from '../../components/H4';
import { Header } from './components/Header';
import Centered from '../../components/Centered';
import { Card } from './components/Card';
import { ErrorView } from './components/ErrorView';
import theme from '../../theme';

export const TournamentsView = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(selectTournamentData);
    const isLoading = useAppSelector(selectTournamentIsLoading);
    const error = useAppSelector(selectTournamentError);
    const [search, setSearch] = React.useState('');
    const [isRequestTriggered, setIsRequestTriggered] = React.useState(false);

    useEffect(() => {
        // debounce for search
        let timeout: NodeJS.Timeout = setTimeout(() => {
            dispatch(tournamentGet(search));
            setIsRequestTriggered(true)
        }, 750);
        return () => {
            clearTimeout(timeout);
        };
    }, [dispatch, search, setIsRequestTriggered]);

    return (
        <Container>
            <H4>FACEIT Tournaments</H4>
            <Header search={search} setSearch={setSearch} />
            {isLoading && <Centered>Loading tournaments ...</Centered>}
            {error && <ErrorView search={search} error={error} />}
            {isRequestTriggered && data && data.length === 0 && !error && !isLoading && <Centered>No tournaments found.</Centered>}
            {data && data.length > 0 && <Grid>{data.map((tournament) => <Card key={tournament.id} {...tournament} />)}</Grid>}
        </Container>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${theme.spacing(6)};

    @media (max-width: ${theme.breakpoints.m}) {
        grid-template-columns: repeat(1, 1fr);
        grid-gap: ${theme.spacing(4)};
    }
`;