import { Field as FormikField } from "formik";

export default function BlockField({ label, name, errors, touched, ...rest }) {
  return (
    <>
      <label className="block" htmlFor={name}>
        {label}
      </label>
      <FormikField
        className={`border w-full mb-2 text-black`}
        id={name}
        name={name}
        {...rest}
      />
      {!!(errors && touched) && <div>{errors}</div>}
    </>
  );
}
