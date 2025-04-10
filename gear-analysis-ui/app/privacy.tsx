"use client";

import React from "react";

interface Privacy {
  show: boolean;
  onClose: () => void;
}

const Privacy = ({ show, onClose }: Privacy) => {
    if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full mx-4 text-black">
        <h2 className="text-2xl font-bold mb-4">Privacy Notice</h2>
        <p className="mb-2">
          This website uses Vercel Analytics to collect anonymous usage statistics such as page views and device/browser information. No personally identifiable information is collected, stored, or shared.
        </p>
        <p className="mb-2">
          Uploaded FIT files are processed temporarily on the server to provide analysis results. They are not stored or logged in any way.
        </p>
        <p className="mb-4">
          No cookies or marketing trackers are used.
        </p>
        <p className="mb-4">
          Questions? find me in discord Siim#6032 or instagram @siimkisk
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Privacy;