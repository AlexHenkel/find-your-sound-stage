import { useState } from 'react';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';
import DatePicker from 'components/forms/DatePicker';
import Suggest from 'components/forms/Suggest';
import { isAfter } from 'date-fns';
import statesList from 'data/states.json';
import styles from './styles.module.css';
import { HeaderFormProps, SearchForm } from './types';

const initialSearch: SearchForm = { city: '' };

export default function HeaderForm({ onSubmit, loading }: HeaderFormProps) {
  const [values, setValues] = useState<SearchForm>(initialSearch);

  const setValue = (key: keyof SearchForm, newValue?: string | Date) => {
    setValues(prev => ({
      ...prev,
      [key]: newValue,
      ...(key === 'startDate' &&
      prev.endDate &&
      isAfter(newValue as Date, prev.endDate)
        ? { endDate: undefined }
        : {}),
    }));
  };

  const hasValues = Object.values(values).some(value => value);

  return (
    <form
      className={styles.inputContainer}
      onSubmit={e => {
        e.preventDefault();
        onSubmit(values);
      }}
    >
      <FormGroup label="City" labelFor="city">
        <InputGroup
          id="city"
          name="city"
          onChange={e => setValue('city', e.target.value)}
          value={values.city}
        />
      </FormGroup>
      <Suggest
        label="State"
        value={values.state}
        options={statesList}
        onSelect={newValue => setValue('state', newValue)}
      />
      <Suggest
        label="Country"
        value={values.country}
        options={[{ value: 'United States of America', label: 'USA' }]}
        onSelect={newValue => setValue('country', newValue)}
      />
      <FormGroup label="Start date">
        <DatePicker
          name="startDate"
          value={values.startDate}
          onChange={newDate => setValue('startDate', newDate)}
        />
      </FormGroup>
      <FormGroup label="End date">
        <DatePicker
          name="endDate"
          value={values.endDate}
          minDate={values.startDate}
          onChange={newDate => setValue('endDate', newDate)}
        />
      </FormGroup>
      <div className={styles.search}>
        {hasValues && (
          <div className={styles.clear}>
            <button type="button" onClick={() => setValues(initialSearch)}>
              Reset filters
            </button>
          </div>
        )}
        <Button type="submit" intent="primary" disabled={loading}>
          Search
        </Button>
      </div>
    </form>
  );
}
