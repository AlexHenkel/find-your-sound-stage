import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { add, format, sub } from 'date-fns';
import Header from '.';

/**
 * Blueprint logs errors when dates violate `minDate` constraint, so they will appear here but test will pass
 */
describe('<HeaderForm />', () => {
  const today = format(new Date(), 'P');
  const tomorrow = format(add(new Date(), { days: 1 }), 'P');
  const yesterday = format(sub(new Date(), { days: 1 }), 'P');

  test('Add valid start and end date', () => {
    render(<Header onSubmit={() => null} />);
    const startInput = document.querySelector('#startDate');
    const endInput = document.querySelector('#endDate');

    if (startInput) {
      userEvent.type(startInput, today);
      expect(startInput).toHaveValue(today);
    } else {
      throw new Error("Start date input wasn't found");
    }

    if (endInput) {
      userEvent.type(endInput, today);
      expect(endInput).toHaveValue(today);
    } else {
      throw new Error("End date input wasn't found");
    }
  });

  test('Delete end date due to later start date', () => {
    render(<Header onSubmit={() => null} />);
    const startInput = document.querySelector('#startDate');
    const endInput = document.querySelector('#endDate');

    if (endInput) {
      userEvent.type(endInput, today);
    } else {
      throw new Error("End date input wasn't found");
    }

    if (startInput) {
      userEvent.type(startInput, tomorrow);
      expect(startInput).toHaveValue(tomorrow);
      expect(endInput).toHaveValue('');
    } else {
      throw new Error("Start date input wasn't found");
    }
  });

  test('Delete an typed date in the past', () => {
    render(<Header onSubmit={() => null} />);
    const startInput = document.querySelector('#startDate');
    const endInput = document.querySelector('#endDate');

    if (startInput) {
      userEvent.type(startInput, yesterday);
    } else {
      throw new Error("Start date input wasn't found");
    }

    if (endInput) {
      userEvent.type(endInput, today);
      // Start date should be invalidated because it was wrong
      expect(startInput).toHaveValue('Invalid date');
    } else {
      throw new Error("End date input wasn't found");
    }
  });
});
