### FULL DEVELOPMENT PHASES (Phase 0 → Launch)

**Phase 0/1 — Foundation & Interactive Homepage (Checkpoint 1)**
- Implement the exact Stitch homepage design (pixel-perfect)
- Make the map fully interactive (Mapbox GL JS)
- Add zoom, pan, and hover tooltip (Climatic Impact + Area Type + Suggested Implementable Tech)
- Make overlay layer toggles functional (mock data)
- Success: App runs locally, matches Stitch visually, hover works on world/India map

**Phase 2 — Advanced Map & AI Recommender (Checkpoint 2)**
- Add factory pins (color-coded by emission intensity)
- Add emission heatmap layer
- Expand hover tooltip to include Renewable Energy ROI Calculator
- Build dedicated AI-Powered Recommender + Simulator page:
  - User selects region/goals → AI suggests optimal new industrial zones, relocation priorities, pollution-control upgrades
  - Show before/after metrics (emissions ↓, GDP/production ↑, CO₂ sequestered)
- Add India-focused initial view + realistic mock data
🟡 Phase 2 — Advanced Map & AI Recommender (status check: 🔄 NEXT IN PIPELINE / Hackathon Demo)
Goal: Make the AI Simulator intelligent by adding location recommendations and regulatory awareness.
Dataflow:

User fills inputs in AISimulator.tsx:
Region
Industry Type
Budget Cap

Frontend sends these parameters to the LLM using the hard-coded prompt above.
The LLM returns structured JSON with:
Emission reduction plan + steps + ROI for current location
Ranked alternative locations (with clear reasoning)
Government permission status for each location (locked/reserved areas mentioned only with valid reason)
Optional alternative industry suggestions

The app displays:
Charts and steps for emission reduction
Comparison table or cards for ranked locations
Color-coded map markers for recommended locations
Warning flags for any government-restricted zones


Key New Features Added:

The AI now recommends better locations for the chosen industry type.
It understands real Indian industrial and agricultural land-use realities.
It flags restricted areas with proper reasons (eco-sensitive zones, CRZ, agriculture reserved land, etc.).
All recommendations are ranked for easy decision making.

Data Storage: Still ephemeral (results disappear on refresh).
This version clearly shows the new capabilities you added for the hackathon checkpoint.

**Phase 3 — Carbon Credit Marketplace (Checkpoint 3)**
- Build clean Marketplace page with grid/list of credits
- Add filters, search, project-type cards
- Implement one-click “Buy” using GetBags SDK (USDC + cards)
- Show pricing and impact summary

**Phase 4 — User Dashboards (Checkpoint 4)**
- Personal Impact Dashboard:
  - Climate score, virtual forest (grows with actions)
  - Gamification (badges, impact history, leaderboards)
- Enterprise/Admin Dashboard:
  - Factory registration + CSV upload for emissions
  - Carbon footprint overview + credit balance
  - Approval flows for offsets/credits

**Phase 5 — Post-Purchase & Subscription Management**
- Dedicated dashboard for receipts, active subscriptions, renewal options
- Live impact tracking (“Your credits have offset X tons CO₂ and supported Y trees”)
- Seamless integration with GetBags for all transactions

**Phase 6 — Polish, Integrations & Production Readiness (Final)**
- Connect real APIs (OpenWeatherMap, CPCB AQI, Google Earth Engine)
- Add placeholder AI API calls for recommendations
- Full responsiveness + dark futuristic theme consistency across all pages
- Add navigation between all sections
- Performance optimization + clean commented code
- Prepare for backend (Supabase/Firebase) in next sprint

**Success Criteria for the Entire Project:**
- All features from the Core Vision are working
- Design stays 100% consistent with Stitch (neon green, glass-morphism, dark theme)
- Code is modular, commented, and uses React + Tailwind + shadcn/ui + Mapbox
- Ready for Phase 0/1 checkpoint → then sequential phases

Please follow the phases in order. After finishing each phase, reply with “✅ Phase X Complete” and a short summary so we can review before moving forward.