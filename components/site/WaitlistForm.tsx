import { siteConfig } from "@/content/site.config";

/**
 * Waitlist sign-up, posted to Buttondown's embed endpoint. The name input's `name` must match
 * the key of a custom subscribe-form input in Buttondown (Settings → Subscribe form inputs).
 * Until a username is set, the form is replaced by the email address.
 */
export default function WaitlistForm() {
  const username = siteConfig.waitlist.buttondownUsername;

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

  return (
    <form
      className="wl-signup"
      action={`https://buttondown.com/api/emails/embed-subscribe/${username}`}
      method="post"
    >
      <div className="wl-field">
        <label htmlFor="wl-name">Name</label>
        <input id="wl-name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="wl-field">
        <label htmlFor="wl-email">Work email</label>
        <input id="wl-email" name="email" type="email" autoComplete="email" required />
      </div>
      <input type="hidden" name="embed" value="1" />
      <button type="submit" className="btn btn-primary">
        Join the waitlist
      </button>
    </form>
  );
}
