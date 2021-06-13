import { Formik } from "formik";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import * as Yup from "yup";
import Head from "next/head";
import ky from "ky";
import { useSession, getSession } from "next-auth/client";
import { motion, AnimatePresence } from "framer-motion";
import * as dayjs from "dayjs";
import BlockField from "../../components/block-field";
import Field from "../../components/field";
import Button from "../../components/button";

const Add = () => {
  const formRef = useRef();
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [session] = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <>
        <Head>
          <title>Add product</title>
        </Head>
        <h1>Add product</h1>
        <p>
          <Link
            href={`/auth?redirect=${process.env.NEXT_PUBLIC_URL}/${router.locale}/product/add`}
          >
            <a>Sign in</a>
          </Link>{" "}
          to view this page.
        </p>
      </>
    );
  }

  const handleFormSubmit = async ({ images, ...json }) => {
    try {
      const { id } = await ky
        .post(`${process.env.NEXT_PUBLIC_URL}/api/product`, {
          json,
        })
        .json();

      if (images.length) {
        const formData = new FormData();

        images.forEach((image) => {
          formData.append("images", image);
        });

        try {
          await ky.put(
            `${process.env.NEXT_PUBLIC_URL}/api/product/${id}/images`,
            {
              body: formData,
            }
          );
        } catch {
          toast.error("Images not added :(");
        }
      }

      toast.success(
        <>
          Product created!
          <Link href={`${process.env.NEXT_PUBLIC_URL}/product/${id}`}>
            <a className="ml-2 text-blue-200">View product</a>
          </Link>
        </>,
        {
          autoClose: false,
        }
      );
    } catch {
      toast.error("Product not added :(");
    }
  };

  const handleFormReset = (e) => {
    e.preventDefault();
    setConfirmDialogVisible(!confirmDialogVisible);
  };

  return (
    <>
      <Head>
        <title>Add product</title>
      </Head>
      <h1>Add product</h1>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          name: "",
          slug: "",
          description: "",
          isPublic: false,
          images: [],
        }}
      >
        {({
          errors,
          isSubmitting,
          touched,
          handleSubmit,
          resetForm,
          setFieldValue,
        }) => (
          <form
            onSubmit={handleSubmit}
            ref={formRef}
            encType="multipart/form-data"
          >
            <BlockField
              label="Name"
              name="name"
              errors={errors.name}
              touched={touched.name}
              type="text"
              required
            />
            <BlockField
              label="Slug"
              name="slug"
              errors={errors.slug}
              touched={touched.slug}
              type="text"
              required
            />
            <BlockField
              label="Description"
              name="description"
              errors={errors.description}
              touched={touched.description}
              as="textarea"
              required
            />
            <Field
              label="Public"
              name="isPublic"
              errors={errors.isPublic}
              touched={touched.isPublic}
              type="checkbox"
              className="p-3 rounded"
            />
            <Field
              label="Images"
              name="images"
              type="file"
              accept="image/*"
              multiple
              errors={errors.images}
              touched={touched.images}
              value={undefined}
              onChange={(event) => {
                setFieldValue("images", Array.from(event.target.files));
              }}
            />
            <Button
              className="mb-2"
              type="reset"
              color="secondary"
              onClick={handleFormReset}
            >
              Reset form
            </Button>
            <AnimatePresence>
              {confirmDialogVisible && (
                <motion.div
                  className="p-2 mb-2 bg-green-300 rounded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="text-black text-center mb-2">You sure?</div>
                  <Button
                    className="mb-2"
                    color="primary"
                    onClick={() => {
                      resetForm();

                      // For image field
                      formRef.current.reset();

                      setConfirmDialogVisible(false);
                    }}
                  >
                    Yes, reset all fields!
                  </Button>
                  <Button
                    onClick={() => {
                      setConfirmDialogVisible(false);
                    }}
                  >
                    Cancel
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            <Button disabled={isSubmitting} type="submit" color="primary">
              {isSubmitting ? "Adding product..." : "Add product"}
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Add;
