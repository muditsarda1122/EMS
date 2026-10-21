import type { Metadata } from "next";
import "./waitlist.css";
import WaitlistForm from "@/components/site/WaitlistForm";
import { siteConfig } from "@/content/site.config";

export const metadata: Metadata = {
  title: "Waitlist",
  description: "Join the Reverie waitlist. We'll tell you when the team version is ready.",
};

export default function WaitlistPage() {
  return (
    <div className="wl">
      <header className="wrap">
        <h1 className="t-h1">Join the waitlist.</h1>
      </header>

      <main className="wrap wl-body">
        <p>
          Reverie is free and open source today, and runs on each engineer&rsquo;s own machine. We&rsquo;re planning a
          team version, where the conclusions an engineering team keeps can be shared across the team.
        </p>
        <p>
          Leave your name and work email. We&rsquo;ll write when the team version is ready, and for nothing else.
        </p>

        <div className="wl-form">
          <WaitlistForm />
        </div>

        <p className="wl-note">
          Your details are stored with Buttondown, the email service we use for this list. To leave at any time, email{" "}
          <a className="text-link" href={`mailto:${siteConfig.contactEmail}?subject=Reverie waitlist removal`}>
            {siteConfig.contactEmail}
          </a>
          .
        </p>
      </main>
    </div>
  );
}
