import { useState, Fragment } from 'react';
import { useMutation } from 'graphql-hooks'
import styled from 'styled-components';

import { Orders } from './Orders.js';

const LOGIN = `mutation Login(
  $input: LoginInput!
) {
  login(input: $input) {
    authorized
  }
}`;

const Wrapper = styled.div`
  display: flex;
`;

export const AdminPanel = () => {
  const [login, state] = useMutation(LOGIN)
  const authorized = state?.data?.login?.authorized;
  const [account, setAccount] = useState({})

  return (
    <Wrapper>
      {!authorized && (
        <Fragment>
          <input
            type="name"
            id="name"
            name="name"
            onChange={(event) => setAccount(event.target.value)}
            pattern='[0-9]{0,5}'
          />
          <button
            type="submit"
            onClick={() => login({ variables: { input: {name: account} } })}
          >Login</button>
        </Fragment>
      )}
      {authorized && <Orders />}
    </Wrapper>
  );
}
