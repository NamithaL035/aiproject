<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1MT5e2c6WI-k2qtVzgU2oiAdaEg2LUeKS

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create `.env` and set:
   - `VITE_SUPABASE_URL=https://ahdwmagkquavrmwsvzml.supabase.co`
   - `VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoZHdtYWdrcXVhdnJtd3N2em1sIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc0NjgxNiwiZXhwIjoyMDc1MzIyODE2fQ.EqyPFRms7ZCvBFUmMTgbGfX_3eW3uOLIcTrVnzr7J3I`
   - Optionally `GEMINI_API_KEY` for AI assistant features
3. Run the app:
   `npm run dev`
