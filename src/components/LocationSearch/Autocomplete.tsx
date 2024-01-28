import React from 'react';
import styled from 'styled-components';
import { PlaceType } from '../types/types';

type AutocompleteProps = {
  options: PlaceType[];
  placeholder: string;
  selectedIcon?: string;
  onInputChange: (value: string) => void;
  onSelect: (option: PlaceType) => void;
};

function Autocomplete({
  options,
  placeholder,
  selectedIcon,
  onInputChange,
  onSelect,
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [highlightedPosition, setHighlightedPosition] =
    React.useState(0);
  const [keyword, setKeyword] = React.useState('');

  const onInput = (value: string) => {
    onInputChange(value);
    setKeyword(value);
    setIsOpen(!!value);
    setHighlightedPosition(0);
  };

  const moveDown = () => {
    if (!isOpen || options.length === 0) {
      return;
    }
    setHighlightedPosition(
      (highlightedPosition + 1) % options.length
    );
  };

  const moveUp = () => {
    if (!isOpen || options.length === 0) {
      return;
    }
    setHighlightedPosition(
      highlightedPosition - 1 < 0
        ? options.length - 1
        : highlightedPosition - 1
    );
  };

  const select = () => {
    const selectedOption = options[highlightedPosition];
    setKeyword(selectedOption.name);
    setIsOpen(false);
    onSelect(selectedOption);
  };
  

  return (
    <AutocompleteWrapper>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'start',
        }}
      >
        {selectedIcon && <Icon iconUrl={selectedIcon} />}
        <InputField
          value={keyword}
          className="form_field"
          placeholder={placeholder}
          onChange={(e) => onInput(e.target.value)}
          onBlur={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsOpen(false);
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              moveDown();
            }
            if (e.key === 'ArrowUp') moveUp();
            if (e.key === 'Enter') select();
          }}
        />
      </div>
      {isOpen && options.length > 0 && (
        <SuggestionsList>
          {options.map((option, index) => (
            <SuggestionItem
              key={option.id}
              highlighted={index === highlightedPosition}
              onMouseEnter={() => setHighlightedPosition(index)}
              onMouseDown={select}
            >
              {option.name}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </AutocompleteWrapper>
  );
}

const AutocompleteWrapper = styled.div`
  position: relative;
`;

const InputField = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Icon = styled.div<{ iconUrl: string }>`
  width: 75px;
  height: 75px;
  background-repeat: no-repeat;
  background-position: left;
  background-size: contain;
  background-image: url(${(props) => props.iconUrl});
`;

const SuggestionsList = styled.ul`
  border: 1px solid #dbdbdb;
  border-radius: 0 0 3px 3px;
  position: absolute;
  overflow: hidden;
  background: white;
`;

const SuggestionItem = styled('li').withConfig({
  shouldForwardProp: (prop: string) =>
    !['highlighted'].includes(prop),
})<{ highlighted: boolean }>`
  padding: 8px;
  border-bottom: 1px solid #eee;
  color: #363636;
  cursor: pointer;
  background: ${(props) => (props.highlighted ? '#dbdbdb' : 'white')};
`;

export default Autocomplete;
