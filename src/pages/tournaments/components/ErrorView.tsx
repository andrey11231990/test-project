import React from 'react'
import { useAppDispatch } from '../../../store/hooks';
import {
    tournamentGet
} from '../../../actions/tournaments.thunk'
import Button from '../../../components/Button';
import Centered from '../../../components/Centered';

interface ErrorViewProps {
    search: string,
    error: string
}

export const ErrorView = ({ search, error }: ErrorViewProps) => {
    const dispatch = useAppDispatch();

    const handleRetry = () => {
        dispatch(tournamentGet(search))
    };

    return (<Centered column>
        <div>{error}</div>
        <Button onClick={handleRetry}>Retry</Button>
    </Centered>)
}