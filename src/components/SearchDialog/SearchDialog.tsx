'use client';
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styled, { keyframes } from 'styled-components';
import { PlaceType } from '../types/types';
import PlaceAutocomplete from '../LocationSearch/PlaceAutocomplete';

interface IDeleteDialogProps {
  children: React.ReactNode;
  setManualCity: React.Dispatch<React.SetStateAction<string>>;
  className: string;
}

function DeleteDialog({
  children,
  setManualCity,
}: IDeleteDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = React.useState(false);


  function onPlaceSelected(place: PlaceType) {
    setManualCity(place.coordinates);
    setOpen(false);
  }

  React.useEffect(() => {
    const handleResize = () => {
      if (!window.visualViewport) {
        return;
      }

      const viewportHeight = window.visualViewport.height;
      const heightDifference = window.innerHeight - viewportHeight;
      const keyboardThreshold = 200; // Adjust this value as needed

      setIsKeyboardVisible(heightDifference > keyboardThreshold);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
    >
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent spellCheck={isKeyboardVisible}>
          <DialogTitle>Where do you want to go?</DialogTitle>
          <ChangeLocationSearch>
            <PlaceAutocomplete onPlaceSelected={onPlaceSelected} />
          </ChangeLocationSearch>

          <Dialog.Close asChild>
            <IconButton aria-label="Close">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </IconButton>
          </Dialog.Close>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const overlayShow = keyframes`
  0% { opacity: 0 }
  100% { opacity: 1 }
`;

const contentShow = keyframes`
  0% { opacity: 0; transform: 'translate(-50%, -48%) scale(.96)' }
  100% { opacity: 1; transform: 'translate(-50%, -50%) scale(1)' }
`;

const DialogOverlay = styled(Dialog.Overlay)`
  background-color: hsla(360, 100%, 100%, 0.49);
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const DialogContent = styled(Dialog.Content)`
  background-color: black;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: absolute;

  top: 50%;
  left: 50%;
  transform: ${(props) => 
    props.spellCheck ? 'translate(-50%, -60%)' : 'translate(-50%, -50%)'};
  
  width: 90vw;
  max-width: 500px;
  max-height: 400px;
  height: auto;
  padding: 25px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: none;
  }
`;

const DialogTitle = styled(Dialog.Title)`
  margin-right: 16px;
  color: white;
  font-size: 17px;
  font-weight: 500px;
`;

const IconButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;

  font-family: inherit;
  border-radius: 100%;
  height: 40px;
  width: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;

  &:hover {
    background-color: var(--color-gray);
  }
`;

const ChangeLocationSearch = styled.div`
  margin-top: 2rem;
`;

export default DeleteDialog;
