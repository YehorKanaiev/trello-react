import React from 'react';
import UnauthorizedWrapper from 'shared/unauthorized-wrapper/UnauthorizedWrapper';

function SignUp(): React.ReactElement {
  return <UnauthorizedWrapper>Зареєструватись</UnauthorizedWrapper>;
}

export default SignUp;
