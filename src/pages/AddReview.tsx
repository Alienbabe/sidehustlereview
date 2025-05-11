import React, { useState } from 'react';
import ReviewForm from '../components/ReviewForm';

export default function AddReview() {
  const [submitted, setSubmitted] = useState(false);

  // Dummy handler for review submission
  const handleReviewSubmit = (review: any) => {
    setSubmitted(true);
    // Here you would send the review to your backend or Supabase
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-yellow-50 via-blue-50 to-white py-10">
      <div className="w-full max-w-xl">
        {submitted ? (
          <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center border border-blue-100">
            <span role="img" aria-label="party" className="text-5xl mb-2">🎉</span>
            <h2 className="text-2xl font-bold text-blue-700 mb-2">Thank you for your review!</h2>
            <p className="text-gray-600">Your feedback helps others discover great side hustles.</p>
          </div>
        ) : (
          <ReviewForm sideHustleId="general" onSubmit={handleReviewSubmit} />
        )}
      </div>
    </div>
  );
}
