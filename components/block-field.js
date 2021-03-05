import { Field as FormikField } from "formik";

export default function BlockField({ label, name, errors, touched, ...rest }) {
  return (
    <div className="mb-3 ">
      <label className="block mb-1" htmlFor={name}>
        {label}
      </label>
      <FormikField
        className="border border-gray-400 rounded w-full block text-black"
        id={name}
        name={name}
        {...rest}
      />
      {!!(errors && touched) && <div>{errors}</div>}
    </div>
  );
}
