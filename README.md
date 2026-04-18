# ClimateGuard (Evn) - Planetary Command

ClimateGuard is a dark-themed, futuristic web application designed to act as a command center for environmental impact. It allows users to track carbon emissions, explore verified carbon offset credits, and simulate AI-optimized green technology implementations across diverse zones.

This project is built using:
- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Leaflet & React-Leaflet** for interactive mapping
- **Framer Motion** for animations

## Current Features (Phase 0/1)
- **Interactive Map:** Hover and explore emission data, AQI levels, climate risks, and green tech suitability across 20+ functional nodes in India.
- **Layers:** Dynamically switch map layers (Emissions, AQI Heatmaps, Climate Risks, Tech Suitability).
- **AI Simulator:** (Mock) Select regions and budget constraints to generate AI-driven mitigation steps and ROI projections.
- **Carbon Market:** (Mock) View and filter tokenized, verified real-world emission reduction projects to purchase credits.
- **Impact Dashboard:** Gamified tracking of offsets and enterprise ESG metrics with dynamic badges and progress rings.

---

## How to Run Locally

Follow these steps to run the application on your machine:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and `npm` installed. You can verify this by running:
```bash
node -v
npm -v
```

### 2. Install Dependencies
Open your terminal, navigate to the project directory, and install the required NPM packages.
```bash
npm install
```

### 3. Start the Development Server
Run the Vite development server.
```bash
npm run dev
```

### 4. View in Browser
By default, Vite will start the server on `http://localhost:5173`. Open this URL in your web browser to view your local version of the app.

---

## Moving Forward (Upcoming Phases)
- Hooking the Simulator to generative LLM APIs (e.g. OpenAI/Gemini).
- Integrating the GetBags SDK for crypto/fiat carbon credit transactions.
- Replacing mock map data with real-time API integrations (OpenWeatherMap, CPCB AQI).
- Deploying a backend database (Firebase/Supabase) to store registered user profiles and their purchased offsets.
