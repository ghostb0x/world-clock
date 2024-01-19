import * as React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { QUERIES } from '@/styles/constants';

function MoreButton({
  bottomOpen,
  onClick,
}: {
  bottomOpen: boolean;
  onClick: () => void;
}) {
  return (
    <Wrapper onClick={onClick}>
      {!bottomOpen ? 'More' : 'Less'}{' '}
      <Circle>
        {!bottomOpen ? (
          <DownIcon
            alt="down arrow icon"
            src="/assets/desktop/icon-arrow-down.svg"
            width={15}
            height={10}
            quality={80}
            priority={true}
          />
        ) : (
          <UpIcon
            alt="up arrow icon"
            src="/assets/desktop/icon-arrow-down.svg"
            width={15}
            height={10}
            quality={80}
            priority={true}
          />
        )}
      </Circle>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  position: relative;

  width: 115px;
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
    width: 146px;
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

const DownIcon = styled(Image)``;

const UpIcon = styled(Image)`
  transform: scale(-1, -1);
`;

export default MoreButton;
