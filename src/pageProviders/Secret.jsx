import SecretePage from 'pages/secret';
import React from 'react';

import PageContainer from './components/PageContainer';

const Secret = (props) => {
  return (

      <PageContainer>
        <SecretePage {...props} />
      </PageContainer>
  );
};

export default Secret;
