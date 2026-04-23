---
name: contrihub-coding-standards
description: >
  Coding standards, architecture rules, and style guide for the ContriHub Next.js project.
  Use this skill whenever adding new pages, components, API handlers, constants, or any code to
  this project. Also use when refactoring, reviewing, or debugging any existing file.
  The agent MUST follow every rule here — never import MUI directly in pages or feature components,
  never hardcode strings or routes, never call fetch() directly, and never deviate from the
  patterns described below.
---

# ContriHub — Coding Standards & Style Guide

This is the single source of truth for how all code must be written in this repository.
Read it fully before writing a single line.

---

## 1. Tech Stack (locked — do not add or swap)

| Layer | Library / Tool | Version |
|---|---|---|
| Framework | Next.js (Pages Router) | 15.x |
| Runtime | React | 19.x |
| Language | JavaScript (`.js` only) | — |
| UI Components | MUI v6 — via common wrappers ONLY | ^6.x |
| MUI Icons | `@mui/icons-material` — via common wrappers ONLY | ^6.x |
| Emotion | `@emotion/cache`, `@emotion/styled` | ^11.x |
| Utility CSS | Tailwind CSS | ^3.x |
| Preprocessor | SCSS | — |
| Forms | Formik | ^2.x |
| Infinite scroll | `react-infinite-scroll-component` | ^6.x |
| Linting | ESLint 9 + `eslint-config-next` | ^9 |

**Never** install new packages without explicit user approval.
**Never** use TypeScript — no `.ts`, `.tsx`, `tsconfig.json`.

---

## 2. Project Structure

```
src/
├── assets/              # Image imports — re-exported via index.js
│   └── index.js
├── components/          # Common wrapped components — the ONLY source of UI primitives
│   ├── Button.js
│   ├── Container.js
│   ├── Input.js
│   ├── Stack.js
│   ├── Typography.js
│   ├── Select.js
│   └── index.js         # Barrel export of all common components
├── constants/           # ALL text, labels, config objects, routes — never hardcode elsewhere
│   ├── routes.js        # Route path constants
│   ├── index.js         # Barrel export
│   └── [pageName].js    # Per-page config (e.g. home.js, auth.js, profile.js)
├── helper/              # apiClient + all API handler functions
│   ├── apiClient.js     # The fetch wrapper
│   ├── auth.js          # Auth-related API calls
│   └── index.js         # Barrel export
├── pages/               # Next.js Pages Router — one file per route
│   ├── _app.js
│   ├── _document.js
│   ├── index.js
│   └── api/             # Next.js API routes (if any BFF layer needed)
└── features/            # Feature-level page components (called from pages/)
    └── [featureName]/
        ├── index.js
        └── [SubComponent].js
```

---

## 3. THE GOLDEN RULES (non-negotiable)

### Rule 1 — Never import MUI directly in pages or feature components
```js
// ✅ CORRECT — import from the common wrapper barrel
import { Stack, Container, Typography, Button, Input } from "@/components";

// ❌ WRONG — never do this in a page or feature component
import { Stack, Button, Typography } from "@mui/material";
```

MUI is only allowed inside `src/components/` where the wrappers live.

---

### Rule 2 — Never hardcode text, labels, or props in components
Every string, variant, size, alignment, placeholder, and label lives in `@/constants`.

```js
// ✅ CORRECT
import { HOME_PAGE_CONFIG } from "@/constants";
const { HOME_HEADER, HOME_TITLE, LOGIN_BUTTON } = HOME_PAGE_CONFIG;
return <Typography {...HOME_HEADER} />;

// ❌ WRONG — hardcoded text in component
return <Typography variant="h4">Welcome to ContriHub</Typography>;
```

---

### Rule 3 — Never hardcode route strings
All navigation paths live in `@/constants/routes.js`.

```js
// ✅ CORRECT
import { ROUTES } from "@/constants";
router.push(ROUTES.LOGIN);

// ❌ WRONG
router.push("/login");
```

---

### Rule 4 — Never call fetch() directly — always use apiClient
All HTTP calls go through the `apiClient` helper from `@/helper`.

```js
// ✅ CORRECT
import { registerHandler } from "@/helper";
const data = await registerHandler({ email, password, role, name });

// ❌ WRONG
const res = await fetch("/api/register", { method: "POST", body: ... });
```

---

## 4. Common Component Pattern

