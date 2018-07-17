import { API_ROOT, HOST } from 'appdata';
import axios from 'axios';
import nock from 'nock';
import { persons as testPersons } from '__test__/data/persons';
import { workouts as testWorkouts } from '__test__/data/workouts';
import * as personsResource from './person-resource';

const { PERSON_COLLECTION, WORKOUT_COLLECTION } = personsResource;
const INVALID_ID = 0,
    VALID_ID = 1;

describe('fetch', () => {

    const createScope = (id: number = 0) =>
        nock(HOST).get(`${PERSON_COLLECTION}/${id}`)
            .reply(200, {
                person: testPersons.find(person => person.id === id)
            });

    it(`requests a person from '${PERSON_COLLECTION}/{id}'`, async () => {
        const scope = createScope(VALID_ID);

        const person = await personsResource.fetch(VALID_ID);

        expect(scope.isDone()).toBe(true);
    });

    it('can find person - returns the person', async () => {
        const scope = createScope(VALID_ID);

        const person = await personsResource.fetch(VALID_ID);

        expect(person).toEqual(testPersons.find(person => person.id === VALID_ID));
    });

    it('cannot find person - returns null', async () => {
        const scope = createScope(INVALID_ID);

        const person = await personsResource.fetch(INVALID_ID);

        expect(person).toEqual(null);
    });
});

describe('fetch all', () => {

    const createScope = () =>
        nock(HOST).get(PERSON_COLLECTION)
            .reply(200, {
                persons: testPersons
            });

    it(`requests persons from '${PERSON_COLLECTION}'`, async () => {
        const scope = createScope();

        const persons = await personsResource.fetchAll();

        expect(scope.isDone()).toBe(true);
    });

    it('can find persons - returns an array of persons', async () => {
        const scope = createScope();

        const persons = await personsResource.fetchAll();

        expect(persons).toEqual(testPersons.map(person => expect.objectContaining(person)));
    });

    it('cannot find persons - returns an empty array', async () => {
        const scope = nock(HOST).get(PERSON_COLLECTION)
            .reply(200, {
                persons: []
            });

        const persons = await personsResource.fetchAll();

        expect(persons).toHaveLength(0);
    });
});

describe('fetch all workouts', () => {

    const createScope = (personId: number = 1) =>
        nock(HOST).get(`${PERSON_COLLECTION}/${personId}/${WORKOUT_COLLECTION}`)
            .reply(200, {
                sessions: testWorkouts.filter(workout => workout.personId === personId)
            });

    it(`requests sessions for person from '${PERSON_COLLECTION}/{id}/${WORKOUT_COLLECTION}'`, async () => {
        const scope = createScope(VALID_ID);

        const workouts = await personsResource.fetchAllPersonWorkouts(VALID_ID);

        expect(scope.isDone()).toBe(true);
    });

    it('can find workouts - returns an array of workouts', async () => {
        const scope = createScope(VALID_ID);

        const sessions = await personsResource.fetchAllPersonWorkouts(VALID_ID);

        expect(sessions).toEqual(
            testWorkouts.map(session => expect.objectContaining(session))
        );
    });

    it('cannot find workouts - returns an empty array', async () => {
        const scope = createScope(INVALID_ID);

        const sessions = await personsResource.fetchAllPersonWorkouts(INVALID_ID);

        expect(sessions).toHaveLength(0);
    });
});
