import nock from 'nock';
import * as personsResource from './persons';
import { testPersons } from '__test__/data/persons';

nock('http://localhost')
    .get('/api/persons')
    .reply(200, { persons: testPersons });

describe('persons resource - fetch all - success', () => {
    it('returns an array of persons', async () => {
        const persons = await personsResource.fetchAll();
        expect(persons).toEqual(
            testPersons.map(person => expect.objectContaining(person))
        );
    });
});
