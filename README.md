# Social Support Application

> A modern, user‑friendly front-end for a government social support portal, featuring a responsive and accessible multi-step application wizard with integrated AI assistance for composing free-text responses.

---

## 🚀 Quick Overview

This React application demonstrates how citizens can apply for financial assistance using a clear and accessible multi-step form. Step 3 features an integrated **“Help Me Write”** tool that leverages the OpenAI Chat Completions API to provide suggested text for the applicant.

---

## 📋 Table of Contents

1. [Features](#-features)  
2. [Tech Stack](#-tech-stack)  
3. [Project Structure](#-project-structure)  
4. [Getting Started](#-getting-started)  
   * [Getting an OpenAI API Key](#getting-an-openai-api-key)  
   * [Environment Variables](#environment-variables)  
   * [Install & Run](#install--run)  
5. [OpenAI Integration](#-openai-integration-help-me-write)  
6. [UX / Accessibility / i18n](#-ux--accessibility--i18n)  
7. [Local Save & Mock Submit](#-local-save--mock-submit)  
8. [Architecture & Decisions](#-architecture--decisions)  
9. [Improvements & Roadmap](#-improvements--roadmap)  
10. [Troubleshooting](#-troubleshooting)  
11. [License & Contact](#-license--contact)

---

## ✨ Features

* 🧭 **Responsive multi-step wizard with progress tracking**  
* 🌐 **Language switching** (English + Arabic, full RTL support)  
* 💾 **State persistence**: auto-save progress to local storage with resume functionality  
* ✅ **Form validation** powered by React Hook Form + Yup  
* 🔗 **Unified API layer** with Axios + custom fetch hook  
* 🗄️ **Mock API** using json-server for local development  
* 📤 **Data submission** to mock API with success/error handling  
* ✍️ **Help Me Write** button in Step 3 textareas — shows AI suggestion modal with Accept / Edit / Discard  
* 🔔 **Toast notifications** for API errors and key status messages  
* 🚧 **404 routing** for unknown or unauthorized URLs  
* 🛡️ **Error Boundary** to gracefully handle unexpected runtime errors  
* 💤 **Lazy loading** of route-based components for optimal performance  
* ♿ **Accessibility** with ARIA attributes and full keyboard navigation  
* ⚠️ **Error handling** (timeouts, API failures via Axios interceptors)  
* 🏷️ **PropTypes** for component prop validation  

---

## 🧰 Tech Stack

* **Framework:** React 18+  
* **Styling:** Tailwind CSS  
* **Component Library:** Material UI  
* **Forms & Validation:** React Hook Form + Yup  
* **State Management:** Redux Toolkit
* **API Calls:** Axios + common fetch hook  
* **Mock Backend:** json-server  
* **i18n:** react-i18next (EN + AR with RTL handling)  
* **Routing:** React Router (multi-step wizard, 404 route, lazy loading)  
* **Testing:** Jest + React Testing Library

---

## 🗂 Project Structure

```
.
├── public
│   └── (static assets + index.html)
├── src
│   └── (React application source code, see below)
├── .gitignore
├── .prettierrc
├── babel.config.cjs
├── db.json
├── eslint.config.js
├── index.html
├── jest.config.js
├── package.json
├── package-lock.json
├── postcss.config.js
├── setupTests.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

### Src Folder Structure

```
src
├── App.jsx
├── App.css
├── assets/
│   └── (images, icons, etc.)
├── components/
│   ├── ProgressBar/
│   ├── GlobalErrorToast/
│   └── ...
├── pages/
│   ├── NotFound
│   ├── UserCreationForm
│   └── ...
├── store/
│   ├── formSlice
│   └── index.js
│   └── ...
├── hooks/
│   └── useFetch.js
│   └── ...
├── network/
│   └── axiosInstance.js
├── utils/
│   └── constants.js
└── main.jsx
```

---

## 🏁 Getting Started

### Getting an OpenAI API Key

1. **Create an OpenAI account**  
   Sign up at [https://platform.openai.com/signup](https://platform.openai.com/signup).

2. **Generate a key**  
   Go to **View API keys** → **Create new secret key** once logged in.

3. **Store it securely**  
   Copy the key—this is your only time to see it.

### Environment Variables

Create a `.env` file at the project root:

```env
VITE_APP_OPEN_API_KEY=your_key_here
```

> **Security note:** Never commit your real key to source control.  

### Install & Run

```bash
git clone https://github.com/SukhithaSunil/government-aid-application-with-AI-assistance

npm install
# start mock API (json-server)
npm run start:json-server
npm run dev
# App will run at http://localhost:3000
```

### Build & Serve (production)

```bash
npm run build
# Then deploy the build folder to your static host of choice
```

---

## 🤖 OpenAI Integration (Help Me Write)

**Flow**

1. User clicks **Help Me Write** beside a Step 3 textarea.  
2. The front-end sends a request to `https://api.openai.com/v1/chat/completions` using `gpt-3.5-turbo`.  
3. The AI response appears in a modal where the user can **Accept**, **Edit**, or **Discard**.

**Example Prompt**

```json
{
  "model": "gpt-3.5-turbo",
  "messages": [
    { "role": "system", "content": "You are a helpful assistant that writes clear, concise statements for social assistance applications. Keep tone respectful and factual." },
    { "role": "user", "content": "I am unemployed with no income. Help me describe my financial hardship in ~120 words, simple English." }
  ]
}
```

*Any API error triggers a toast notification for visibility.*

---

## ♿ UX / Accessibility / i18n

* **Validation feedback:** Fields use `aria-invalid` + `aria-describedby` so screen readers announce errors.  
* **Error messages:** `<p>` elements include `role="alert"` to ensure immediate announcement.  
* **Keyboard support:** Logical tab order, Enter to submit a step, Esc to close modals.  
* **Language switching:** Arabic toggles layout to RTL and flips progress bar order. Language choice persists across sessions.

---

## 💾 Local Save & Mock Submit

* Form state is saved to `localStorage` after each step.  
* On **Submit**, the app calls the mock backend (`json-server`), which returns success or simulated validation errors.  
* Toast notifications handle error states, and success shows a confirmation page.

---

## 🏗 Architecture & Decisions

* **Redux Toolkit** for multi-step cross-component state and persistence.  
* **React Hook Form** + **Yup** for efficient validation and minimal re-renders.  
* **Tailwind + MUI**: Tailwind for layout and utility classes; MUI for accessible components.  
* **Common fetch hook & Axios** to unify API logic and error handling.  
* **Lazy loading** of route-based components to reduce initial bundle size.  
* **Error Boundary** to trap rendering errors and show fallback UI.

---

## 🔮 Improvements & Roadmap

* Add end-to-end tests (Cypress or Playwright).  
* Replace front-end OpenAI direct usage with a secure backend proxy.  
* Add more languages beyond English and Arabic.  
* Optional user authentication to let users resume across devices.

---

## 🐞 Troubleshooting

* **AI fails/timeouts** — Check network calls & verify OpenAI key.  
* **localStorage data missing** — Inspect browser storage.  
* **Mock API errors** — Ensure `json-server` is running & endpoint is correct.

---

## 📄 License & Contact

This project is MIT licensed.  
For questions, architecture notes, or a walkthrough, contact: **Sukhitha Sunil <sukithasunil@gmail.com>**

---

*Prepared by: Sukhitha Sunil*
