import React from 'react';
import styled from 'styled-components';
import { Tournament } from '../../../api/tournament.types';
import { useAppDispatch } from '../../../store/hooks';
import {
    tournamentPatch, tournamentDelete
} from '../../../actions/tournaments.thunk'
import { isTournamentNameValid } from '../../../utils/validators';
import H6 from '../../../components/H6';
import Button from '../../../components/Button';
import theme from '../../../theme';

export const Card = ({ id, game, name, organizer, participants, startDate }: Tournament) => {
    const dispatch = useAppDispatch();

    const handleEdit = () => {
        const newTournamentName = window.prompt('Tournament Name:', '');
        if (newTournamentName && isTournamentNameValid(newTournamentName)) {
            dispatch(tournamentPatch(id, newTournamentName))
        }
    }
    const handleDelete = () => {
        const isConfirmed = window.confirm('Do you really want to delete this tournament?');
        if (isConfirmed) {
            dispatch(tournamentDelete(id))
        }
    }

    return (
        <StyledCard>
            <H6>{name}</H6>
            <div>Organizer: {organizer}</div>
            <div>Game: {game}</div>
            <div>
                Participants: {participants.current}/
                {participants.max}
            </div>
            <div>
                Start: {new Date(startDate).toLocaleString('en-GB')}
            </div>
            <Footer>
                <Button onClick={handleEdit}>Edit</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </Footer>
        </StyledCard>
    )
}

const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${theme.spacing(4)};
    background-color: ${theme.palette.background.alt1};
    border-radius: ${theme.borderRadius};
`;

const Footer = styled.div`
    margin-top: ${theme.spacing(2)};
    & > * + * {
        margin-left: ${theme.spacing(2)};
    }
`;