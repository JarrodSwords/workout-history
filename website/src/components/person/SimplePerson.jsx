import React from 'react';

export const SimplePerson = ({ person }) =>
    <>
        <span className="surname">{person.surname}</span>, <span className="name">{person.name}</span>
    </>;