Every MUI primitive is wrapped once in `src/components/` and re-exported from `src/components/index.js`.
The wrapper accepts a single `xProps` prop (e.g. `typographyProps`, `buttonProps`) that is spread onto the underlying MUI component.

### Wrapper shape (how to write a common component)

```js
// src/components/Typography.js
import { Typography as MuiTypography } from "@mui/material";

export default function Typography({ typographyProps = {}, children }) {
  return (
    <MuiTypography {...typographyProps}>
      {typographyProps.children ?? children}
    </MuiTypography>
  );
}
```

```js
// src/components/Button.js
import { Button as MuiButton } from "@mui/material";

export default function Button({ buttonProps = {}, children }) {
  return (
    <MuiButton {...buttonProps}>
      {buttonProps.children ?? children}
    </MuiButton>
  );
}
```

```js
// src/components/Stack.js
import { Stack as MuiStack } from "@mui/material";

export default function Stack({ stackProps = {}, children }) {
  return <MuiStack {...stackProps}>{children}</MuiStack>;
}
```

```js
// src/components/Container.js
import { Container as MuiContainer } from "@mui/material";

export default function Container({ containerProps = {}, children }) {
  return <MuiContainer {...containerProps}>{children}</MuiContainer>;
}
```

```js
// src/components/Input.js
import { TextField } from "@mui/material";

export default function Input({ inputProps = {} }) {
  return <TextField {...inputProps} />;
}
```

```js
// src/components/Select.js
import { Select as MuiSelect, InputLabel, MenuItem, FormControl } from "@mui/material";

export default function Select({ selectProps = {}, inputLabelProps = {}, options = [] }) {
  return (
    <FormControl fullWidth>
      <InputLabel {...inputLabelProps}>{inputLabelProps.children}</InputLabel>
      <MuiSelect {...selectProps}>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
```

### Barrel export

```js
// src/components/index.js
export { default as Typography } from "./Typography";
export { default as Button } from "./Button";
export { default as Stack } from "./Stack";
export { default as Container } from "./Container";
export { default as Input } from "./Input";
export { default as Select } from "./Select";
```

### How to use common components in a page/feature

```js
import { Stack, Container, Typography, Button, Input } from "@/components";
import { HOME_PAGE_CONFIG } from "@/constants";

const { HOME_HEADER, HOME_TITLE, SEARCH_INPUT, LOGIN_BUTTON } = HOME_PAGE_CONFIG;

function HomePage() {
  return (
    <Container containerProps={{ className: "mt-32 flex flex-col gap-8" }}>
      <Stack stackProps={{ alignItems: "center", gap: 6 }}>
        <Typography {...HOME_HEADER} />
        <Typography {...HOME_TITLE} />
        <Input inputProps={SEARCH_INPUT.inputProps} />
        <Button buttonProps={LOGIN_BUTTON.buttonProps} />
      </Stack>
    </Container>
  );
}

export default HomePage;
```

---

## 5. Constants Pattern

### 5.1 File layout

```
src/constants/
├── routes.js         ← all route paths + menu items
├── options.js        ← dropdown options, enum-like arrays
├── home.js           ← HOME_PAGE_CONFIG
├── auth.js           ← REGISTRATION_FORM_CONFIG, LOGIN_FORM_CONFIG
├── profile.js        ← PROFILE_PAGE_CONFIG
└── index.js          ← barrel re-export everything
```

### 5.2 Route constants

```js
// src/constants/routes.js
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  CONTRIBUTIONS: "/contributions",
  REPOSITORIES: "/repositories",
};

export const MENU_ITEMS = [
  { id: "home", label: "Home", path: ROUTES.HOME },
  { id: "contributions", label: "Contributions", path: ROUTES.CONTRIBUTIONS },
  { id: "repositories", label: "Repositories", path: ROUTES.REPOSITORIES },
  { id: "login", label: "Login", path: ROUTES.LOGIN },
];
```

### 5.3 Page config constants (static text + component props)

Each config key holds the exact props object spread onto the common component:

