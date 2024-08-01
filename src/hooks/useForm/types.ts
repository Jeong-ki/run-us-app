export interface IUseFormType<T> {
  initialValues: T;
  handleSubmit: (value: T) => void;
  validation?: (value: T) => Partial<Record<keyof T, string>>;
}
