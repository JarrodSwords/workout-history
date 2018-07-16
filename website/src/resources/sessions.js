import axios from 'axios';

export const fetchAll = async (personId: number) => {
    const response = await axios.get(`/api/persons/${personId}/sessions`)
    return response.data.sessions;
};