```js
// src/constants/home.js
export const HOME_PAGE_CONFIG = {
  HOME_HEADER: {
    typographyProps: {
      children: "Find Open Source Projects to Contribute",
      variant: "h3",
      align: "center",
      fontWeight: 700,
    },
  },
  HOME_TITLE: {
    typographyProps: {
      children: "Discover repositories that match your skills",
      variant: "subtitle1",
      align: "center",
      color: "text.secondary",
    },
  },
  SEARCH_INPUT: {
    inputProps: {
      placeholder: "Search repositories, languages...",
      size: "medium",
      variant: "standard",
      sx: { minWidth: 500 },
    },
  },
  LOGIN_BUTTON: {
    buttonProps: {
      children: "Login",
      variant: "outlined",
      size: "medium",
    },
  },
  SIGNUP_BUTTON: {
    buttonProps: {
      children: "Sign Up",
      variant: "contained",
      size: "medium",
    },
  },
};
```

### 5.4 Dynamic config constants (factory functions)

When the config needs runtime data, export a function:

```js
// src/constants/profile.js
export const PROFILE_PAGE_CONFIG = {
  USERNAME_TEXT: ({ username }) => ({
    typographyProps: {
      children: username,
      variant: "h5",
      fontWeight: 600,
    },
  }),
  REPO_COUNT_TEXT: ({ count }) => ({
    typographyProps: {
      children: `${count} Repositories`,
      variant: "body2",
      color: "text.secondary",
    },
  }),
};
```

Usage:

```js
const { USERNAME_TEXT } = PROFILE_PAGE_CONFIG;
<Typography {...USERNAME_TEXT({ username: user.name })} />
```

### 5.5 Options constants

```js
// src/constants/options.js
export const DROPDOWN_OPTIONS = [
  { value: "contributor", label: "Contributor" },
  { value: "maintainer", label: "Maintainer" },
];

export const LANGUAGE_OPTIONS = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "go", label: "Go" },
];
```

### 5.6 Form constants

```js
// src/constants/auth.js
import { DROPDOWN_OPTIONS } from "./options";

export const REGISTRATION_FORM_CONFIG = {
  REGISTRATION_HEADER: {
    typographyProps: {
      children: "Create Account",
      variant: "h5",
    },
  },
  EMAIL_INPUT: {
    inputProps: {
      label: "Email",
      required: true,
      type: "email",
      name: "email",
    },
  },
  PASSWORD_INPUT: {
    inputProps: {
      label: "Password",
      required: true,
      type: "password",
      name: "password",
    },
  },
  NAME_INPUT: {
    inputProps: {
      label: "Full Name",
      required: true,
      name: "name",
      type: "text",
    },
  },
  BUTTON: {
    buttonProps: {
      children: "Create Account",
      variant: "contained",
      size: "large",
      type: "submit",
    },
  },
  LOGIN_LINK: {
    buttonProps: {
      children: "Login",
      variant: "text",
      size: "small",
    },
  },
  ALREADY_HAVE_ACCOUNT: {
    typographyProps: {
      children: "Already have an account?",
      variant: "body2",
      align: "center",
    },
  },
  DROPDOWN_CONFIG: {
    selectProps: {
      name: "role",
      label: "Role",
      required: true,
    },
    inputLabelProps: {
      children: "Role",
    },
    options: DROPDOWN_OPTIONS,
  },
};
```

### 5.7 Barrel export

```js
// src/constants/index.js
export * from "./routes";
export * from "./options";
export * from "./home";
export * from "./auth";
export * from "./profile";
```

---

## 6. API Layer Pattern

### 6.1 apiClient — the single fetch wrapper

```js
// src/helper/apiClient.js
// const BASE_URL = "http://140.245.236.72/api/v1"; // production
const BASE_URL = "http://localhost:5400/api/v1";

export async function apiClient({
  url,
  method = "GET",
  body = null,
  headers = {},
}) {
  try {
    const token = localStorage.getItem("token");
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! : ${response}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Client Error:", error.message);
    throw error;
  }
}
```

### 6.2 API handler functions — one file per domain

Each handler is a named async function that calls `apiClient`. Group by domain (auth, repositories, contributions, etc.).

```js
// src/helper/auth.js
import { apiClient } from "@/helper";

export async function registerHandler({ email, password, role, name }) {
  const response = await apiClient({
    url: "/user/register",
    method: "POST",
    body: { email, password, role, name },
  });
  return response;
}

export async function loginHandler({ email, password }) {
  const response = await apiClient({
    url: "/user/login",
    method: "POST",
    body: { email, password },
  });
  return response;
}

export async function logoutHandler() {
  const response = await apiClient({
    url: "/user/logout",
    method: "POST",
  });
  return response;
}
```

