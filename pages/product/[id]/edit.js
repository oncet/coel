import { Formik } from "formik";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Head from "next/head";
import ky from "ky";
import { AnimatePresence } from "framer-motion";
import prisma from "../../../lib/prisma";
import BlockField from "../../../components/block-field";
import Field from "../../../components/field";
import Button from "../../../components/button";
import Images from "../../../components/images";
import EditImage from "../../../components/edit-image";

export async function getServerSideProps({ params }) {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      images: {
        orderBy: {
          id: "desc",
        },
      },
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
  const overlayRef = useRef();
  const [editingImage, setEditingImage] = useState();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  const { id, name, slug, description, isPublic, images } = product;

  const handleFormSubmit = async (
    { images, pendingImages, ...json },
    { setFieldValue }
  ) => {
    // Reset "images" field
    fieldRef.current.value = "";

    // TODO Why await?
    await ky.put(`http://localhost:3000/api/product/${id}`, {
      json,
    });

    if (pendingImages) {
      const formData = new FormData();

      pendingImages.forEach((pendingImage) => {
        formData.append("images", pendingImage);
      });

      await ky.put(`http://localhost:3000/api/product/${id}/images`, {
        body: formData,
      });

      const updatedImages = await ky
        .get(`http://localhost:3000/api/product/${id}/images`)
        .json();

      setFieldValue("images", updatedImages);

      // TODO Update image state for overlay
      // setImages(updatedImages);

      setFieldValue("pendingImages", null);
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
          pendingImages: null,
        }}
        // validationSchema={validationSchema}
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
                setFieldValue("pendingImages", Array.from(event.target.files));
              }}
              innerRef={fieldRef}
            />
            {values.images && (
              <Images
                images={values.images}
                editCallback={(id) => {
                  setEditingImage(id);
                }}
                deleteCallback={async (id) => {
                  setFieldValue(
                    "images",
                    values.images.filter((image) => image.id !== id)
                  );
                  await ky.delete(`http://localhost:3000/api/image/${id}`);
                  toast.success("Image deleted!");
                }}
              />
            )}
            <Button disabled={isSubmitting}>
              {isSubmitting ? "Saving changes..." : "Save changes"}
            </Button>
          </form>
        )}
      </Formik>
      <AnimatePresence>
        {editingImage && (
          <EditImage
            image={images.find(({ id }) => id === editingImage)}
            overlayRef={overlayRef}
            closeCallback={() => {
              setEditingImage(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Edit;
