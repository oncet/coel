import { Field as FormikField } from "formik";

export default function Field({
  children,
  label,
  name,
  errors,
  touched,
  ...rest
}) {
  return (
    <div className="flex items-center mb-3">
      <label className="mr-2" htmlFor={name}>
        {label}
      </label>
      <FormikField id={name} name={name} {...rest}>
        {children}
      </FormikField>
      {!!(errors && touched) && <div>{errors}</div>}
    </div>
  );
}
