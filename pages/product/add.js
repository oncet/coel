import { Formik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import * as Yup from "yup";
import Head from "next/head";
import ky from "ky";
import { useSession, getSession } from "next-auth/client";
import * as dayjs from "dayjs";
import BlockField from "../../components/block-field";
import Field from "../../components/field";
import Button from "../../components/button";

const Add = () => {
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
        </>
      );
    } catch {
      toast.error("Product not added :(");
    }
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
        {({ errors, handleSubmit, isSubmitting, touched, setFieldValue }) => (
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
                setFieldValue("images", Array.from(event.target.files));
              }}
            />
            <Button disabled={isSubmitting}>
              {isSubmitting ? "Adding product..." : "Add product"}
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Add;
