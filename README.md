# 🌿 ClimateGuard (Evn) — Planetary Integrity Command

[![Site Status](https://img.shields.io/website?url=https%3A%2F%2Fkaitipala-aboamjl5r-devariwala2712s-projects.vercel.app&logo=vercel&style=flat-square)](https://kaitipala-aboamjl5r-devariwala2712s-projects.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Stack-React_19_|_Vite_|_Firebase-10b981?style=flat-square)](#-tech-stack)
[![Security](https://img.shields.io/badge/Security-Domain_Restricted-blue?style=flat-square)](#-architecture--security)

**ClimateGuard** is an enterprise-grade environmental intelligence platform designed to bridge the gap between industrial operations and global sustainability. Built with a futuristic, glassmorphic aesthetic, it provides stakeholders with the tools to visualize, simulate, and mitigate their climatic footprint through data-driven precision.

🚀 **Live Prototype:** [kaitipala-aboamjl5r-devariwala2712s-projects.vercel.app](https://kaitipala-aboamjl5r-devariwala2712s-projects.vercel.app)

---

## 🛰️ The Idea: Planetary Integrity Command
In an era of mandatory ESG disclosures and rising climatic volatility, enterprises lack a unified "Command Center" to manage their environmental risk. ClimateGuard solves this by providing:

- **Visualization**: Transforming abstract data (AQI, CO2, Heatmaps) into interactive spatial intelligence.
- **Optimization**: Using Generative AI to model transition paths from industrial-heavy to carbon-neutral operations.
- **Accountability**: A transparent marketplace for tokenized, verified carbon offset projects.

---

## 🛠️ How it Works: Core Modules

### 1. Atmospheric Command Center (Interactive Map)
A high-performance mapping engine built on **Leaflet** that visualizes:
- **Real-time AQI**: Dynamic heatmaps and station markers targeting industrial clusters in India.
- **Emission Intensity**: Factory-level monitoring (color-coded by severity).
- **Climate Risk**: Overlays for flooding, drought, and biodiversity index.
- **Tech Suitability**: Recommending locations for solar, wind, or carbon-sequestration projects based on terrain data.

### 2. AI-Enabled Simulator (Gemini 1.5 Pro)
The "brain" of the platform. Using the **Google Gemini API**, users can input existing industrial parameters to receive:
- **Transition Strategy**: Multi-step plans to reduce Scope 1 and Scope 2 emissions.
- **Relocation Recommendations**: Identifying optimal zones with better renewable infrastructure or lower regulatory risk.
- **Regulatory Compliance Check**: Real-time screening against eco-sensitive zone (ESZ) and CRZ regulations in India.

### 3. Carbon Credit Marketplace
A digital exchange for verified environmental impact units:
- **Verified Projects**: Reforestation, renewable energy, and community-led initiatives.
- **Impact Cards**: Detailed metadata for every credit including vintage, project type, and registry verification.
- **Tokenized Offsets**: Ready for integration with digital wallets and automated retirement of credits.

---

## ⚙️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, TypeScript, Tailwind CSS |
| **Animation** | Framer Motion (Micro-interactions & transitions) |
| **Mapping** | Leaflet, React-Leaflet, GeoJSON visualization |
| **Intelligence** | Google Gemini 1.5 Pro (Generative AI) |
| **Infrastructure** | Firebase (Auth, Database), Vercel (CI/CD) |

---

## 🔒 Architecture & Security

### Secure-by-Design Key Management
To protect sensitive API tokens (Gemini, AQICN) while maintaining a browser-based SPA architecture, we implement **HTTP Referrer Restriction**:
- **Domain Locking**: API keys are restricted via Google Cloud Console to only accept requests from `http://localhost:5173` and our verified Vercel domains.
- **Bundle Safety**: Keys exposed in the client-side bundle are useless to unauthorized third parties, as they will be rejected by the API provider if the request origin doesn't match our domain.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- npm / pnpm

### 2. Clone and Setup
```bash
git clone https://github.com/DevAriwala2712/Evn.git
cd Evn
cp .env.example .env.local
```

### 3. Configure Environment Variables
Edit `.env.local` and add your credentials:
- **Gemini API Key**: From Google AI Studio.
- **Firebase Config**: From your Firebase Project Settings.
- **AQICN Token**: From the World Air Quality Index project.

### 4. Launch Development
```bash
npm install
npm run dev
```

---

## 🛤️ Roadmap
- [ ] **Phase 3**: Integration with blockchain SDKs for native carbon credit minting.
- [ ] **Phase 4**: Enterprise factory registration and CSV-based footprint uploading.
- [ ] **Phase 5**: Real-time integration with satellite telemetry (Google Earth Engine).
- [ ] **Phase 6**: Global expansion beyond India-specific datasets.

---

*Built with ❤️ for a Sustainable Future.*
