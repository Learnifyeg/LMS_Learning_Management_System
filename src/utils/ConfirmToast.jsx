import React from "react";
import toast from "react-hot-toast";
// import api from "@/API/Config";

/**
 * ConfirmToast - a reusable toast confirmation modal1
 *
 * @param {Object} props
 * @param {string} props.message - Message to display
 * @param {Function} props.onConfirm - Callback when confirmed
 * @param {Function} [props.onCancel] - Optional cancel callback
 */
const ConfirmToast = ({ message, onConfirm, onCancel }) => {
  if (!message) return null;
  return (
    <div className=" bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col gap-3 animate-fade-in z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <p className="text-gray-800 dark:text-gray-200">{message}</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            toast.dismiss();
            if (onCancel) onCancel();
          }}
          className="px-3 py-1 text-sm rounded-md bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            toast.dismiss();
            onConfirm();
          }}
          className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmToast;
