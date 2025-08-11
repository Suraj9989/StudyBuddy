import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

const ParamPage = () => {
  const location = useLocation();
  const { title, author, year, image, id, workKey } = location.state;
  const [details, setDetails] = useState(null);



  return (
    <div>
    <Header />
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/3">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        <div className="md:w-2/3 p-6">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Author:</span> {author}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">First Published:</span> {year}
          </p>

          {details && (
            <div className="mt-4">
              <span className="font-semibold">Description:</span>{" "}
              {typeof details.description === "string"
                ? details.description
                : details.description.value}
            </div>
          )}

          {details && (
            <div className="mt-4">
              <span className="font-semibold">Subjects:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {details.subjects.slice(0, 8).map((subject, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-4 justify-center">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Read PDF
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ParamPage;
