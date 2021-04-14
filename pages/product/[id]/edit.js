import { Formik } from "formik";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Head from "next/head";
import ky from "ky";
import prisma from "../../../lib/prisma";
import BlockField from "../../../components/block-field";
import Field from "../../../components/field";
import Button from "../../../components/button";
import Images from "../../../components/images";

export async function getServerSideProps({ params }) {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      images: true,
    },
  });

  return {
    props: {
      product,
    },
  };
}

const Edit = ({ product }) => {
  const router = useRouter();
  const fieldRef = useRef();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  const { id, name, slug, description, isPublic, images } = product;

  const handleFormSubmit = async ({ images, ...json }, { setFieldValue }) => {
    // Reset "images" field
    fieldRef.current.value = "";

    // TODO Why await?
    await ky.put(`http://localhost:3000/api/product/${id}`, {
      json,
    });

    if (images) {
      const formData = new FormData();

      images.forEach((image) => {
        formData.append("images", image);
      });

      await ky.put(`http://localhost:3000/api/product/${id}/images`, {
        body: formData,
      });
    }

    toast.success("Product updated!");
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    slug: Yup.string().required(),
  });

  return (
    <>
      <Head>
        <title>Edit product</title>
      </Head>
      <h1>Edit</h1>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          name,
          slug,
          description,
          isPublic,
          images,
        }}
        validationSchema={validationSchema}
      >
        {({
          errors,
          handleSubmit,
          isSubmitting,
          touched,
          setFieldValue,
          setValues,
          values,
        }) => (
          <form onSubmit={handleSubmit} encType="multipart/form-data">
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
              innerRef={fieldRef}
            />
            {values.images && (
              <Images
                images={values.images}
                deleteCallback={(id) => {
                  setFieldValue(
                    "images",
                    values.images.filter((image) => image.id !== id)
                  );
                  ky.delete(`http://localhost:3000/api/image/${id}`);
                }}
              />
            )}
            <Button disabled={isSubmitting}>
              {isSubmitting ? "Saving changes..." : "Save changes"}
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Edit;
