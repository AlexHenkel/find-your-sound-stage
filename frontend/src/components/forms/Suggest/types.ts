export interface Option {
  label: string;
  value: string;
}

/**
 * If this component requires further customization, consider extending original props
 * to allow overriding every original prop
 */
export interface SuggestProps {
  label: string;
  options: Option[];
  onSelect: (value: string) => void;
  value?: string;
}
