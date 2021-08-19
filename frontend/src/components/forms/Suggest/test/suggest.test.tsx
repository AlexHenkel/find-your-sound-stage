import { getFilteredList } from '../utils';
import statesData from 'data/states.json';

/**
 * We asume original <Suggest /> component is being tested by Blueprint
 */
describe('<Suggest />', () => {
  test('Query exact match of value returns correct list', () => {
    const result = getFilteredList(statesData[0].value, statesData);
    expect(result).toMatchSnapshot();
  });

  test('Query exact match of label returns correct list', () => {
    const result = getFilteredList(statesData[0].label, statesData);
    expect(result).toMatchSnapshot();
  });

  test('Query arbitrary value returns correct list', () => {
    const result = getFilteredList('am', statesData);
    expect(result).toMatchSnapshot();
  });
});
