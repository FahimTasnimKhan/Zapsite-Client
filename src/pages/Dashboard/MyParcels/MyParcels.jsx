import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAuth from "../../../hooks/UseAuth";
import useAxioxSecure from "../../../hooks/useAxioxSecure";
import { CiDeliveryTruck } from "react-icons/ci";
const MyParcels = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxioxSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const rest = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return rest.data;
    },
  });

  return (
    <div>
      <h2 className="text-3xl font-bold">
        All of My Parcels: {parcels.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
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
            {/* row 1 */}
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel["Parcel Name"]}</td>
                <td>{parcel["cost"]}</td>
                <td>Blue</td>
                <td>Blue</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
