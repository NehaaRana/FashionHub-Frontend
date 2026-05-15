import React from "react";

const steps = [
  "Address",
  "Payment",
  "Confirmation",
];

const CheckoutStepper = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center gap-4 mb-12 flex-wrap">
      {steps.map((step, index) => (
        <div
          key={step}
          className="flex items-center gap-3"
        >
          <div
            className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm font-semibold
            ${
              index + 1 <= currentStep
                ? "bg-black text-white border-black"
                : "bg-white text-gray-500 border-gray-300"
            }`}
          >
            {index + 1}
          </div>

          <span
            className={`text-sm ${
              index + 1 <= currentStep
                ? "text-black"
                : "text-gray-500"
            }`}
          >
            {step}
          </span>

          {index < steps.length - 1 && (
            <div className="w-14 h-[1px] bg-gray-300 ml-2" />
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckoutStepper;