import { add, sub } from 'date-fns';
import { startOfDay } from 'date-fns';
import { isValidDate } from '.';

/**
 * We asume original <DatePicker /> component is being tested by Blueprint
 */
describe('<DatePicker />', () => {
  const currDate = startOfDay(new Date());

  test('Correct date is validated', () => {
    expect(isValidDate(add(currDate, { days: 1 }), currDate)).toBe(true);
  });

  test('Incorrect date is invalidated', () => {
    expect(isValidDate(sub(currDate, { days: 1 }), currDate)).toBe(false);
  });
});
