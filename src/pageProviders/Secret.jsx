import SecretePage from 'pages/secret';
import React from 'react';
import * as authorities from 'constants/authorities';
import PageContainer from './components/PageContainer';
import PageAccessValidator from "./components/PageAccessValidator";

const Secret = (props) => {
    return (
        <PageAccessValidator
        >
            <PageContainer>
                <SecretePage {...props} />
            </PageContainer>
        </PageAccessValidator>
    );
};

export default Secret;
