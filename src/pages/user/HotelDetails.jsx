import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <UserLayout>
      <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-slate-950 mb-2">Hotel Details Redesign</h1>
          <p className="text-slate-500 text-sm mb-6">
            We are preparing this page for a complete redesign. First we will add the data and structure.
          </p>
          <div className="bg-slate-50 p-4 rounded-xl text-left text-xs font-mono text-slate-600 mb-6 space-y-2">
            <div>
              <span className="font-semibold text-slate-400">Hotel ID:</span> {id}
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition-all text-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    </UserLayout>
  );
};

export default HotelDetails;
