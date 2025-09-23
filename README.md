# Social Support Application — Front-End

> A polished front-end for a government social support portal. This repo implements a responsive, accessible, multi-step application wizard with optional AI assistance for writing free-text fields.

---

## 🚀 Quick overview

This project is a client-side React application built to let citizens apply for financial assistance through a clear, accessible multi-step form. Step 3 includes an integrated **"Help Me Write"** flow that calls the OpenAI Chat Completions API to generate text suggestions for the applicant.

---

## 📋 Table of contents

1. [Features](#-features)
2. [Tech stack](#-tech-stack)
3. [Getting started](#-getting-started)

   * [Getting an OpenAI API key](#getting-an-openai-api-key)
   * [Environment variables](#environment-variables)
   * [Install & run](#install--run)
4. [OpenAI integration](#-openai-integration)
5. [UX / Accessibility / i18n](#-ux--accessibility--i18n)
6. [Local save & mock submit](#-local-save--mock-submit)
7. [Architecture & decisions](#-architecture--decisions)
8. [Improvements & roadmap](#-improvements--roadmap)
9. [Troubleshooting](#-troubleshooting)
10. [License & contact](#-license--contact)

---

## ✨ Features

* 🧭 **Responsive multi-step  wizard with progress tracking**
* 🌐 **Language switching feature** (English + Arabic, full RTL support)
* 💾 **State persistence**: Auto save user progress to local storage and resume functionality.
* ✅ **Form validations** powered by React Hook Form + Yup.
* 🔗 **Common fetch hook & Axios** for all API calls (mock and OpenAI).
* 🗄️ **Mock API using json-server** to simulate backend endpoints.
* 📤 **Data submission to mock API** with proper success/error handling.
* ✍️ **Help Me Write** button for each Step 3 textarea — shows AI suggestion modal with Accept / Edit / Discard.
* 🔔 **Toast notifications** for API error responses and important status messages.
* 🚧 **Routing to Not Found page** for unauthorized or unknown URLs.
* 🛡️ **Error Boundary** to gracefully handle unexpected rendering errors.
* 💤 **Lazy loading** of route-based components for optimal performance.
* ♿ **Accessibility**: with Aria & keyboard navigation support.
* ⚠️ **Graceful handling of errors** (timeouts, API failures with Axios interceptors).
* 🏷️ **PropTypes** used for props validation.

---

## 🧰 Tech stack

* Framework: **React (v18+)**
* Styling: **Tailwind CSS**
* Component library:  **Material UI**
* Forms: **React Hook Form** + **Yup** for validation
* State: **Redux Toolkit** (global state persistence)
* API calls: **Axios** + custom common fetch hook
* Mock API: **json-server** (for local testing and submissions)
* i18n: **react-i18next** (EN + AR with RTL handling)
* Routing: **React Router** (multi-step wizard + 404 route + lazy loading)
* Testing: **Jest** + **React Testing Library** (sample tests included)

---

## 🏁 Getting started

### Getting an OpenAI API key

To enable the **Help Me Write** feature you need an OpenAI API key.

1. **Create an OpenAI account**
   Go to [https://platform.openai.com/signup](https://platform.openai.com/signup) and create a free or paid account.

2. **Generate a key**
   After signing in, open the menu in the top right → **View API keys** → **Create new secret key**.

3. **Copy the key safely**
   Copy the generated key. You will not be able to view it again.

4. **Store it in an environment file**
   Add it to a local `.env` file in this project as shown below and **never commit this key to source control**.

### Environment variables

Create a `.env` at project root with the following keys:

```env
# OpenAI key used by the front-end dev server proxy (do NOT embed your key in public builds)
# please keep your OpenAI key in VITE_APP_OPEN_API_KEY

VITE_APP_OPEN_API_KEY=''

```

> Security note: **Never** commit your real OpenAI secret to source control. Use a backend proxy or serverless function that holds the key and performs the request on behalf of the client.

### Install & Run (development)

```bash
# clone
git clone https://github.com/SukhithaSunil/government-aid-application-with-AI-assistance
cd community-aid-finance-portal

# install
npm install

# start mock API (json-server)
npm run start:json-server

# dev
npm run dev
# app will run at http://localhost:3000
```

### Build & Serve (production)

```bash
npm run build
# then serve the build directory with your static host of choice
```

---

## 🤖 OpenAI integration (Help Me Write)

**Flow**

1. User clicks `Help Me Write` next to a textarea in Step 3.
2. Sends a request to `https://api.openai.com/v1/chat/completions` using `gpt-3.5-turbo`.
3. The response shows in modal. User can `Accept` (replace textarea), `Edit`, or `Discard`.

**Example prompt sent to OpenAI**

```json
{
  "model": "gpt-3.5-turbo",
  "messages": [
    { "role": "system", "content": "You are a helpful assistant that writes clear, concise
    statements for social assistance applications. Keep tone respectful and factual." },
    { "role": "user", "content": "I am unemployed with no income. Help me describe my
    financial hardship in ~120 words, simple English." }
  ]
}
```

**Error handling & UX**

* Toast notifications surface any API errors clearly.

---

## ♿ UX, Accessibility & i18n

* Added aria-invalid and aria-describedby when an error is present. Screen readers can announce that the field is invalid and point to the error message.
* Error Message with role="alert" The <p> element containing the validation message has role="alert", ensuring screen readers announce the error immediately when it appears.
* Keyboard: Tab order logical, Enter to submit step, Esc to close modals.
* Arabic support toggles layout to RTL and flips progress bar order.
* Language switch available at all times and persisted across sessions.

---

## 💾 Local save & mock submit

* Form state saved to `localStorage` after each step.
* On `Submit`, app calls a mocked endpoint (json-server) that returns success or simulated validation errors.
* Toast notifications error states.
* On success takes user to confirmation screen.

---

## 🏗 Architecture & decisions

* **Why Redux Toolkit?** Cross-step state, persistence middleware, predictable updates.

* **Why React Hook Form?** Minimal re-renders and easy integration with validation schema.

* **Tailwind + MUI:** Tailwind for layout + utility, MUI for accessible ready-made controls where needed.

* **Common fetch hook & Axios:** Simplifies and unifies API calls and error handling.

* **Lazy loading**: Route-based code splitting to reduce initial bundle size.

* **Error boundary**: Captures runtime errors and displays a fallback UI without breaking the app.

---

## 🐞 Troubleshooting

* **AI fails / times out** — check network tab; ensure OpenAI key is valid.

* **LocalStorage not restoring** — check storage.

* **Mock API errors** — verify json-server is running on the correct port.

---

## 📄 License & Contact

This project is MIT licensed. For questions, architecture notes or to request a walkthrough, contact: `Sukhitha Sunil <sukithasunil@gmail.com>`.

---

*Prepared by: Sukhitha Sunil*\\
