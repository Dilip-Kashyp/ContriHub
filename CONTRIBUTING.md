# How to Contribute to ContriHub

Welcome to ContriHub! We are thrilled that you want to contribute to our open-source operating system for developers. This document is a complete guide reflecting our real-world contribution workflow. It goes beyond the basic PR steps to ensure you can collaborate effectively with maintainers and make high-quality contributions.

---

## 1. Project Readiness

Before writing any code, it is essential to familiarize yourself with the project landscape. To check if the repository is active, review recent commits, open pull requests, and activity in the Issues tab.

Please ensure you have read the following critical documents:
* **[README.md](./README.md)**: Understanding the core mission and high-level architecture of ContriHub.
* **[CONTRIBUTING.md](./CONTRIBUTING.md)**: You are here! Keep reading to learn our workflow.
* **[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)**: To ensure a welcoming and inclusive environment for everyone.

---

## 2. Finding the Right Issue

We track all upcoming features, bugs, and tasks in our Issues tab.

* Look for issues labeled `good first issue` or `help wanted` if you are a newcomer.
* Before claiming an issue, check the comments and the "Assignees" panel to see if it is already assigned or if someone has declared they are working on it.
* **Read the discussion carefully.** Ensure you fully understand the context, scope, and technical direction discussed by the maintainers before starting work.

---

## 3. Communication Protocol

We value transparency and clear communication. **Unannounced pull requests without prior issue discussion are often rejected.** 

To avoid wasted effort:
1. **Comment on the issue** you want to work on. Express your interest and propose a brief high-level plan if the implementation isn't straightforward.
2. **Ask to be assigned.** Wait for a maintainer to assign the issue to you or give you the "go-ahead" confirmation.

---

## 4. Local Setup

Once you are assigned to an issue, set up the project locally:

1. **Fork the repository** to your GitHub account.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/ContriHub.git
   cd ContriHub
   ```
3. **Install Dependencies**:
   ```bash
   # In the frontend directory
   cd frontend
   npm install
   
   # In the backend directory
   cd ../backend
   go mod download
   ```
4. **Run the Project Locally**:
   * Frontend: `npm run dev`
   * Backend: `go run main.go`
5. **Run Tests**: Ensure everything works before making changes by running existing tests.

---

## 5. Branching Strategy

**Never commit directly to the `main` or `master` branch.** Always create a new, descriptive branch from the main branch for your work.

* **Format**: `<type>/<short-description>`
* **Examples**:
  * `fix/pr-tracker-bug`
  * `feature/dashboard-charts`
  * `docs/update-contributing-guide`

```bash
git checkout -b feature/dashboard-charts
```

---

## 6. Understanding the Codebase

Take time to read the code surrounding the area you will be modifying. 
* Identify how state is managed, how components are structured, and how data is fetched.
* **Emulate existing patterns.** If we use a specific API client, UI framework pattern, or logging structure, use it in your code to maintain architectural consistency.

---

## 7. Implementation Guidelines

* **Match Coding Standards**: Ensure your code looks like it was written by the same team. Follow our linting rules and style conventions.
* **Stay Focused**: Do not include unrelated changes (like reformatting other files or fixing unrelated bugs) in your PR. If you find another issue, open a separate PR or Issue for it.
* **Add Tests**: If you are adding a new feature or fixing a complex bug, include appropriate unit or integration tests.

---

## 8. Validation

Before committing, validate your work locally:
1. Run all tests to ensure there are no regressions.
2. Run linters and formatters.
3. Test the changes manually in the browser. Ensure there are no breaking changes or console errors.

---

## 9. Commit Standards

We require meaningful and structured commit messages. Where applicable, follow Conventional Commits.

* **Format**: `type(scope): subject`
* **Examples**:
  * `feat(dashboard): add recharts for commit activity`
  * `fix(sidebar): resolve mobile navigation clipping`
  * `docs: update contribution guidelines`

Write commits that tell a story of how the feature was built. Avoid generic messages like `fixed bug` or `updates`.

---

## 10. Pull Request Guidelines

When your branch is ready, push it to your fork and open a Pull Request against the main ContriHub repository.

A good PR description is critical:
* **What was changed**: Briefly summarize the technical changes.
* **Why it was changed**: Explain the rationale behind the technical decisions.
* **Link related issue**: Use keywords to close issues automatically (e.g., `Fixes #123` or `Resolves #45`).
* **Visuals**: Include **screenshots or screen recordings** for any visual UI changes.

Keep PRs small and focused. If a feature is massive, consider breaking it down into smaller, reviewable PRs.

---

## 11. Code Review Process

Maintainers will review your code. Treat reviews as a collaborative process.
* **Respond Constructively**: Address feedback openly and don't take critiques personally.
* **Make Clean Updates**: When addressing feedback, push new commits to the same branch.
* **Ask Questions**: If you disagree with a review comment or don't understand it, ask for clarification politely!

---

## 12. After Merge

Congratulations on your contribution! After your PR is merged:
1. Sync your local `main` branch with the upstream repository to get the latest changes.
2. Delete your feature branch.
3. **Continue Engaging**: We love recurring contributors. Help review other PRs, participate in discussions, and look for your next issue!

---

## 13. Contribution Mindset

Open source is a marathon, not a sprint. We highly value **long-term contribution** over one-time PRs. Consistency, collaboration, and helping others in the community are what make ContriHub great. We look forward to building with you!
