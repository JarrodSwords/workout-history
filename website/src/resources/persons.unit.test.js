import axios from 'axios';
import nock from 'nock';
import { API_ROOT, HOST } from '__test__/';
import { persons as testPersons } from '__test__/data/persons';
import * as personsResource from './persons';

const ENDPOINT = `/${API_ROOT}/persons`;

const createFetchScope = (id: number = 0) =>
    nock(HOST)
        .get(`${ENDPOINT}/${id}`)
        .reply(200, {
            person: testPersons.find(person => person.id === id)
        });

const createFetchAllScope = () =>
    nock(HOST)
        .get(ENDPOINT)
        .reply(200, {
            persons: testPersons
        });

describe('fetch', () => {
    it(`requests a person from '${ENDPOINT}/{id}'`, async () => {
        const scope = createFetchScope();

        const person = await personsResource.fetch(0);

        expect(scope.isDone()).toBe(true);
    });

    describe('can find person', () => {
        it('returns the person', async () => {
            const id = 1;
            const scope = createFetchScope(id);

            const person = await personsResource.fetch(id);

            expect(person).toEqual(testPersons[0]);
        });
    });

    describe('cannot find person', () => {
        it('returns null', async () => {
            const id = 0;
            const scope = createFetchScope(id);

            const person = await personsResource.fetch(id);

            expect(person).toEqual(null);
        });
    });
});

describe('fetch all', () => {
    it(`requests persons from '${ENDPOINT}'`, async () => {
        const scope = createFetchAllScope();

        const persons = await personsResource.fetchAll();

        expect(scope.isDone()).toBe(true);
    });

    describe('can find persons', () => {
        it('returns an array of persons', async () => {
            const scope = createFetchAllScope();

            const persons = await personsResource.fetchAll();

            expect(persons).toEqual(
                testPersons.map(person => expect.objectContaining(person))
            );
        });
    });

    describe('cannot find persons', () => {
        it('returns an empty array', async () => {
            const scope = nock(HOST).get(ENDPOINT)
                .reply(200, {
                    persons: []
                });

            const persons = await personsResource.fetchAll();

            expect(persons).toHaveLength(0);
        });
    });
});
