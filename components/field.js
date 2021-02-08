import { Field as FormikField } from "formik";

export default function Field({ label, name, errors, touched, ...rest }) {
  return (
    <>
      <label className="block" htmlFor={name}>
        {label}
      </label>
      <FormikField
        className="border w-full px-2 py-1 mb-2 text-black"
        id={name}
        name={name}
        {...rest}
      />
      {!!(errors && touched) && <div>{errors}</div>}
    </>
  );
}
