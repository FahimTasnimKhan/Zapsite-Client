import React from "react";
import { FiMessageSquare } from "react-icons/fi";

const ReviewCard = ({ review }) => {
  const { userName, review: testimonial, user_photoURL } = review;
  return (
    <div className="max-w-md mx-auto p-6 rounded-xl shadow-md bg-base-100 border border-green-400">
      <div className="flex items-start gap-2">
        <FiMessageSquare className="text-2xl text-primary/80" />
        <p className="text-sm text-base-content/80 leading-relaxed">
          {testimonial}
        </p>
      </div>

      <div className="my-4 border-t border-dashed"></div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-neutral rounded-full">
          <img src={user_photoURL} alt="" />
        </div>
        <div>
          <h3 className="font-semibold text-base-content">{userName}</h3>
          <p className="text-xs text-base-content/70">
            Senior Product Designer
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
