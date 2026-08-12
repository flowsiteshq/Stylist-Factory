import WebsiteLayout from "@/components/WebsiteLayout";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  { q: "How do I book an appointment?", a: "Simply browse salons or services, select your preferred time slot, and confirm your booking. You'll receive an instant confirmation via email and SMS." },
  { q: "Can I cancel or reschedule my appointment?", a: "Yes, you can cancel or reschedule up to 2 hours before your appointment at no charge. Late cancellations may incur a fee depending on the salon's policy." },
  { q: "How do I pay for services?", a: "We accept all major credit/debit cards, Apple Pay, Google Pay, and StylistFactory Wallet. Payment is processed securely at the time of booking." },
  { q: "How do I list my salon on StylistFactory?", a: "Click 'List Your Salon' and complete the registration form. Our team will review your application within 24-48 hours and get you set up." },
  { q: "What is StylistFactory Wallet?", a: "The Wallet lets you store credits, receive refunds, and pay for services instantly. You can top up your wallet using any payment method." },
  { q: "How are freelance stylists vetted?", a: "All freelancers go through a background check, portfolio review, and skills assessment before being listed on our platform." },
  { q: "Is my personal information secure?", a: "Absolutely. We use bank-level encryption to protect all personal and payment data. We never sell your information to third parties." },
  { q: "How do I contact customer support?", a: "You can reach us via live chat in the app, email at hello@stylistfactory.com, or call (832) 833-5383 during business hours." },
];

export default function WebsiteFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <WebsiteLayout>
      <section className="bg-gradient-to-br from-teal-800 to-teal-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Frequently Asked Questions</h1>
          <p className="text-teal-100">Find answers to the most common questions about StylistFactory</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 text-sm pr-4">{faq.q}</span>
                  {openIdx === idx ? (
                    <ChevronUp className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openIdx === idx && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 bg-teal-50 rounded-2xl p-6 text-center border border-teal-100">
            <h3 className="font-semibold text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-sm text-gray-500 mb-4">Our support team is here to help you</p>
            <a href="/website/contact">
              <button className="bg-teal-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-teal-700 transition-colors text-sm">
                Contact Support
              </button>
            </a>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
