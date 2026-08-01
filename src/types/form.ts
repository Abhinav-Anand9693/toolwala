export interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
}

export interface ToolFormConfig {
  fields: FormField[];
}