import React from "react";
import { useForm, Watch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxioxSecure from "../../hooks/useAxioxSecure";

const Sendparcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm();
  const axiosSecure = useAxioxSecure();
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const senderRegion = watch("Sendersregion"); // To find what was the Sendersregion in order to find out the region Sender selected
  const recieverRegion = watch("Recieversregion");
  const districtByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region); //Selecting every JSON OBJECT WITH THE SAME REGION
    const districts = regionDistricts.map((d) => d.district); //Mapping every districts for the selected region

    return districts;
  };
  const handleSendPacel = (data) => {
    let cost = 0;
    let mincharge = 0;
    let extracharge = 0;
    const parceltype = data.Parceltype;
    const parcelWeight = parseFloat(data.ParcelWeight);
    if (parceltype == "document") {
      if (data.Senders_District === data.Recievers_District) {
        cost = 60;
      } else {
        cost = 80;
      }
    } else {
      if (data.ParcelWeight < 3) {
        if (data.Senders_District === data.Recievers_District) {
          cost = 110;
        } else {
          cost = 150;
        }
      } else {
        if (data.Senders_District === data.Recievers_District) {
          let mincharge = 110;
          let extracharge = 40 * (parcelWeight - 3);
          cost = mincharge + extracharge;
        } else {
          mincharge = 150;
          extracharge = 40 * (parcelWeight - 3) + 40;
          cost = mincharge + extracharge;
        }
      }
    }
    Swal.fire({
      title: "Are you sure?",
      text: `The total cost for your parcel is ${cost}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm my order!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcel", data).then((res) => {
          console.log(res.data);
        });
        Swal.fire({
          title: "Success!",
          text: "Your order has been confirmed.",
          icon: "success",
        });
      }
    });
    console.log(data);
    console.log(cost);
    data.cost = cost;
  };

  return (
    <div className="">
      <h1 className="text-5xl font-bold">Send a Parcel</h1>
      <form
        className="mt-12 p-4"
        onSubmit={handleSubmit(handleSendPacel)}
        action=""
      >
        {/* Document */}
        <div>
          <label className="label mr-4">
            <input
              type="radio"
              {...register("Parceltype")}
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              {...register("Parceltype")}
              value="non-document"
              className="radio"
            />
            Non-Document
          </label>
          <br />
        </div>
        {/* parcel info:name,weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 col-gap-12 gap-12 pb-4">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("Parcel Name")}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight</label>
            <input
              type="number"
              {...register("ParcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>
        <hr className="p-2" />
        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-4">
          {/* Sender info */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Sender Details</h4>
            {/* Sender Name */}
            <label className="label text-black font-semibold text-[14px]">
              Sender Name
            </label>
            <input
              type="text"
              {...register("Sender Name")}
              className="input w-full"
              placeholder="Sender Name"
            />
            {/* Sender Email */}
            <label className="label text-black font-semibold text-[14px]">
              Sender Email
            </label>
            <input
              type="email"
              {...register("Sender Email")}
              className="input w-full"
              placeholder="Sender Email"
            />

            {/* Sender Region */}
            {/* Here we simply map a set containing all the unique regions found in the JSON data */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Regiom</legend>
              <select
                {...register("Sendersregion")}
                defaultValue="Pick a region"
                className="select"
              >
                <option disabled={true}>Pick a region</option>

                {regions.map((region, i) => (
                  <option key={i} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <span className="label">Optional</span>
            </fieldset>

            {/* Sender District */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender District</legend>
              <select
                {...register("Senders_District")}
                defaultValue="Pick a District"
                className="select"
              >
                <option disabled={true}>Pick a District</option>

                {districtByRegion(senderRegion).map((region, i) => (
                  <option key={i} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Sender Address */}
            <label className="label text-black font-semibold text-[14px]">
              Sender Address
            </label>
            <input
              type="text"
              {...register("Sender Address")}
              className="input w-full"
              placeholder="Sender Address"
            />
          </fieldset>

          {/* Reciever info */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Reciever Details</h4>
            {/* Reciever Name */}
            <label className="label text-black font-semibold text-[14px]">
              Reciever Name
            </label>
            <input
              type="text"
              {...register("Reciever Name")}
              className="input w-full"
              placeholder="Reciever Name"
            />
            {/* Reciever Email */}
            <label className="label text-black font-semibold text-[14px]">
              Reciever Email
            </label>
            <input
              type="email"
              {...register("Reciever Email")}
              className="input w-full"
              placeholder="Reciever Email"
            />

            {/* Reciever Region */}
            {/* Here we simply map a set containing all the unique regions found in the JSON data */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Reciever Regiom</legend>
              <select
                {...register("Recieversregion")}
                defaultValue="Pick a region"
                className="select"
              >
                <option disabled={true}>Pick a region</option>

                {regions.map((region, i) => (
                  <option key={i} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <span className="label">Optional</span>
            </fieldset>

            {/* Sender District */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Reciever District</legend>
              <select
                {...register("Recievers_District")}
                defaultValue="Pick a District"
                className="select"
              >
                <option disabled={true}>Pick a District</option>

                {districtByRegion(recieverRegion).map((region, i) => (
                  <option key={i} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Reciever Address */}
            <label className="label text-black font-semibold text-[14px]">
              Reciever Address
            </label>
            <input
              type="text"
              {...register("Reciever Address")}
              className="input w-full"
              placeholder="Reciever Address"
            />
          </fieldset>
        </div>
        <input
          type="submit"
          value="Send Parcel"
          className="btn btn-primary text-black "
        />
        {/*  */}
      </form>
    </div>
  );
};

export default Sendparcel;
