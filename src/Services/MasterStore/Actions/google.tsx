import React from 'react';

import { GoogleLogin } from '@react-oauth/google';

const google = () => {

    return (
        <GoogleLogin size={'medium'} width={'200'}
            onSuccess={credentialResponse => {
            }}
            onError={() => {
            }}
          />
    )
}

export default google;