import type { Metadata } from "next";
import "./how-to-use.css";

export const metadata: Metadata = {
  title: "How to use",
  description:
    "Install Reverie, enable it for a repo, review the conclusions it captures, and see how accepted conclusions carry across branches. The steps, in order.",
};

const INSTALL_COMMAND = `git clone --branch v0.2.0 https://github.com/muditsarda1122/Reverie.git
cd Reverie
python3.12 -m venv .venv
source .venv/bin/activate
pip install -e .
reverie install`;

const EXAMPLE = "soft_str must pass str subclasses such as Markup through unchanged, because escape(soft_str(value)) depends on it.";

const COMMANDS: [string, string][] = [
  ["reverie status", "Shows the current repo and branch, and the session and brain status."],
  ["reverie repos", "Lists every repo Reverie knows about, with its state and counts."],
  ["reverie enable", "Turns Reverie on for the repo you run it in."],
  ["reverie disable", "Turns Reverie off for the repo you run it in."],
  ["reverie review", "Opens the review, where you accept, reject or skip each conclusion waiting for you."],
  ["reverie export", "Exports your memory to one ZIP file."],
  ["reverie import", "Imports a memory export made with export."],
  ["reverie reset", "Wipes your memory, after making an automatic backup."],
  ["reverie uninstall", "Removes what reverie install set up. Your memory is kept unless you ask to delete it."],
];

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
        <p className="lead">Reverie keeps what your agent learns, and you decide what it keeps.</p>
      </header>

      <div className="wrap">
        {/* 2 */}
        <section className="htu-sec" aria-labelledby="where-h">
          <h2 id="where-h">Where a conclusion lives</h2>
          <ol className="htu-stages" aria-label="The three stages of a conclusion">
            <li>
              <span className="mono-label">Captured</span>
              <p>Available to your agent on the branch where it was captured, right away.</p>
            </li>
            <li>
              <span className="mono-label">Reviewed</span>
              <p>You accept, reject or skip it with <code>reverie review</code>.</p>
            </li>
            <li>
              <span className="mono-label">Long-term</span>
              <p>An accepted conclusion, available on every branch from then on.</p>
            </li>
          </ol>
        </section>

        {/* 3 */}
        <section className="htu-sec" aria-labelledby="example-h">
          <h2 id="example-h">An example</h2>
          <div className="htu-body">
            <div className="htu-example">
              <span className="mono-label">Example</span>
              <blockquote>{EXAMPLE}</blockquote>
              <ol className="steps">
                <li>
                  <span className="mono-label">Captured, on branch fix/markup-escape</span>
                  <p>Your agent records the conclusion during its work on that branch, and uses it there straight away.</p>
                </li>
                <li>
                  <span className="mono-label">Accepted</span>
                  <p>You accept it in <code>reverie review</code>. It becomes a long-term conclusion.</p>
                </li>
                <li>
                  <span className="mono-label">Used, on branch feature/templates</span>
                  <p>Your agent sees it on a different branch, because it is now long-term.</p>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* 4 */}
        <section className="htu-sec" aria-labelledby="install-h">
          <h2 id="install-h">Install</h2>
          <div className="htu-body">
            <Command>{INSTALL_COMMAND}</Command>
            <p>
              This installs the v0.2.0 release. Newer releases are listed on the{" "}
              <a className="text-link" href="https://github.com/muditsarda1122/Reverie/releases" target="_blank" rel="noopener noreferrer">
                Reverie releases page
              </a>
              .
            </p>
            <p>
              The installer detects Claude Code, Cursor, Codex and OpenCode, and configures each one it finds. Restart each
              agent after it finishes.
            </p>
          </div>
        </section>

        {/* 5 */}
        <section className="htu-sec" aria-labelledby="enable-h">
          <h2 id="enable-h">Enable a repo</h2>
          <div className="htu-body">
            <p>
              The first time your agent sees a repo, it asks once whether to turn Reverie on for that repo. You can also run
              this inside the repo:
            </p>
            <Command>reverie enable</Command>
          </div>
        </section>

        {/* 6 */}
        <section className="htu-sec" aria-labelledby="work-h">
          <h2 id="work-h">Work normally</h2>
          <div className="htu-body">
            <p>
              In Claude Code, each completed exchange is captured automatically. In the other agents, the agent records a
              conclusion when it finds something worth keeping. You don’t extract anything yourself.
            </p>
          </div>
        </section>

        {/* 7 */}
        <section className="htu-sec" aria-labelledby="review-h">
          <h2 id="review-h">Review</h2>
          <div className="htu-body">
            <p>Run this in a terminal:</p>
            <Command>reverie review</Command>
            <p>
              For each conclusion, accept, reject or skip it. The review lists conclusions from every branch and every repo,
              not only the one you are on.
            </p>
          </div>
        </section>

        {/* 8 */}
        <section className="htu-sec" aria-labelledby="branches-h">
          <h2 id="branches-h">Branches</h2>
          <div className="htu-body">
            <p>
              Each branch has its own session memory. A conclusion captured on one branch isn’t visible in another branch’s
              session. Once you accept it, it is visible everywhere. The same example, across two branches:
            </p>
            <blockquote className="aside-p">{EXAMPLE}</blockquote>
            <p>
              Before review, the conclusion is visible only on fix/markup-escape. After you accept it, it is visible on
              fix/markup-escape, on feature/templates, and on every other branch.
            </p>
          </div>
        </section>

        {/* 9 */}
        <section className="htu-sec" aria-labelledby="revision-h">
          <h2 id="revision-h">Revision</h2>
          <div className="htu-body">
            <p>
              When the code contradicts an accepted conclusion, your agent can propose a revision. Its proposal names the file
              that shows the contradiction, so you can check it against the code.
            </p>
          </div>
        </section>

        {/* 10 */}
        <section className="htu-sec" aria-labelledby="commands-h">
          <h2 id="commands-h">Commands</h2>
          <div className="htu-body">
            <table className="htu-table">
              <thead>
                <tr>
                  <th scope="col">Command</th>
                  <th scope="col">What it does</th>
                </tr>
              </thead>
              <tbody>
                {COMMANDS.map(([cmd, what]) => (
                  <tr key={cmd}>
                    <th scope="row" data-label="Command">
                      <code>{cmd}</code>
                    </th>
                    <td data-label="What it does">{what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 11 */}
        <section className="htu-sec" aria-labelledby="expect-h">
          <h2 id="expect-h">What to expect</h2>
          <ul className="htu-expect">
            <li>Conclusions can be wrong, so review them before you accept them.</li>
            <li>Your agent doesn’t always check memory on its own.</li>
            <li>Check a conclusion against the code before you act on it.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
