import { Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Head from "next/head";
import Field from "../components/field";
import Button from "../components/button";
import { useTheme } from "../context/theme";

const Options = () => {
  const { darkMode, setDarkMode } = useTheme();

  const handleFormSubmit = async (values, { setSubmiting }) => {
    const root = document.documentElement;

    if (values.darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    setDarkMode(values.darkMode);

    toast.success("Options updated!");
  };

  const validationSchema = Yup.object().shape({
    darkMode: Yup.bool().required(),
  });

  return (
    <>
      <Head>
        <title>Options</title>
      </Head>
      <h1>Options</h1>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{ darkMode }}
        validationSchema={validationSchema}
      >
        {({
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <Field
              label="Dark mode"
              name="darkMode"
              errors={errors.darkMode}
              touched={touched.darkMode}
              type="checkbox"
              className="p-3 rounded"
            />
            <Button className="mt-3" disabled={isSubmitting}>
              {isSubmitting ? "Saving changes..." : "Save changes"}
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Options;
