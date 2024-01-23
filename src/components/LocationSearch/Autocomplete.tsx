// Autocomplete.tsx
import React from 'react';
import styled from 'styled-components';

type OptionType = { id: string; name: string };

type AutocompleteProps = {
  options: OptionType[];
  placeholder: string;
  selectedIcon?: string;
  width?: string;
  onInputChange: (value: string) => void;
  onSelect: (option: OptionType) => void;
};

const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  placeholder,
  selectedIcon,
  width = 'fit-content',
  onInputChange,
  onSelect,
}) => {
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
          width={width}
          value={keyword}
          className="form_field"
          placeholder={placeholder}
          onChange={(e) => onInput(e.target.value)}
          onBlur={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsOpen(false);
            if (e.key === 'ArrowDown') moveDown();
            if (e.key === 'ArrowUp') moveUp();
            if (e.key === 'Enter') select();
          }}
        />
      </div>
      {isOpen && options.length > 0 && (
        <SuggestionsList width={width}>
          {options.map((option, index) => (
            <SuggestionItem
              key={option.id}
              highlighted={(index === highlightedPosition).toString()}
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
};

const AutocompleteWrapper = styled.div`
  position: relative;
`;

const InputField = styled.input<{ width: string }>`
  width: ${(props) => props.width};
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Icon = styled.div<{ iconUrl: string }>`
  width: 75px;
  height: 75px;
  background-repeat: no-repeat;
  background-position: left;
  background-size: contain;
  background-image: url(${(props) => props.iconUrl});
`;

const SuggestionsList = styled.ul<{ width: string }>`
  width: ${(props) => props.width};
  border: 1px solid #dbdbdb;
  border-radius: 0 0 3px 3px;
  position: absolute;
  overflow: hidden;
  background: white;
`;

const SuggestionItem = styled('li').withConfig({
  shouldForwardProp: (prop: string) => !['highlighted'].includes(prop),
})<{ highlighted: boolean }>`

  padding: 8px;
  border-bottom: 1px solid #eee;
  color: #363636;
  cursor: pointer;
  background: ${(props) => (props.highlighted ? '#f8f8f8' : 'white')};
`;

export default Autocomplete;
