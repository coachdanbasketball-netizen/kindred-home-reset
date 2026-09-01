import { FadeUp } from "../app/components/FadeUp";
import { Label } from "../app/components/Label";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../app/components/ui/accordion";

const FAQS = [
  { question: "Placeholder question 1?", answer: "Placeholder answer coming soon." },
  { question: "Placeholder question 2?", answer: "Placeholder answer coming soon." },
  { question: "Placeholder question 3?", answer: "Placeholder answer coming soon." },
  { question: "Placeholder question 4?", answer: "Placeholder answer coming soon." },
  { question: "Placeholder question 5?", answer: "Placeholder answer coming soon." },
];

export default function FAQPage() {
  return (
    <div className="pt-[73px]">
      <div className="py-16 border-b border-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <FadeUp>
            <Label>FAQ</Label>
            <h1 className="font-display text-4xl font-semibold text-foreground">Frequently Asked Questions</h1>
          </FadeUp>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-12">
        <FadeUp>
          <Accordion type="single" collapsible>
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="font-display text-lg text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeUp>
        <p className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground">
          Don't see your question here? Reach out and we'll be happy to help.
        </p>
      </div>
    </div>
  );
}
