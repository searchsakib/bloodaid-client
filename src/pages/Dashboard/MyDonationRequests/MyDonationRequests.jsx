import { Helmet } from 'react-helmet-async';
import useAuth from '../../../hooks/useAuth';
import { Link, useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import useDonationReqs from '../../../hooks/useDonationReqs';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyDonationRequests = () => {
  // const { user } = useAuth();

  const [donationReqs, refetch, isLoading] = useDonationReqs();
  console.log('This is donation req', donationReqs);
  const axiosSecure = useAxiosSecure();

  //! Delete Functionality
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/dashboard/create-donation-request/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
              });
            }
          });
      }
    });
  };

  if (isLoading)
    return (
      <span className="loading loading-bars text-red-500 loading-lg"></span>
    );

  // const myDonationReqs = useLoaderData();
  // const [theDonationReqs, setTheDonationReqs] = useState([]);
  // console.log(myDonationReqs);

  return (
    <div>
      {/* <div className="text-3xl text-center py-5">
        Data fetched here: {donationReqs.length}
      </div> */}
      {/* mock data  */}

      <div className="rounded-lg border border-gray-200">
        <Helmet>
          <title>Blood Aid | My Donation Requests</title>
        </Helmet>
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  #
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Recipient Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Recipient Location
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Donation Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Donation Time
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Donation Status
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Donor Info
                </th>
              </tr>
            </thead>

            {donationReqs?.map((perDonationReq, index) => (
              <tbody
                key={perDonationReq?._id}
                className="divide-y divide-gray-200"
              >
                <tr>
                  <th>{index + 1}</th>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {perDonationReq?.recipient_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    <p>{perDonationReq?.recipient_upazila},</p>
                    <p> {perDonationReq?.recipient_district} </p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {perDonationReq?.donation_date}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {perDonationReq?.donation_time}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 flex flex-col gap-3">
                    <button className="btn btn-xs rounded-none bg-[#2161a2] text-white hover:bg-[#1b4978]">
                      Done
                    </button>
                    <button className="btn btn-xs rounded-none bg-[#2161a2] text-white hover:bg-[#1b4978]">
                      Canceled
                    </button>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    <p> {perDonationReq?.requester_name} </p>
                    <p> {perDonationReq?.requester_email} </p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <Link
                      to={`/dashboard/my-donation-requests-update/${perDonationReq?._id}`}
                    >
                      <button className="btn btn-sm rounded-none bg-[#2161a2] text-white hover:bg-[#1b4978]">
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <button
                      onClick={() => handleDelete(perDonationReq?._id)}
                      className="btn btn-sm rounded-none bg-[#d33] text-white hover:bg-[#ac2828]"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <Link
                      to={`/dashboard/donation-details/${perDonationReq?._id}`}
                    >
                      <button className="btn btn-sm rounded-none bg-[#2161a2] text-white hover:bg-[#1b4978]">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>

        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
          <ol className="flex justify-end gap-1 text-xs font-medium">
            <li>
              <a
                href="#"
                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Prev Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>

            <li className="block h-8 w-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
              1
            </li>

            <li>
              <a
                href="#"
                className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
              >
                2
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
              >
                3
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
              >
                4
              </a>
            </li>

            <li>
              <a
                href="#"
                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Next Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default MyDonationRequests;
