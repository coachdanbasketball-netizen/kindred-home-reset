import { motion } from "motion/react";
import { FadeUp } from "../app/components/FadeUp";
import { Label } from "../app/components/Label";
import { ease } from "../app/data/content";

const SECTIONS = [
  { title: "Booking & Cancellations", body: "We ask for at least 48 hours notice for cancellations or rescheduling. Cancellations within 24 hours may be subject to a partial service fee. If something comes up, please reach out as soon as you can and we'll do our best to accommodate you." },
  { title: "Privacy & Confidentiality", body: "Everything we see, sort, and handle in your home stays between us. We never share client information, take photographs without explicit permission, or discuss your situation outside our team." },
  { title: "Donations & Disposal", body: "We prioritize finding new homes for items through local charities and donation centers. Resale assistance is handled per the terms discussed during your consultation. We prioritize sustainability at every step." },
  { title: "Payment", body: "Payment is due at time of service unless otherwise arranged. We accept cash, check, and most major credit cards. Flexible payment plans may be available for larger projects — ask during your consultation." },
  { title: "Our Responsibility", body: "We handle your belongings with the utmost care. In the rare event of accidental damage, please notify us within 24 hours and we will work to make it right. We are fully insured." },
  { title: "Photography & Testimonials", body: "We may ask permission to photograph before-and-after results. Sharing photos is always optional — we will never post anything without your explicit written consent." },
  { title: "Service Area", body: "We primarily serve the greater metro area. If you're unsure whether we reach your location, please contact us and we'll do our best to help or refer you to a trusted colleague." },
];

export default function PolicyPage() {
  return (
    <div className="pt-[73px]">
      <div className="py-16 border-b border-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <FadeUp>
            <Label>Policy</Label>
            <h1 className="font-display text-4xl font-semibold text-foreground">Our Policies</h1>
          </FadeUp>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-12">
        {SECTIONS.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease, delay: i * 0.05 }}
            viewport={{ once: true }}
            className={`py-10 ${i < SECTIONS.length - 1 ? "border-b border-border" : ""}`}
          >
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">{section.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{section.body}</p>
          </motion.div>
        ))}
        <p className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground">
          Last updated: July 2025. Policies subject to change — please check back periodically or contact us with questions.
        </p>
      </div>
    </div>
  );
}
