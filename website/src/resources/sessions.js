import axios from 'axios';

export const fetchAll = async (personId: number): Promise<Array<Session>> => {
    const response = await axios.get(`/api/persons/${personId}/sessions`)
    return response.data.sessions;
};
