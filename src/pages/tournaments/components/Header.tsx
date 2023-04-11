import React from 'react'
import styled from 'styled-components';
import theme from '../../../theme'
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { isTournamentNameValid } from '../../../utils/validators';
import { useAppDispatch } from '../../../store/hooks';
import {
    tournamentPost
} from '../../../actions/tournaments.thunk'

interface HeaderProps {
    search: string,
    setSearch: (search: string) => void
}

export const Header = ({ search, setSearch }: HeaderProps) => {
    const dispatch = useAppDispatch();

    const handleCreate = () => {
        const newTournamentName = window.prompt('Tournament Name:', '');
        if (newTournamentName && isTournamentNameValid(newTournamentName)) {
            dispatch(tournamentPost(newTournamentName))
        }
    };

    return (
        <StyledHeader>
            <Input
                id="name"
                name="name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tournaments..."
            />
            <Button onClick={handleCreate}>Create tournament</Button>
        </StyledHeader>)
}

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${theme.spacing(6)}
`;
