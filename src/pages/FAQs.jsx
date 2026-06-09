import { useState } from "react";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Browse our collections, select your preferred size and color, then click Add to Cart. When you are ready, go to Cart and proceed to Checkout to complete your purchase.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept UPI, credit and debit cards (Visa, Mastercard, RuPay), net banking, popular wallets, and Cash on Delivery (COD) for eligible orders.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive an email and SMS with a tracking link. You can also view real-time status under My Orders in your account.",
  },
  {
    question: "What is your return policy?",
    answer:
      "You can return items within 7 days of delivery. Products must be unused, unwashed, and have all original tags attached.",
  },
  {
    question: "How do I find my correct size?",
    answer:
      "Each product page includes a detailed Size Guide with body measurements in inches and centimeters.",
  },
  {
    question: "Do you offer cash on delivery?",
    answer:
      "Yes, COD is available for most locations and orders under a certain value.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Standard delivery takes 3-7 business days depending on your location.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Orders can be modified or cancelled within 1 hour of placement.",
  },
  {
    question: "Are the colors shown accurate?",
    answer:
      "We photograph products under professional lighting to represent colors as accurately as possible.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "Reach us via the Contact Us page, email at support@fashionhub.com.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 lg:py-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl lg:text-4xl font-bold mb-3">
          Frequently Asked Questions
        </h1>

        <p className="text-gray-500">
          Everything you need to know about shopping with FashionHub.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            <button
              className="w-full text-left px-5 py-4 bg-gray-50 hover:bg-gray-100 font-medium flex justify-between items-center"
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >
              <span>{faq.question}</span>
              <span>{openIndex === index ? "-" : "+"}</span>
            </button>

            {openIndex === index && (
              <div className="px-5 py-4 text-gray-600 bg-white">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;