import axios from 'axios';

export const fetch = async (id: number): Promise<Person> => {
    const response = await axios.get(`/api/persons/${id}`);
    return response.data.person || null;
}

export const fetchAll = async (): Promise<Array<Person>> => {
    const response = await axios.get('/api/persons');
    return response.data.persons;
}
