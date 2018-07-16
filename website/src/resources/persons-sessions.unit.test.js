import nock from 'nock';
import * as sessionsResource from './sessions';
import { API_ROOT, HOST } from '__test__/';
import { sessions as testSessions } from '__test__/data/sessions';

const ENDPOINT = `/${API_ROOT}/persons`,
    SUBCOLLECTION = 'sessions';

const createFetchSessionsScope = (personId: number = 1) =>
    nock(HOST)
        .get(`${ENDPOINT}/${personId}/${SUBCOLLECTION}`)
        .reply(200, {
            sessions: testSessions.filter(session => session.personId === personId)
        });

describe('fetch all', () => {
    it(`requests sessions for person from ${ENDPOINT}/{id}/${SUBCOLLECTION}`, async () => {
        const personId = 1;
        const scope = createFetchSessionsScope(personId);

        const person = await sessionsResource.fetchAll(personId);

        expect(scope.isDone()).toBe(true);
    });

    it('returns an array of sessions', async () => {
        const personId = 1;
        const scope = createFetchSessionsScope(personId);

        const sessions = await sessionsResource.fetchAll(personId);

        expect(sessions).toEqual(
            testSessions.map(session => expect.objectContaining(session))
        );
    });
});