```js
// src/helper/repositories.js
import { apiClient } from "@/helper";

export async function getRepositoriesHandler({ page = 1, limit = 10 } = {}) {
  const response = await apiClient({
    url: `/repositories?page=${page}&limit=${limit}`,
    method: "GET",
  });
  return response;
}

export async function getRepositoryByIdHandler({ id }) {
  const response = await apiClient({
    url: `/repositories/${id}`,
    method: "GET",
  });
  return response;
}

export async function createRepositoryHandler({ name, description, language }) {
  const response = await apiClient({
    url: "/repositories",
    method: "POST",
    body: { name, description, language },
  });
  return response;
}
```

### 6.3 Barrel export

```js
// src/helper/index.js
export { apiClient } from "./apiClient";
export * from "./auth";
export * from "./repositories";
export * from "./contributions";
```

### 6.4 Calling APIs inside a component

```js
import { useState, useEffect } from "react";
import { getRepositoriesHandler } from "@/helper";

function RepositoryList() {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadRepos() {
      try {
        setIsLoading(true);
        const data = await getRepositoriesHandler({ page: 1, limit: 10 });
        setRepos(data.repositories);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadRepos();
  }, []);
}
```

---

## 7. Form Pattern (Formik + common components + constants)

```js
// src/features/auth/RegisterForm.js
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { Stack, Typography, Input, Button, Select } from "@/components";
import { REGISTRATION_FORM_CONFIG, ROUTES } from "@/constants";
import { registerHandler } from "@/helper";

const {
  REGISTRATION_HEADER,
  EMAIL_INPUT,
  PASSWORD_INPUT,
  NAME_INPUT,
  BUTTON,
  LOGIN_LINK,
  ALREADY_HAVE_ACCOUNT,
  DROPDOWN_CONFIG,
} = REGISTRATION_FORM_CONFIG;

export default function RegisterForm() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", role: "" },
    onSubmit: async (values) => {
      try {
        await registerHandler(values);
        router.push(ROUTES.LOGIN);
      } catch (error) {
        console.error(error.message);
      }
    },
  });

  return (
    <Stack stackProps={{ direction: "column", gap: 2 }}>
      <Typography {...REGISTRATION_HEADER} />
      <form onSubmit={formik.handleSubmit}>
        <Input
          inputProps={{
            ...NAME_INPUT.inputProps,
            value: formik.values.name,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
          }}
        />
        <Input
          inputProps={{
            ...EMAIL_INPUT.inputProps,
            value: formik.values.email,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
          }}
        />
        <Input
          inputProps={{
            ...PASSWORD_INPUT.inputProps,
            value: formik.values.password,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
          }}
        />
        <Select
          selectProps={{
            ...DROPDOWN_CONFIG.selectProps,
            value: formik.values.role,
            onChange: formik.handleChange,
          }}
          inputLabelProps={DROPDOWN_CONFIG.inputLabelProps}
          options={DROPDOWN_CONFIG.options}
        />
        <Button buttonProps={BUTTON.buttonProps} />
      </form>
      <Typography {...ALREADY_HAVE_ACCOUNT} />
      <Button
        buttonProps={{
          ...LOGIN_LINK.buttonProps,
          onClick: () => router.push(ROUTES.LOGIN),
        }}
      />
    </Stack>
  );
}
```

---

## 8. Page File Pattern

Pages are thin shells — they import one feature component and render it. No logic, no heavy JSX in page files.

```js
// src/pages/register.js
import RegisterForm from "@/features/auth/RegisterForm";

export default function RegisterPage() {
  return <RegisterForm />;
}
```

```js
// src/pages/index.js
import HomePage from "@/features/home";

export default function IndexPage() {
  return <HomePage />;
}
```

If SSR data is needed:

```js
// src/pages/repositories.js
import RepositoryList from "@/features/repositories";

export async function getServerSideProps() {
  // fetch initial data server-side if needed
  return { props: {} };
}

export default function RepositoriesPage(props) {
  return <RepositoryList {...props} />;
}
```

---

## 9. Assets Pattern

```js
// src/assets/index.js
import leftHome from "./images/left-home.png";
import rightHome from "./images/right-home.png";
import logo from "./images/logo.png";

export { leftHome, rightHome, logo };
```

Usage in components:

