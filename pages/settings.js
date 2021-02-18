import { Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Head from "next/head";
import { useTheme } from "next-themes";
import Field from "../components/field";
import Button from "../components/button";

const Settings = () => {
  const { theme, setTheme } = useTheme();

  const handleFormSubmit = async (values) => {
    setTheme(values.darkMode ? "dark" : "light");
    toast.success("Settings updated!");
  };

  const validationSchema = Yup.object().shape({
    darkMode: Yup.bool().required(),
  });

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <h1>Settings</h1>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{ darkMode: theme === "dark" ? true : false }}
        validationSchema={validationSchema}
        enableReinitialize
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

export default Settings;
