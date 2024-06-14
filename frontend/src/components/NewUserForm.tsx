import React from 'react';
import { gql, useMutation } from '@apollo/client';

import { GET_USER } from '../App';

const CREATE_USER = gql`
    mutation ($name: String!) {
        createUser(name: $name) {
            id,
            name
        }
    }
`;

export function NewUserForm() {
    const [name, setName] = React.useState<string>('');

    const [createUser, { loading }] = useMutation(CREATE_USER);

    async function handleCreateUser(event: React.FormEvent) {
        event.preventDefault();

        if (!name) return;

        await createUser({
            variables: {
                name,
            },

            refetchQueries: [GET_USER],
        });
    }

    return (
        <form onSubmit={handleCreateUser}>
            <input
                type="text"
                value={name}
                onChange={event => setName(event.target.value)}
            />

            { loading && <button disabled>Enviando...</button> }
            <button type="submit">Enviar</button>
        </form>
    );
}