import { Formik } from "formik";
import { motion } from "framer-motion";
import ky from "ky";
import { toast } from "react-toastify";
import BlockField from "./block-field";
import Button from "./button";

export default function EditImage({ image, overlayRef, closeCallback }) {
  const { id, originalName, fileName, alt } = image;

  const handleFormSubmit = (json) => {
    ky.put(`http://localhost:3000/api/image/${id}`, {
      json,
    });

    toast.success("Image updated!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="bg-black bg-opacity-75 fixed top-0 left-0 right-0 bottom-0 overflow-y-auto"
      onClick={(event) => {
        if (event.target === overlayRef.current) closeCallback(event);
      }}
      ref={overlayRef}
    >
      <div className="bg-white dark:bg-gray-800 dark:text-white shadow-lg">
        <div className="flex justify-between items-center p-2">
          <h2 className="m-0">Edit image</h2>
          <button className="inline-block w-auto" onClick={closeCallback}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6  text-black dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p className="px-2 mt-0 mb-3 break-all">{originalName}</p>
        <img src={`/uploads/images/${fileName}`} className="mb-2" />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={{
            alt: alt,
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="px-2 pb-3">
              <BlockField
                label="Alternative text"
                name="alt"
                as="textarea"
                required
              />
              <Button>Save changes</Button>
            </form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
}
