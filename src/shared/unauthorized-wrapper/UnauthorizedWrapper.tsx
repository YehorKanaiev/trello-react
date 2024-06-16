import * as React from 'react';
import { styled } from '@mui/material';
import { ClassNameProp } from 'core/interfaces/class-name-prop';

type Props = {
  children?: React.ReactNode;
};

function UnauthorizedWrapper({ children, className }: Props & ClassNameProp): React.ReactElement {
  return <div className={className}>{children}</div>;
}

UnauthorizedWrapper.defaultProps = {
  children: null,
  className: 'unauthorized-wrapper',
};

const StyledUnauthorizedWrapper = styled(UnauthorizedWrapper)`
  width: 100vw;
  height: 100vh;
  background-color: #1199c1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default StyledUnauthorizedWrapper;
