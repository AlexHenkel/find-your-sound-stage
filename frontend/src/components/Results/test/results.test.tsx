import { render } from '@testing-library/react';
import Results from '..';
import { mockResponse } from './mock';

describe('<Results />', () => {
  test('Render correct results', () => {
    const { container } = render(<Results response={mockResponse} />);
    expect(container).toMatchSnapshot();
  });
});
