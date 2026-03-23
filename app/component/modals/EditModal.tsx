"use client";

import { motion, AnimatePresence } from "framer-motion";
import styles from "./editModal.module.css";

export default function EditModal({
  isOpen,
  onClose,
  onSave,
  form,
  setForm,
}: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.7, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className={styles.title}>Edit Department</h2>

            <input
              className={styles.input}
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Department Name"
            />

            <input
              className={styles.input}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Description"
            />

            <div className={styles.actions}>
              <button
                onClick={onSave}
                className={`${styles.button} ${styles.save}`}
              >
                Save
              </button>

              <button
                onClick={onClose}
                className={`${styles.button} ${styles.cancel}`}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}