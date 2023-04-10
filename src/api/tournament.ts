import { API_TOURNAMENTS_URL } from '../constants/api';
import { Tournament } from "../api/tournament.types"

export const getTournaments = async (
): Promise<Tournament[]> => {
    const response = await fetch(
        API_TOURNAMENTS_URL,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    if (!response.ok) {
        throw new Error('Something went wrong.');
    }

    return await response.json();
};

export const patchTournament = async (id: string, name: string): Promise<Tournament> => {
    const response = await fetch(
        `${API_TOURNAMENTS_URL}/${id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        }
    );

    if (!response.ok) {
        throw new Error('Something went wrong.');
    }

    return await response.json();
};

export const deleteTournament = async (id: string): Promise<void> => {
    const response = await fetch(
        `${API_TOURNAMENTS_URL}/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    if (!response.ok) {
        throw new Error('Something went wrong.');
    }

    return await response.json();
};