'use client';
import { QUERIES } from '@/styles/constants';
import * as React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

function TimeDisplay({ children }: Props) {
  return (
    <Row>
      <H1>{children}</H1>
      <Timezone>BST</Timezone>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
  gap: 10px;

  @media ${QUERIES.tabletAndUp} {
    gap: 15px;
  }
`;

const H1 = styled.h1`
  font: var(--font-h1-mobile);

  @media ${QUERIES.tabletAndUp} {
    font: var(--font-h1-tablet);
  }

  @media ${QUERIES.desktopAndUp} {
    font: var(--font-h1-desktop);
  }
`;

const Timezone = styled.p`
  text-transform: uppercase;
  font: normal 300 0.9375rem/1.75rem var(--font-family);

  @media ${QUERIES.tabletAndUp} {
    font: normal 300 2rem/1.75rem var(--font-family);
  }

  @media ${QUERIES.desktopAndUp} {
    font: normal 300 2.5rem/1.75rem var(--font-family);
    text-transform: uppercase;
  }
`;

export default TimeDisplay;
