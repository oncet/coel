import Head from "next/head";
import { useTheme } from "next-themes";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import * as Yup from "yup";

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
      <h1>
        <FormattedMessage
          defaultMessage="Settings"
          description="settings page header"
        />
      </h1>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{ darkMode: theme === "dark" ? true : false }}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ errors, handleSubmit, isSubmitting, touched }) => (
          <form onSubmit={handleSubmit}>
            <Field
              label="Foo"
              name="foo"
              as="select"
              className="w-16 rounded text-black"
            >
              <option>1</option>
              <option>2</option>
            </Field>
            <Field
              label="Dark mode"
              name="darkMode"
              errors={errors.darkMode}
              touched={touched.darkMode}
              type="checkbox"
              className="p-3 rounded"
            />
            <Button disabled={isSubmitting}>
              {isSubmitting ? "Saving changes..." : "Save changes"}
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Settings;
