"use client";

import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ hiringData, userEmail, closeModal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [cardError, setCardError] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (hiringData?.rate > 0) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fee: hiringData.rate }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then((data) => setClientSecret(data.clientSecret))
        .catch((err) => console.error("Error creating intent:", err));
    }
  }, [hiringData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    setProcessing(true);
    setCardError('');

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: hiringData?.clientName || 'Anonymous Client',
          email: userEmail || 'unknown@mail.com',
        },
      },
    });

    if (error) {
      setCardError(error.message);
      setProcessing(false);
    } else {
      if (paymentIntent.status === 'succeeded') {
      
        const paymentPayload = {
          transactionId: paymentIntent.id,
          email: userEmail || hiringData.clientEmail,
          amount: hiringData.rate,
          date: new Date(),
          hiringId: hiringData._id, 
        };

        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/payments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(paymentPayload),
        })
          .then((res) => res.json())
          .then((data) => {
            setProcessing(false);
            if (data.success) {
              alert(`Payment Successful! TxID: ${paymentIntent.id}`);
              closeModal(); 
            }
          })
          .catch((err) => {
            console.error("Error recording payment:", err);
            setProcessing(false);
          });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border border-white/[0.1] p-3.5 rounded-xl bg-black/40">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '14px',
                color: '#ffffff',
                '::placeholder': { color: 'rgba(255,255,255,0.3)' },
              },
              invalid: { color: '#ef4444' },
            },
          }}
        />
      </div>
      
      {cardError && <p className="text-red-400 text-xs font-medium">{cardError}</p>}
      
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="w-full py-3 text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#05E599] to-[#9D4EDD] text-white rounded-xl shadow-lg cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        {processing ? 'Processing Secure Settlement...' : `Authorize & Pay $${hiringData.rate}`}
      </button>
    </form>
  );
};

export default CheckoutForm;