import { FormGroup, MenuItem } from '@blueprintjs/core';
import { Suggest as OriginalSuggest } from '@blueprintjs/select';
import { Option, SuggestProps } from './types';
import { getFilteredList, getText, highlightText } from './utils';

/**
 * Refer to Blueprint docs to see definitions and examples
 * https://blueprintjs.com/docs/#select/select-component
 * https://github.com/palantir/blueprint/blob/develop/packages/docs-app/src/examples/select-examples/suggestExample.tsx
 */
export default function Suggest({
  options,
  label,
  onSelect,
  value,
}: SuggestProps) {
  return (
    <FormGroup label={label}>
      <OriginalSuggest<Option>
        items={options}
        onItemSelect={item => onSelect(item.value)}
        inputValueRenderer={item => item.label}
        selectedItem={options.find(option => option.value === value) ?? null}
        itemListPredicate={getFilteredList}
        itemRenderer={(item, { handleClick, modifiers, query }) =>
          modifiers.matchesPredicate ? (
            <MenuItem
              active={modifiers.active}
              disabled={modifiers.disabled}
              key={item.value}
              onClick={handleClick}
              text={highlightText(getText(item), query)}
            />
          ) : null
        }
        noResults={<MenuItem disabled text="No results." />}
        popoverProps={{ minimal: true }}
        resetOnClose
        inputProps={{
          placeholder: '',
          // Prevent form to submit on enter
          onKeyDown(event) {
            if (event.key === 'Enter') {
              event.preventDefault();
            }
          },
        }}
      />
    </FormGroup>
  );
}
