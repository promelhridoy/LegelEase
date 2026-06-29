"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'; 

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PaymentModal = ({ hiringData, userEmail, closeModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#090D16] border border-white/[0.1] w-full max-w-md p-6 rounded-2xl shadow-2xl relative space-y-4 text-white"
      >
        <div className="flex justify-between items-center border-b border-white/[0.05] pb-3">
          <h3 className="text-lg font-black tracking-wide">Complete Your Payment</h3>
          <button 
            onClick={closeModal}
            className="text-white/40 hover:text-white text-sm bg-white/5 px-2.5 py-1 rounded-md transition-all"
          >
            ✕
          </button>
        </div>

        <div>
          <p className="text-xs text-white/50">Counsel Services Retainer For</p>
          <p className="text-sm font-bold text-white">{hiringData?.lawyerName}</p>
          <div className="mt-2 flex justify-between bg-white/[0.02] p-3 rounded-xl border border-white/[0.03]">
            <span className="text-xs text-white/60">Amount Due:</span>
            <span className="font-mono font-bold text-sm text-[#05E599]">${hiringData?.rate}</span>
          </div>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm hiringData={hiringData} userEmail={userEmail} closeModal={closeModal} />
        </Elements>
      </motion.div>
    </div>
  );
};

export default PaymentModal;