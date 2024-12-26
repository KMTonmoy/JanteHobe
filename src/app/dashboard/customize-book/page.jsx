import React from 'react';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="w-full p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Customize Class</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-3 text-left">Class</th>
              <th className="px-6 py-3 text-left">Total Chapters</th>

              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {['6', '7', '8', '9', '10'].map((id) => (
              <tr key={id} className="border-t">
                <td className="px-6 py-4 text-lg">{`Class ${id}`}</td>
                <td className="px-6 py-4 text-lg">N/A</td>

                <td className="px-6 py-4">
                  <Link href={`/dashboard/customize-book/${id}`}>
                    <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:bg-indigo-700 focus:outline-none">
                      Read
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
