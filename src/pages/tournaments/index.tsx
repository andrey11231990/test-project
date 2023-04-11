import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    selectTournamentData,
    selectTournamentError,
    selectTournamentIsLoading,
} from '../../selectors/tournaments';
import {
    tournamentGet, tournamentPost
} from '../../actions/tournaments'
import Container from '../../components/Container';
import H4 from '../../components/H4';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from './components/Header';
import Centered from '../../components/Centered';
import { Card } from './components/card';
import theme from '../../theme';
import { isTournamentNameValid } from '../../utils/validators';

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

    const handleCreate = () => {
        const newTournamentName = window.prompt('Tournament Name:', '');
        if (newTournamentName && isTournamentNameValid(newTournamentName)) {
            dispatch(tournamentPost(newTournamentName))
        }
    };

    const handleRetry = () => {
        dispatch(tournamentGet(search))
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