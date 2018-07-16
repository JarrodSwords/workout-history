import axios from 'axios';

export const fetchAll = async (): Promise<Person> => {
    const response = await axios.get('/api/persons');
    return response.data.persons;
}
