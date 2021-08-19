export interface SearchForm {
  city?: string;
  state?: string;
  country?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface HeaderFormProps {
  onSubmit: (values: SearchForm) => void;
  loading?: boolean;
}
