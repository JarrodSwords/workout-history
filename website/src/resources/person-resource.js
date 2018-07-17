import axios from 'axios';
import { API_ROOT } from 'appdata';

export const PERSON_RESOURCE = 'persons',
    PERSON_COLLECTION = `/${API_ROOT}/${PERSON_RESOURCE}`,
    WORKOUT_COLLECTION = 'workouts';

export const fetch = async (id: number): Promise<Person> => {
    const response = await axios.get(`${PERSON_COLLECTION}/${id}`);
    return response.data.person || null;
}

export const fetchAll = async (): Promise<Array<Person>> => {
    const response = await axios.get(PERSON_COLLECTION);
    return response.data.persons;
}

export const fetchAllWorkouts = async (personId: number): Promise<Array<Session>> => {
    const response = await axios.get(`${PERSON_COLLECTION}/${personId}/${WORKOUT_COLLECTION}`)
    return response.data.sessions;
};
