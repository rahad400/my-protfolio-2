"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaArrowUpRightFromSquare,
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaPaperPlane,
  FaWhatsapp,
} from "react-icons/fa6";
import { RiLoader5Line } from "react-icons/ri";
import { contactInfo } from "@/data/contact";
import SectionTitle from "@/components/ui/SectionTitle";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type FieldStatus = "idle" | "validating" | "opened" | "error";

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.subject.trim()) errors.subject = "Please enter a subject.";
  if (values.message.trim().length < 10) {
    errors.message = "Please write a message of at least 10 characters.";
  }
  return errors;
}

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FieldStatus>("idle");
  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const reveal = (delay: number = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  const updateField = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (status !== "idle") setStatus("idle");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("validating");

    // No backend: open the visitor's mail client with a prefilled message.
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      "",
      values.message.trim(),
    ].join("\n");

    const mailto = `mailto:${contactInfo.email}?subject=${encodeURIComponent(
      values.subject.trim(),
    )}&body=${encodeURIComponent(body)}`;

    // Use a temporary anchor — window.location.assign() triggers ESLint
    // no-location-assign-relative-destination (this is a mailto:, not an in-app route).
    const anchor = document.createElement("a");
    anchor.href = mailto;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setStatus("opened");
  };

  const isSubmitting = status === "validating";
  const showNotice = status === "opened";

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-background/60 px-4 py-3 text-base text-white placeholder:text-secondary/60 focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none ${
      hasError ? "border-red-500/70" : "border-border focus:border-neon/60"
    }`;

  const fieldError = (field: keyof FormValues) =>
    touched[field] && errors[field] ? errors[field] : undefined;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_70%_10%,rgba(194,248,0,0.06),transparent_70%)]"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Get in touch"
          title="Contact Me"
          description="Have a project in mind or just want to say hello? Fill out the form — it opens your email client ready to send."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left — contact info */}
          <div className="space-y-4">
            <motion.a
              {...reveal(0)}
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-neon/50 hover:bg-card focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background/60 text-neon">
                <FaEnvelope className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-mono text-xs tracking-[0.25em] text-secondary uppercase">
                  Email
                </span>
                <span className="mt-1 block text-base font-medium text-white">
                  rahad5609@gmail.com
                </span>
              </span>
              <FaArrowUpRightFromSquare
                className="ml-auto size-4 shrink-0 text-secondary"
                aria-hidden="true"
              />
            </motion.a>

            <motion.a
              {...reveal(0.1)}
              href={contactInfo.github}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-neon/50 hover:bg-card focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background/60 text-neon">
                <FaGithub className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-mono text-xs tracking-[0.25em] text-secondary uppercase">
                  GitHub
                </span>
                <span className="mt-1 block text-base font-medium text-white">
                  github.com — @rahad400
                </span>
              </span>
              <FaArrowUpRightFromSquare
                className="ml-auto size-4 shrink-0 text-secondary"
                aria-hidden="true"
              />
            </motion.a>

            <motion.a
              {...reveal(0.2)}
              href={contactInfo.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-neon/50 hover:bg-card focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background/60 text-neon">
                <FaLinkedinIn className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-mono text-xs tracking-[0.25em] text-secondary uppercase">
                  LinkedIn
                </span>
                <span className="mt-1 block text-base font-medium text-white">
                  linkedin.com — in/rahad10
                </span>
              </span>
              <FaArrowUpRightFromSquare
                className="ml-auto size-4 shrink-0 text-secondary"
                aria-hidden="true"
              />
            </motion.a>

            <motion.a
              {...reveal(0.3)}
              href={contactInfo.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-neon/50 hover:bg-card focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background/60 text-neon">
                <FaWhatsapp className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-mono text-xs tracking-[0.25em] text-secondary uppercase">
                  WhatsApp
                </span>
                <span className="mt-1 block text-base font-medium text-white">
                  Chat on WhatsApp
                </span>
              </span>
              <FaArrowUpRightFromSquare
                className="ml-auto size-4 shrink-0 text-secondary"
                aria-hidden="true"
              />
            </motion.a>

            {/* <motion.p
              {...reveal(0.4)}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card/40 px-5 py-4 text-sm leading-relaxed text-secondary"
            >
              <FaInfo className="mt-0.5 size-4 shrink-0 text-neon" aria-hidden="true" />
              This form doesn&apos;t send messages directly — it opens your email client so
              you can review and send. Replace the placeholder URLs in{" "}
              <code className="rounded bg-background px-1 py-0.5 font-mono text-xs text-neon">
                src/data/contact.ts
              </code>
              .
            </motion.p> */}
          </div>

          {/* Right — form */}
          <motion.form
            {...reveal(0.15)}
            onSubmit={onSubmit}
            noValidate
            aria-describedby={showNotice ? "contact-notice" : undefined}
            className="space-y-5 rounded-3xl border border-border bg-card/60 p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={values.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                  aria-invalid={Boolean(fieldError("name"))}
                  aria-describedby={
                    fieldError("name") ? "contact-name-error" : undefined
                  }
                  className={inputClass(Boolean(fieldError("name")))}
                />
                {fieldError("name") ? (
                  <p
                    id="contact-name-error"
                    role="alert"
                    className="mt-2 text-sm text-red-400"
                  >
                    {fieldError("name")}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, email: true }))
                  }
                  aria-invalid={Boolean(fieldError("email"))}
                  aria-describedby={
                    fieldError("email") ? "contact-email-error" : undefined
                  }
                  className={inputClass(Boolean(fieldError("email")))}
                />
                {fieldError("email") ? (
                  <p
                    id="contact-email-error"
                    role="alert"
                    className="mt-2 text-sm text-red-400"
                  >
                    {fieldError("email")}
                  </p>
                ) : null}
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="mb-2 block text-sm font-medium text-white"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="Project inquiry"
                value={values.subject}
                onChange={(e) => updateField("subject", e.target.value)}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, subject: true }))
                }
                aria-invalid={Boolean(fieldError("subject"))}
                aria-describedby={
                  fieldError("subject") ? "contact-subject-error" : undefined
                }
                className={inputClass(Boolean(fieldError("subject")))}
              />
              {fieldError("subject") ? (
                <p
                  id="contact-subject-error"
                  role="alert"
                  className="mt-2 text-sm text-red-400"
                >
                  {fieldError("subject")}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm font-medium text-white"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Tell me about your project..."
                value={values.message}
                onChange={(e) => updateField("message", e.target.value)}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, message: true }))
                }
                aria-invalid={Boolean(fieldError("message"))}
                aria-describedby={
                  fieldError("message") ? "contact-message-error" : undefined
                }
                className={`${inputClass(Boolean(fieldError("message")))} resize-y`}
              />
              {fieldError("message") ? (
                <p
                  id="contact-message-error"
                  role="alert"
                  className="mt-2 text-sm text-red-400"
                >
                  {fieldError("message")}
                </p>
              ) : null}
            </div>

            {status === "error" && Object.keys(errors).length > 0 ? (
              <p
                role="alert"
                className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                Please fix the highlighted fields and try again.
              </p>
            ) : null}

            {showNotice ? (
              <p
                id="contact-notice"
                role="status"
                className="rounded-xl border border-neon/40 bg-neon/10 px-4 py-3 text-sm text-neon"
              >
                Your email client should have opened with your message
                prefilled. Press send there to deliver it — nothing is sent from
                this website.
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-neon px-6 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <RiLoader5Line
                    className="size-4 animate-spin"
                    aria-hidden="true"
                  />
                  Opening your email client...
                </>
              ) : (
                <>
                  Send message
                  <FaPaperPlane className="size-4" aria-hidden="true" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
