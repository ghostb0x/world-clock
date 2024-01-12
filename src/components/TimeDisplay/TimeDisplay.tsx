'use client';
import * as React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}


function TimeDisplay({children}: Props) {
  return (
    <div>
      <H1>{children}</H1>
    </div>
  );
}

const H1 = styled.h1`
  font: var(--font-h1-desktop);
`;

export default TimeDisplay;
