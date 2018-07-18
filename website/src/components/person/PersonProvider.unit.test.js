import nock from 'nock';
import React from 'react';
import ReactDOM from 'react-dom';
import { persons as testPersons } from '__test__/data/persons';
import { HOST } from 'data';
import { PERSON_COLLECTION } from 'resources/person-resource';
import { PersonProvider } from './PersonProvider';

const createScope = (personId: number = 0) =>
    nock(`${HOST}:80`).get(`${PERSON_COLLECTION}/${personId}`)
        .reply(200, {
            person: testPersons.find(person => person.id === personId)
        });

it('gets a person', () => {
    const div = document.createElement('div');
    const personId = 1;
    const scope = createScope(personId);
    
    ReactDOM.render(
        <PersonProvider
            personId={1}
            render={({ person }) => {
                if (person){
                    console.log('has person');
                    expect(person).toEqual(testPersons.find(person => person.id === personId));
                }
                
                console.log('does not have person');
            }} />,
        div
    );

    ReactDOM.unmountComponentAtNode(div);
});
