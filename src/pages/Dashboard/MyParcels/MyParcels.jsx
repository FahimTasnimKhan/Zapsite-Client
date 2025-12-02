import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import UseAuth from "../../../hooks/UseAuth";
import useAxioxSecure from "../../../hooks/useAxioxSecure";
import { FiEdit } from "react-icons/fi";
import { FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxioxSecure();
  const queryClient = useQueryClient();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, // prevents running before user is loaded
  });

  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your parcel has been deleted.", "success");

            queryClient.invalidateQueries(["my-parcels", user?.email]);
          }
        });
      }
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">
        All of My Parcels: {parcels.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel["Parcel Name"]}</td>
                <td>${parcel.cost}</td>
                <td>{parcel.paymentStatus || "Pending"}</td>
                <td className="flex gap-2">
                  <button className="btn btn-sm hover:bg-primary">
                    Edit <FiEdit />
                  </button>

                  <button className="btn btn-sm hover:bg-primary">
                    View Details <FaMagnifyingGlass />
                  </button>

                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="btn btn-sm hover:bg-primary"
                  >
                    Delete <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
