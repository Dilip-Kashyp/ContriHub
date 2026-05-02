export const BLOG_CONTENT = {
  "getting-started": {
    title: "Getting Started with Open Source",
    content: (
      <>
        <p>Open source powers the internet. From Linux to React, the software you use every day is built by communities of volunteers, students, and professionals who believe in building in public. This guide will help you take your very first step into that world.</p>

        <h2>1. What Can You Contribute?</h2>
        <p>A huge misconception is that open source is only for elite programmers. In reality, projects need all kinds of help:</p>
        <ul>
          <li><strong>Documentation:</strong> Fixing typos, rewriting confusing sections, adding examples. This is the single most impactful low-barrier contribution.</li>
          <li><strong>Bug Reports:</strong> Writing a clear, reproducible bug report is a skill that maintainers deeply value.</li>
          <li><strong>Testing:</strong> Running the code, finding edge cases, writing test coverage.</li>
          <li><strong>Code:</strong> Fixing bugs, improving performance, building features — once you are familiar with the codebase.</li>
        </ul>

        <hr />

        <h2>2. Finding the Right Project</h2>
        <p>Start with projects you already use. Your "user perspective" is an asset — you already know what's confusing or broken. When evaluating a project, check:</p>
        <ul>
          <li>Does it have a clear <code>README.md</code> and <code>CONTRIBUTING.md</code>?</li>
          <li>Are maintainers actively responding to issues and PRs?</li>
          <li>Is the community respectful and welcoming in their communication?</li>
          <li>Are there issues labeled <code>good first issue</code> or <code>help wanted</code>?</li>
        </ul>
        <p>Platforms like <strong>ContriHub</strong> are specifically designed to surface beginner-friendly issues with AI-powered match scores based on your skillset — removing the hardest part of getting started.</p>

        <hr />

        <h2>3. The Standard Workflow: Fork → Branch → PR</h2>
        <p>Every open source contribution follows the same basic pattern:</p>
        <ol>
          <li><strong>Fork the repository</strong> — creates a copy under your GitHub account.</li>
          <li><strong>Clone your fork</strong> locally: <code>git clone https://github.com/YOU/repo.git</code></li>
          <li><strong>Create a dedicated branch:</strong> <code>git checkout -b fix/typo-in-readme</code></li>
          <li><strong>Make your changes</strong>, run tests, verify nothing is broken.</li>
          <li><strong>Commit with a clear message:</strong> <code>git commit -m "docs: fix typo in README installation section"</code></li>
          <li><strong>Push and open a Pull Request</strong> against the original repo's main branch.</li>
        </ol>

        <hr />

        <h2>4. Tips for Your First Contribution</h2>
        <ul>
          <li><strong>Start tiny.</strong> A one-line documentation fix is a legitimate, valuable contribution. It gets you familiar with the workflow without the pressure of writing complex code.</li>
          <li><strong>Read everything first.</strong> Skim recent issues, closed PRs, and the contributing guide before you write a single line.</li>
          <li><strong>Comment before you code.</strong> On your chosen issue, say "I'd like to work on this" and wait for acknowledgment. This prevents duplicate effort.</li>
          <li><strong>Be patient.</strong> Maintainers are usually volunteers with jobs and lives. A slow response is not rejection.</li>
          <li><strong>Consistency beats intensity.</strong> One small contribution per week for six months is far more impressive than one massive contribution once a year.</li>
        </ul>
      </>
    )
  },

  "git-workflow": {
    title: "Understanding Git Workflow",
    content: (
      <>
        <p>Git is the foundation of modern software collaboration. Understanding it deeply — beyond the basic <code>add</code>, <code>commit</code>, <code>push</code> cycle — is what separates a junior contributor from a trusted one. This guide covers the workflows used in professional open source teams.</p>

        <h2>1. Fork & Clone: Your Starting Point</h2>
        <p>In open source, you never push directly to the original repo (unless you're a maintainer). You work through a <strong>fork</strong> — your personal copy:</p>
        <pre><code>{`# Step 1: Fork on GitHub (click the Fork button)

# Step 2: Clone YOUR fork locally
git clone https://github.com/YOUR-USERNAME/repo-name.git
cd repo-name

# Step 3: Add the ORIGINAL repo as "upstream"
git remote add upstream https://github.com/ORIGINAL-OWNER/repo-name.git

# Verify your remotes
git remote -v`}</code></pre>

        <hr />

        <h2>2. Branching: One Task, One Branch</h2>
        <p>Never work directly on <code>main</code>. Create a new, descriptively named branch for every single task. This keeps your work isolated and your PRs clean:</p>
        <pre><code>{`# Always branch off the latest main
git checkout main
git pull upstream main
git checkout -b feature/add-user-avatar`}</code></pre>
        <p>Good branch names follow a pattern: <code>type/short-description</code>. Common types:</p>
        <ul>
          <li><code>feature/</code> — new functionality</li>
          <li><code>fix/</code> — bug fixes</li>
          <li><code>docs/</code> — documentation changes</li>
          <li><code>refactor/</code> — code restructuring without behavior change</li>
          <li><code>test/</code> — adding or improving tests</li>
        </ul>

        <hr />

        <h2>3. Keeping Your Fork in Sync</h2>
        <p>Active repos move fast. Before starting any work, always sync your fork with upstream to avoid conflicts:</p>
        <pre><code>{`# Fetch the latest changes from upstream
git fetch upstream

# Rebase your branch on top of upstream main
git rebase upstream/main

# If conflicts occur, resolve them, then:
git add .
git rebase --continue`}</code></pre>
        <p><strong>Why rebase instead of merge?</strong> Rebasing keeps a linear commit history, which is much easier for maintainers to review. Most open source projects prefer it.</p>

        <hr />

        <h2>4. Writing Meaningful Commit Messages</h2>
        <p>Your commits tell the story of your work. Follow the <strong>Conventional Commits</strong> standard used by most professional projects:</p>
        <ul>
          <li><code>feat(auth): add OAuth login with GitHub</code></li>
          <li><code>fix(navbar): prevent mobile menu overflow on iOS</code></li>
          <li><code>docs(api): clarify rate limiting behavior</code></li>
          <li><code>refactor(utils): extract date formatting to helper</code></li>
        </ul>
        <p>Avoid: <code>fix bug</code>, <code>wip</code>, <code>updated stuff</code>, <code>changes</code>. These tell the reviewer nothing.</p>

        <hr />

        <h2>5. Handling Merge Conflicts</h2>
        <p>Conflicts happen when two people change the same file. Don't panic — they are a normal part of collaboration. To resolve:</p>
        <pre><code>{`# Git will mark conflicting files
# Open the file and look for conflict markers:
# <<<<<<< HEAD (your changes)
# =======
# >>>>>>> upstream/main (incoming changes)

# Edit the file to keep the correct version
# Then:
git add conflicting-file.js
git rebase --continue`}</code></pre>
      </>
    )
  },

  "pull-request-art": {
    title: "The Art of the Pull Request",
    content: (
      <>
        <p>A pull request is more than just code — it's a communication artifact. A well-crafted PR tells a story: what was broken, what you did, and why your approach is the right one. Maintainers who review dozens of PRs a week will prioritize clear, well-organized ones every time.</p>

        <h2>1. Before You Write a Single Line of Code</h2>
        <ul>
          <li><strong>Read <code>CONTRIBUTING.md</code></strong> — most projects have specific rules about code style, testing requirements, and commit message formats. Ignoring these is the #1 reason PRs get closed immediately.</li>
          <li><strong>Find or create an issue</strong> — unannounced PRs are often rejected. Comment on the issue you want to solve and wait for a maintainer to acknowledge it before spending hours on code.</li>
          <li><strong>Study existing PRs</strong> — look at recently merged PRs to understand the level of detail, tone, and format the project expects.</li>
        </ul>

        <hr />

        <h2>2. Crafting a Perfect PR</h2>
        <p>Structure your PR description like a professional document:</p>
        <ul>
          <li><strong>Title:</strong> Concise, using Conventional Commits format. E.g., <code>fix(auth): prevent session expiry crash on refresh</code></li>
          <li><strong>What changed:</strong> A brief bullet-point summary of your technical changes.</li>
          <li><strong>Why it changed:</strong> The rationale. What problem does this solve? Link to the issue: <code>Fixes #123</code></li>
          <li><strong>Screenshots / recordings:</strong> For any UI change, include before-and-after screenshots. This alone will make maintainers love your PR.</li>
          <li><strong>Testing done:</strong> Describe how you verified the change works. What test cases did you run?</li>
        </ul>

        <hr />

        <h2>3. Keeping PRs Small and Focused</h2>
        <p>The single most important rule: <strong>one PR, one purpose.</strong></p>
        <ul>
          <li>A PR that touches 20 files across 5 features is almost impossible to review confidently.</li>
          <li>If a feature is large, break it into a series of incremental PRs — each building on the last.</li>
          <li>If you discover an unrelated bug while working, open a <em>separate</em> PR for it.</li>
        </ul>
        <p>Research from GitHub shows that PRs under 400 lines of code are merged 4x more often than larger ones.</p>

        <hr />

        <h2>4. During the Review Process</h2>
        <ul>
          <li><strong>Ensure CI passes</strong> before asking for review. Never submit a PR with failing tests and say "I'll fix later."</li>
          <li><strong>Do a self-review first.</strong> Read your own diff. Look for stray <code>console.log</code> statements, formatting issues, commented-out code.</li>
          <li><strong>Respond to every comment</strong> — even with just a "Done!" or "Good point, updated." This shows you are engaged and collaborative.</li>
          <li><strong>Don't take feedback personally.</strong> Code review comments are about the code, not you as a person. The best engineers in the world get their code reviewed and changed daily.</li>
        </ul>

        <hr />

        <h2>5. PR Checklist</h2>
        <ul>
          <li>☐ Branch is based on the latest upstream <code>main</code></li>
          <li>☐ All existing tests pass locally</li>
          <li>☐ New tests added for new functionality</li>
          <li>☐ No stray debug code or unnecessary files</li>
          <li>☐ PR description is filled out completely</li>
          <li>☐ Screenshots included for UI changes</li>
          <li>☐ Linked to the related issue</li>
        </ul>
      </>
    )
  },

  "gibo-ai-mentor": {
    title: "Gibo AI: Your Technical Mentor",
    content: (
      <>
        <p>Most open source guides tell you <em>what</em> to do. They don't help you when you're staring at a 50,000-line codebase and have no idea where to start. That's exactly the gap Gibo AI was built to fill.</p>

        <h2>1. The Problem Gibo Solves</h2>
        <p>The hardest part of contributing to an unfamiliar project isn't the code itself — it's the <em>orientation</em>. Questions like:</p>
        <ul>
          <li>Which files are even relevant to this issue?</li>
          <li>What does this module actually do?</li>
          <li>What's the pattern the team uses for state management here?</li>
          <li>Where should my new function go?</li>
        </ul>
        <p>These questions can take a senior dev hours to answer in a new codebase. Gibo answers them in seconds.</p>

        <hr />

        <h2>2. Issue Breakdown</h2>
        <p>When you open an issue on ContriHub, Gibo automatically analyzes it and provides:</p>
        <ul>
          <li><strong>Relevant files</strong> — exactly which files you need to look at, with direct links.</li>
          <li><strong>Code context</strong> — snippets of the relevant sections with explanations of what they currently do.</li>
          <li><strong>Root cause analysis</strong> — for bugs, Gibo traces the likely origin of the problem through the call stack.</li>
        </ul>

        <hr />

        <h2>3. Implementation Planning</h2>
        <p>Click "Ask Gibo" on any issue and describe your approach. Gibo will:</p>
        <ul>
          <li>Validate whether your approach fits the project's architecture</li>
          <li>Suggest the correct patterns and utilities already in the codebase to use</li>
          <li>Generate a step-by-step implementation plan with pseudocode</li>
          <li>Flag potential edge cases you might not have considered</li>
        </ul>
        <p>This isn't about writing code for you — it's about giving you the context to write it yourself, correctly, the first time.</p>

        <hr />

        <h2>4. Pre-Submission Review</h2>
        <p>Before you open your PR, paste your diff into Gibo's review mode. It will check for:</p>
        <ul>
          <li>Missed edge cases or null-pointer scenarios</li>
          <li>Deviation from the project's existing coding patterns</li>
          <li>Performance concerns in your implementation</li>
          <li>Missing test coverage for your changes</li>
        </ul>

        <hr />

        <h2>5. Learning, Not Dependency</h2>
        <p>The goal of Gibo is not to make you dependent on AI. Every explanation Gibo gives is designed to teach you the underlying concept so you can solve similar problems yourself next time. Think of it as a senior engineer who has infinite patience to explain things — and who has already read every file in the codebase.</p>
      </>
    )
  },

  "build-portfolio": {
    title: "Building Your Dev Portfolio with Open Source",
    content: (
      <>
        <p>A GitHub profile full of active open source contributions is one of the most powerful signals you can send to a potential employer. It's verifiable proof of your skills, communication style, and engineering maturity — things a resume can only claim.</p>

        <h2>1. Why Open Source  Side Projects for Portfolios</h2>
        <p>Personal side projects are valuable, but they have a limitation: you built them alone, under no constraints, and no one reviewed your decisions. Open source contributions prove something much harder:</p>
        <ul>
          <li>You can read and understand <strong>other people's code</strong></li>
          <li>You can collaborate and take feedback professionally</li>
          <li>You can operate within existing architectural constraints</li>
          <li>Real maintainers approved your work — a third-party validation of quality</li>
        </ul>

        <hr />

        <h2>2. Choosing Projects Strategically</h2>
        <p>Not all contributions are created equal on a portfolio. Think strategically:</p>
        <ul>
          <li><strong>Contribute to tools your target employers use.</strong> If you want to work at a React company, contribute to React ecosystem projects.</li>
          <li><strong>Go deep, not wide.</strong> 10 meaningful contributions to one project is more impressive than 1 tiny fix to 10 projects.</li>
          <li><strong>Aim for merges, not just PRs.</strong> A portfolio of merged PRs signals you can ship quality work that meets real standards.</li>
        </ul>

        <hr />

        <h2>3. Showcasing Your Contributions</h2>
        <p>Don't just list "contributed to X" on your resume. Tell the story:</p>
        <ul>
          <li><strong>What problem did you solve?</strong> Quantify if possible — "Fixed a race condition that was causing crashes for 12% of users."</li>
          <li><strong>What was your approach?</strong> Briefly describe your technical decision-making.</li>
          <li><strong>What was the impact?</strong> Was it merged? How many users does it affect?</li>
        </ul>

        <hr />

        <h2>4. Building Relationships, Not Just Code</h2>
        <p>The hidden value of open source is the network you build. Maintainers who appreciate your work become professional references. Regular contributors become colleagues. The community you build over time is often worth more than any single merged PR.</p>
        <ul>
          <li>Be helpful in issue discussions even when you're not the one implementing.</li>
          <li>Review other contributors' PRs — this is a high-leverage, underrated activity.</li>
          <li>Share your journey publicly on Twitter/LinkedIn. Authentic documentation of your learning attracts opportunities.</li>
        </ul>
      </>
    )
  },

  "code-review": {
    title: "Code Review: How to Give and Receive Feedback",
    content: (
      <>
        <p>Code review is one of the most powerful — and most misunderstood — practices in software engineering. Done well, it's the mechanism by which teams maintain quality, share knowledge, and grow together. Done poorly, it's a source of friction, frustration, and blocked PRs.</p>

        <h2>1. The Mindset: Reviews Are Collaborative, Not Adversarial</h2>
        <p>The most important shift is understanding what a code review actually is: two engineers trying to ship the best possible code together. It is never one person judging another.</p>
        <ul>
          <li>Reviewers: your job is to improve the code, not prove your superiority.</li>
          <li>Authors: your job is to ship quality work, not defend every decision you made at 2am.</li>
        </ul>

        <hr />

        <h2>2. How to Give a Great Review</h2>
        <ul>
          <li><strong>Be specific, not vague.</strong> "This feels wrong" is unhelpful. "This function mutates the input array directly — consider returning a new array to avoid side effects" is actionable.</li>
          <li><strong>Distinguish blockers from suggestions.</strong> Mark comments as <code>[blocking]</code> if they must be addressed before merge, or <code>[nit]</code> for optional style preferences. This prevents confusion.</li>
          <li><strong>Explain the why.</strong> Don't just say "change this to X." Explain why X is better. This turns every review into a teaching moment.</li>
          <li><strong>Acknowledge good work.</strong> If you see an elegant solution, say so. Positive feedback is not weakness — it motivates and reinforces good patterns.</li>
          <li><strong>Review the PR description too.</strong> If the description is unclear, that's a red flag that the code might be too.</li>
        </ul>

        <hr />

        <h2>3. How to Receive a Review Gracefully</h2>
        <ul>
          <li><strong>Don't respond defensively.</strong> Take a breath before replying. Read comments charitably — assume the reviewer wants to help, not embarrass you.</li>
          <li><strong>Ask for clarification, not justification.</strong> "I'm not sure I understand — could you explain what you mean by X?" is much better than "I disagree because..."</li>
          <li><strong>You don't have to accept everything.</strong> If you genuinely disagree with a comment, make your case calmly with reasoning. Maintainers appreciate thoughtful pushback.</li>
          <li><strong>Respond to every comment</strong> — even resolved ones. A simple "Fixed in latest commit" closes the loop and shows you've processed the feedback.</li>
        </ul>

        <hr />

        <h2>4. The 24-Hour Rule</h2>
        <p>If a review comment makes you feel frustrated or defensive, wait 24 hours before responding. Almost universally, the comment will seem much more reasonable the next day — and your response will be much more constructive.</p>
      </>
    )
  }
};
