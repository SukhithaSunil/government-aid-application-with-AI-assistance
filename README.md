

# Government social support portal. Multi-step form wizard using React 

Tech Stack 

• React.js
• UI Library: Material UI, Tailwind CSS
• Form Handling: React Hook Form 
• State Management: Redux Toolkit
• API Calls: Axios
• Internationalization: React-i18next
• Routing: React Router
• Optional Testing: Jest, Testing Library


The portal which will allow user to enter personal, family & financial information, which demonstrates the following.

1. Responsive Multi-step form with progress bar.
2. Language switching feature.
3. Keeping the state of completed steps in local storage, so that when the user reopens the page, the user's form willl get filled with previous data.
4. Form validations using React Hook Form.
5. createAsyncThunk ans axios for calling mock API.
6. Mock API using json-server.
7. Submitting data to mock API.
8. OpenAI GPT API to generate suggestions with edit option.
9. Toast for error API responses
10. Routing to not found for unathorized urls
    
<img width="1714" height="939" alt="Screenshot 2025-09-16 at 1 10 56 AM" src="https://github.com/user-attachments/assets/b169f5d3-2485-421f-8ad2-9b4b0ad01b03" />

<img width="1714" height="939" alt="Screenshot 2025-09-16 at 1 11 20 AM" src="https://github.com/user-attachments/assets/bfe9991e-1963-4190-8f63-9b9a3006f910" />

## Getting Started and Installing
1. First Git clone the repo into your computer
   git clone https://github.com/SukhithaSunil/community-aid-finance-portal
2. Open your terminal on folder community-aid-finance-portal
3. $ npm install
 This should install all the dependencies.
4. ✅ Steps to Get an OpenAI API Key

Go to OpenAI’s website
🔗 https://platform.openai.com/signup

If you already have an account, log in here:
🔗 https://platform.openai.com/login

Sign in or sign up
You can use:

Google or Microsoft accounts

Or just a regular email and password

Go to the API Keys page
Once logged in, go to:
🔗 https://platform.openai.com/api-keys

Click "Create new secret key"

Give it a name (optional)

Copy the key that gets generated

⚠️ Important: You will only see the full key once — copy it and store it securely.

Use the key in  app
In  project,  store it in an .env file with name VITE_APP_OPEN_API_KEY
5. Once done run   
6. npm run dev to start the server.
    open (http://localhost:3000) in your browser.
    This should open up the Demo App
7. npm run start:json-server to open JSON Server started on PORT :3001
