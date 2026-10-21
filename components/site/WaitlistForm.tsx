"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/content/site.config";

type Status = "idle" | "sending" | "done" | "error";

/**
 * Waitlist sign-up, posted to Buttondown's embed endpoint. The name input's `name` must match
 * the key of a custom subscribe-form input in Buttondown (Settings → Subscribe form inputs).
 *
 * The form posts in the background, so people stay on this page. Buttondown's own response
 * can't be read from the browser, so "done" means the request was sent, not that it was stored.
 * Until a username is set, the form is replaced by the email address.
 */
export default function WaitlistForm() {
  const username = siteConfig.waitlist.buttondownUsername;
  const [status, setStatus] = useState<Status>("idle");

  if (!username) {
    return (
      <p>
        The waitlist opens soon. Until then, email{" "}
        <a className="text-link" href={`mailto:${siteConfig.contactEmail}?subject=Reverie waitlist`}>
          {siteConfig.contactEmail}
        </a>
        .
      </p>
    );
  }

  const action = `https://buttondown.com/api/emails/embed-subscribe/${username}`;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      await fetch(action, { method: "POST", mode: "no-cors", body: new FormData(event.currentTarget) });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p role="status" className="wl-thanks">
        Thanks, you&rsquo;re on the list. We&rsquo;ll write when the team version is ready.
      </p>
    );
  }

  return (
    <>
      <form className="wl-signup" action={action} method="post" onSubmit={onSubmit}>
        <div className="wl-field">
          <label htmlFor="wl-name">Name</label>
          <input id="wl-name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className="wl-field">
          <label htmlFor="wl-email">Work email</label>
          <input id="wl-email" name="email" type="email" autoComplete="email" required />
        </div>
        <input type="hidden" name="embed" value="1" />
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Joining…" : "Join the waitlist"}
        </button>
      </form>
      {status === "error" && (
        <p role="alert" className="wl-error">
          That didn&rsquo;t go through. Please try again, or email{" "}
          <a className="text-link" href={`mailto:${siteConfig.contactEmail}?subject=Reverie waitlist`}>
            {siteConfig.contactEmail}
          </a>
          .
        </p>
      )}
    </>
  );
}
