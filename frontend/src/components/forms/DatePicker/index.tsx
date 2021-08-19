import { DateInput } from '@blueprintjs/datetime';
import { AppToaster } from 'utils/toaster';
import { format, isBefore, startOfDay } from 'date-fns';

interface Props {
  name: string;
  value?: Date;
  onChange: (value?: Date) => void;
  minDate?: Date;
}

/**
 * Return if is a valid date
 *
 * Our implementation requires a `minDate` constraint, so we always validate against it
 */
export const isValidDate = (newDate: Date | undefined, minDate: Date) =>
  newDate && !isBefore(newDate, minDate);

/**
 * Refer to Blueprint docs to see definitions and examples
 * https://blueprintjs.com/docs/#datetime/datepicker
 * https://github.com/palantir/blueprint/blob/develop/packages/docs-app/src/examples/datetime-examples/datePickerExample.tsx
 */
export default function DatePicker({
  name,
  value,
  onChange,
  minDate = startOfDay(new Date()),
}: Props) {
  return (
    <DateInput
      formatDate={date => format(date, 'P')}
      parseDate={str => new Date(str)}
      placeholder={'M/D/YYYY'}
      inputProps={{ id: name }}
      onChange={newDate => {
        if (isValidDate(newDate, minDate)) {
          onChange(newDate);
        } else {
          AppToaster.show({
            message: 'Date is out of range. Select a valid date',
            intent: 'danger',
          });
          onChange();
        }
      }}
      outOfRangeMessage="Invalid date"
      minDate={minDate}
      value={value}
    />
  );
}
