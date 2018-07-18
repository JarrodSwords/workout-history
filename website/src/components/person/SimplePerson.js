import React from 'react';

export const SimplePerson = ({ person }) =>
    <React.Fragment>
        <span className="surname">{person.surname}</span>, <span className="name">{person.name}</span>
    </React.Fragment>;
