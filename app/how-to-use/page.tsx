import type { Metadata } from "next";
import "./how-to-use.css";

export const metadata: Metadata = {
  title: "How to use",
  description:
    "Install Reverie, connect your agents, turn it on for a repo, review the conclusions it keeps, and check what it knows: the steps in order.",
};

// TODO(owner): the install command was not supplied with this handoff. Replace the placeholder before publishing.
const INSTALL_COMMAND = "# TODO(owner): install command not supplied";

function Command({ children }: { children: string }) {
  return (
    <pre>
      <code>{children}</code>
    </pre>
  );
}

export default function HowToUsePage() {
  return (
    <div className="htu">
      <header className="wrap htu-head">
        <h1 className="t-h1">How to use Reverie</h1>
        <p className="lead">From install to your first reviewed conclusion, in the order you’ll meet each step.</p>
      </header>

      <div className="wrap">
        <section className="htu-sec" aria-labelledby="install-h">
          <h2 id="install-h">Install</h2>
          <div className="htu-body">
            <p>Run this in a terminal:</p>
            <Command>{INSTALL_COMMAND}</Command>
          </div>
        </section>

        <section className="htu-sec" aria-labelledby="connect-h">
          <h2 id="connect-h">Connect a harness</h2>
          <div className="htu-body">
            <p>
              The installer detects Claude Code, Cursor, Codex and OpenCode, and configures each one it finds. Restart each
              agent once the installer has finished.
            </p>
          </div>
        </section>

        <section className="htu-sec" aria-labelledby="enable-h">
          <h2 id="enable-h">Enable a repo</h2>
          <div className="htu-body">
            <p>
              The first time your agent sees a repo, it asks once whether to turn Reverie on for that repo. You can also run
              this inside the repo at any time:
            </p>
            <Command>reverie enable</Command>
          </div>
        </section>

        <section className="htu-sec" aria-labelledby="work-h">
          <h2 id="work-h">Work normally</h2>
          <div className="htu-body">
            <p>
              In Claude Code, each completed exchange is captured automatically. In the other harnesses, the agent records a
              conclusion when it finds something worth keeping. You don’t extract anything yourself.
            </p>
          </div>
        </section>

        <section className="htu-sec" aria-labelledby="review-h">
          <h2 id="review-h">Review</h2>
          <div className="htu-body">
            <p>
              Run this in a terminal to review the conclusions waiting for you:
            </p>
            <Command>reverie review</Command>
            <p>
              Accept, reject or skip each conclusion. Only accepted conclusions are used later.
            </p>
          </div>
        </section>

        <section className="htu-sec" aria-labelledby="check-h">
          <h2 id="check-h">Check</h2>
          <div className="htu-body">
            <p>This shows the current repo and branch:</p>
            <Command>reverie status</Command>
            <p>This lists every repo Reverie knows about:</p>
            <Command>reverie repos</Command>
          </div>
        </section>
      </div>
    </div>
  );
}
