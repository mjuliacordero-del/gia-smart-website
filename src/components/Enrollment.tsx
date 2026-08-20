import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { enroll } from "../content";
import { Rise } from "./primitives";

export function Enrollment() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section id="enroll" className="relative overflow-hidden bg-fg py-28 text-bg sm:py-40">
      {/* ghost word */}
      <span
        className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none font-display font-semibold text-bg/[0.04]"
        style={{ fontSize: "clamp(7rem, 24vw, 24rem)", lineHeight: 0.8 }}
        aria-hidden
      >
        YES
      </span>

      <div className="relative mx-auto grid max-w-[1100px] grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <Rise>
          <p className="font-body text-[0.72rem] font-bold uppercase tracking-[0.24em] text-accent-light">
            {enroll.kicker}
          </p>
          <h2
            className="mt-5 font-editorial italic leading-[1.05]"
            style={{ fontSize: "clamp(2.4rem, 5.4vw, 4.4rem)" }}
          >
            {enroll.lead}
          </h2>
          <p className="mt-6 max-w-[46ch] text-[1.08rem] leading-relaxed text-bg/75">{enroll.body}</p>
          <p className="mt-8 font-display text-lg font-semibold text-accent-light">
            You were made to lead. You were made to invite.
          </p>
        </Rise>

        <Rise delay={0.12}>
          <div className="rounded-[16px] border border-bg/15 bg-bg/[0.04] p-8 backdrop-blur-sm sm:p-10">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex min-h-[16rem] flex-col justify-center text-center"
                >
                  <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-accent-light text-2xl text-accent-light">
                    ✦
                  </span>
                  <p className="font-editorial text-2xl italic text-bg">{enroll.success}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="flex flex-col gap-5"
                >
                  <div className="mb-1">
                    <p className="font-body text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent-light">
                      {enroll.eyebrow}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-bg">{enroll.title}</h3>
                    <p className="mt-3 text-[0.92rem] leading-relaxed text-bg/60">{enroll.formBody}</p>
                  </div>
                  <label className="flex flex-col gap-2">
                    <span className="font-body text-[0.72rem] font-bold uppercase tracking-[0.2em] text-bg/60">
                      Name
                    </span>
                    <input
                      className="field"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-body text-[0.72rem] font-bold uppercase tracking-[0.2em] text-bg/60">
                      Email
                    </span>
                    <input
                      className="field"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@studio.com"
                    />
                  </label>
                  <button type="submit" className="btn btn-accent mt-2 w-full">
                    {enroll.cta}
                    <span aria-hidden>→</span>
                  </button>
                  <p className="text-center font-body text-[0.72rem] leading-relaxed text-bg/45">
                    {enroll.reassure}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Rise>
      </div>
    </section>
  );
}
