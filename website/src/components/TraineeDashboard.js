import React from 'react';
import { PersonProvider } from 'components/person/PersonProvider';
import { SimplePerson } from 'components/person/SimplePerson';

export const TraineeDashboard = ({ personId }) =>
    <PersonProvider
        personId={personId}
        render={person =>
            <SimplePerson person={person} />
        } />;
