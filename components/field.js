import { Field as FormikField } from "formik";

export default function Field({ label, name, errors, touched, ...rest }) {
  return (
    <div className="flex mb-2">
      <label className="mr-2" htmlFor={name}>
        {label}
      </label>
      <FormikField id={name} name={name} {...rest} />
      {!!(errors && touched) && <div>{errors}</div>}
    </div>
  );
}
