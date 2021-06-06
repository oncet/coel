import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import BinIcon from "../components/icons/bin";
import Button from "./button";

export default function Images({ images, deleteCallback }) {
  return (
    <ul>
      <AnimatePresence>
        {images.map(({ id, originalName, path }) => (
          <motion.li
            key={id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="text-white rounded mb-3 overflow-hidden bg-center bg-cover shadow-lg"
            style={{
              backgroundImage: `url(${path})`,
            }}
          >
            <div className="px-3 py-2 bg-black bg-opacity-60 flex space-x-2 items-center justify-between">
              <div className="min-w-0 overflow-hidden overflow-ellipsis">
                <Link href={`/image/${id}/edit`}>
                  <a className="text-blue-200">{originalName}</a>
                </Link>
              </div>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  className="shadow w-auto bg-red-400 rounded-full px-2 py-2"
                  onClick={() => {
                    deleteCallback(id);
                  }}
                >
                  <BinIcon />
                </Button>
              </div>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
