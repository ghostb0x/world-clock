import * as React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { QUERIES } from '@/styles/constants';

interface ButtonProps {
  bottomOpen: boolean;
  onClick: () => void;
}

function MoreButton({ bottomOpen, onClick }: ButtonProps) {
  return (
    <Wrapper onClick={onClick}>
      {!bottomOpen ? 'More' : 'Less'}{' '}
      <Circle>
        <DownIcon
          className={bottomOpen.toString()}
          alt="down arrow icon"
          src="/assets/desktop/icon-arrow-down.svg"
          width={15}
          height={10}
          quality={80}
          priority={true}
        />
      </Circle>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  position: relative;
  min-width: 115px;
  max-width: 115px;
  height: 39px;
  border-radius: 1.75rem;
  background-color: var(--color-white);
  font: var(--font-button-mobile);
  color: var(--color-gray);
  letter-spacing: 0.23438rem;
  text-transform: uppercase;
  padding-left: 17px;
  display: flex;
  justify-content: start;
  align-items: center;

  /* tablet and desktop sizes are identical */
  @media ${QUERIES.tabletAndUp} {
    padding-left: 21px;
    min-width: 146px;
    max-width: 146px;
    height: 56px;
    font: var(--font-button-tablet);
  }

  @media ${QUERIES.desktopAndUp} {
    margin-right: clamp(8rem, 14vw + 3rem, 25rem);
  }
`;

const Circle = styled.div`
  position: absolute;
  right: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-gray);
  border-radius: 50%;
  font: var(--color-white);

  /* tablet and desktop sizes are identical */
  @media ${QUERIES.tabletAndUp} {
    margin-left: 16px;
    width: 40px;
    height: 40px;
  }
`;

const DownIcon = styled(Image)`
  margin-top: -1px;
  will-change: transform;
  transition: transform 1s ease-in-out;
  &.false {
    transform: rotate(360deg) translateY(2px);
  }
  &.true {
    transform: rotate(180deg) translateY(-1px);
  }
`;

export default MoreButton;
