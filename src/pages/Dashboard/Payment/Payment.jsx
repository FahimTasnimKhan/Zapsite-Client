import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxioxSecure from "../../../hooks/useAxioxSecure";

const Payment = () => {
  // Getting the id using useParams
  const { parcelId } = useParams();
  const axiosSecure = useAxioxSecure();
  // Loading the data using the ID given
  const { data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel["Sender Email"],
      parcelName: parcel["Parcel Name"],
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };
  if (!parcel) return <p>Loading...</p>;

  return (
    <div>
      <h2>Please Pay {parcel["Parcel Name"]}</h2>
      <h2>Total cost of your order is : {parcel["cost"]}</h2>
      <button onClick={handlePayment} className="btn btn-primary text-black">
        Pay
      </button>
    </div>
  );
};

export default Payment;
