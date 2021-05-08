import { Formik } from "formik";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import * as Yup from "yup";
import Head from "next/head";
import ky from "ky";
import { useSession, getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";
import BlockField from "../../../components/block-field";
import Field from "../../../components/field";
import Button from "../../../components/button";
import Images from "../../../components/images";

export async function getServerSideProps({ params, ...context }) {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

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
  const [session] = useSession();
  const router = useRouter();
  const fieldRef = useRef();

  if (!session) {
    return (
      <>
        <Head>
          <title>Edit product</title>
        </Head>
        <h1>Edit product</h1>
        <p>
          <Link
            href={`/auth?redirect=http://localhost:3000/${router.locale}/product/${router.query.id}/edit`}
          >
            <a>Sign in</a>
          </Link>{" "}
          to view this page.
        </p>
      </>
    );
  }

  // TODO Still need this?
  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  const { id, name, slug, description, isPublic, images } = product;

  const handleFormSubmit = async (
    { images, pendingImages, ...json },
    { setFieldValue }
  ) => {
    try {
      await ky.put(`http://localhost:3000/api/product/${id}`, {
        json,
      });

      // Reset "images" field
      fieldRef.current.value = "";

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
    } catch (error) {
      toast.error(`Product update failed: ${error.message}`);
    }
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
      <h1>Edit product</h1>
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
    </>
  );
};

export default Edit;