```js
import { leftHome, rightHome } from "@/assets";
import Image from "next/image";

<Image src={leftHome.src} width={150} height={100} alt="decoration" />
```

Always use `next/image` — never `<img>`.

---

## 10. Import Rules Summary

| What | Import from | Never from |
|---|---|---|
| UI primitives | `@/components` | `@mui/material` directly |
| MUI Icons | Wrap first in `@/components/`, then import wrapper | `@mui/icons-material` directly in features |
| Constants / text / labels | `@/constants` | Inline strings in JSX |
| Route paths | `ROUTES` from `@/constants` | Hardcoded strings in `router.push()` |
| API calls | Handler functions from `@/helper` | Raw `fetch()` in components |
| Images | `@/assets` | Direct file paths in JSX |
| Navigation hook | `useRouter` from `next/router` | `window.location` |
| Image component | `Image` from `next/image` | `<img>` HTML tag |
| Internal links | `Link` from `next/link` | `<a>` HTML tag |

---

## 11. Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Component file | PascalCase | `RepoCard.js`, `FilterSidebar.js` |
| Page file | kebab-case | `repo-details.js` |
| Feature folder | camelCase | `features/repoList/` |
| Constant key | SCREAMING_SNAKE_CASE | `HOME_HEADER`, `LOGIN_BUTTON` |
| Constant file | camelCase | `home.js`, `auth.js` |
| API handler function | camelCase + `Handler` suffix | `registerHandler`, `getReposHandler` |
| State variable | camelCase | `isLoading`, `repoList`, `hasMore` |
| Event handler | `handle` prefix | `handleSubmit`, `handleSearch` |
| Boolean state | `is` / `has` prefix | `isOpen`, `hasMore`, `isLoading` |
| Route key | SCREAMING_SNAKE_CASE inside `ROUTES` | `ROUTES.LOGIN`, `ROUTES.DASHBOARD` |
| SCSS module class | camelCase | `.cardWrapper`, `.heroSection` |

---

## 12. Code Style

| Rule | Correct | Wrong |
|---|---|---|
| Quotes | Double `"` | Single `'` |
| Semicolons | Always `;` | Omitting `;` |
| Indentation | 2 spaces | 4 spaces or tabs |
| Component export | `export default function Name()` | `export const Name = () =>` |
| Utility/handler export | Named `export async function xHandler` | Default export for handlers |
| Props destructuring | Inline in function signature | Accessing via `props.x` |
| No `console.log` | Use `console.error` for errors only | `console.log` in committed code |

---

## 13. Do Not — Hard Rules

- ❌ Never import from `@mui/material` in pages or feature components — always use `@/components`
- ❌ Never hardcode any string, label, placeholder, or text in JSX — put it in `@/constants`
- ❌ Never hardcode route paths — always use `ROUTES` from `@/constants`
- ❌ Never call `fetch()` directly — always go through `apiClient` via a handler in `@/helper`
- ❌ Never write TypeScript (`.ts`, `.tsx`, `tsconfig.json`)
- ❌ Never use the App Router — no `app/` directory, no `page.js`, no `layout.js`, no `"use client"`
- ❌ Never use class components
- ❌ Never manage form field state with plain `useState` — use Formik
- ❌ Never use `<img>` — use `next/image`
- ❌ Never use `<a>` for internal links — use `next/link`
- ❌ Never use `window.location` for navigation — use `useRouter()`
- ❌ Never install new packages without user approval
- ❌ Never disable `reactStrictMode`

---

## 14. New File Checklist

Before creating any file, go through this list:

1. **Common component?** → `src/components/ComponentName.js` + export from `src/components/index.js`
2. **Feature component?** → `src/features/featureName/ComponentName.js`
3. **Page?** → `src/pages/page-name.js` — thin shell, imports one feature component only
4. **New route?** → Add to `ROUTES` in `src/constants/routes.js` + add to `MENU_ITEMS` if navigable
5. **New constant / text?** → `src/constants/domain.js` — follow the `{ xProps: {...} }` shape, export from `src/constants/index.js`
6. **New API call?** → `src/helper/domain.js` — `export async function xHandler({...})` using `apiClient`, re-export from `src/helper/index.js`
7. **New image asset?** → `src/assets/images/` + re-export from `src/assets/index.js`
8. **All imports use `@/` alias** — never relative paths that cross directory boundaries