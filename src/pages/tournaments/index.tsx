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
} from '../../actions/tournaments'
import Container from '../../components/Container';
import H4 from '../../components/H4';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from './components/Header';
import Centered from '../../components/Centered';
import { Card } from './components/card';
import theme from '../../theme';

export const TournamentsView = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(selectTournamentData);
    const isLoading = useAppSelector(selectTournamentIsLoading);
    const error = useAppSelector(selectTournamentError);
    const [search, setSearch] = React.useState('');

    useEffect(() => {
        dispatch(tournamentGet())
    }, [])

    const handleCreate = () => {
        const newTournamentName = window.prompt('Tournament Name:', '');
    };

    const handleRetry = () => {
        dispatch(tournamentGet())
    };

    return (
        <Container>
            <H4>FACEIT Tournaments</H4>
            <Header>
                <Input
                    id="name"
                    name="name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search tournaments..."
                />
                <Button onClick={handleCreate}>Create tournament</Button>
            </Header>
            {isLoading && <Centered>Loading tournaments ...</Centered>}
            {error && <Centered column>
                <div>{error}</div>
                <Button onClick={handleRetry}>Retry</Button>
            </Centered>}
            {data && data.length === 0 && !error && !isLoading && <Centered>No tournaments found.</Centered>}
            {data && data.length > 0 && <Grid>{data.map((tournament) => <Card {...tournament} />)}</Grid>}
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