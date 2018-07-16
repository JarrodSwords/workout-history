import nock from 'nock';
import * as sessionsResource from './sessions';
import { testSessions } from '__test__/data/sessions';

nock('http://localhost')
    .get('/api/persons/1/sessions')
    .reply(200, { sessions: testSessions });

describe('sessions resource - fetch all - success', () => {
    it('returns an array of sessions', async () => {
        const sessions = await sessionsResource.fetchAll(1);
        expect(sessions).toEqual(
            testSessions.map(session => expect.objectContaining(session))
        );
    });
});
