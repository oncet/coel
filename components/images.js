import { motion, AnimatePresence } from "framer-motion";

import Button from "./button";

export default function Images({ images, deleteCallback }) {
  return (
    <ul>
      <AnimatePresence>
        {images.map(({ id, originalName, fileName }) => (
          <motion.li
            key={id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="text-white rounded mb-3 overflow-hidden bg-center bg-cover shadow-lg"
            style={{
              backgroundImage: `url(${`/uploads/images/${fileName}`})`,
            }}
          >
            <div className="px-3 py-2 bg-black bg-opacity-60 flex space-x-0.5 items-center justify-between">
              <div className="min-w-0 overflow-hidden overflow-ellipsis">
                {originalName}
              </div>
              <Button
                type="button"
                className="shadow w-auto bg-red-400 rounded-full px-2 py-2"
                onClick={() => {
                  deleteCallback(id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
