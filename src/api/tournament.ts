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