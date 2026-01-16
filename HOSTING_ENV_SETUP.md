# Updating environment variables on common hosts

This file shows where to add your API keys in hosting providers (no keys included). Follow the steps for your provider and paste your key there.

Render
------
1. Sign in to https://dashboard.render.com/ and open your `raptorx-api` service.
2. Go to the "Environment" or "Environment Variables" section.
3. Add the following variables (use your real secret values):

   - `AI_PROVIDER` = `openrouter`  (or `openai`)
   - `OPENROUTER_API_KEY` = `your_openrouter_key_here`
   - `OPENAI_API_KEY` = `your_openai_key_here`
   - `OPENROUTER_MODEL` = `openrouter/auto` (optional)
   - `OPENAI_MODEL` = `gpt-4o-mini` (optional)

4. Save and click "Deploy latest commit" (or Redeploy).

Vercel
------
1. Go to your project on https://vercel.com/ and open "Settings" → "Environment Variables".
2. Add the same variables as above for the environment (Production/Preview/Development) you want.
3. Save and trigger a redeploy.

Heroku
------
1. Open your app in the Heroku Dashboard.
2. Go to "Settings" → "Config Vars" → "Reveal Config Vars".
3. Add the environment variables and save. Heroku will restart the app automatically.

General notes
-------------
- Never paste secrets into code or commit them. Use the hosting provider UI or their secrets manager.
- After saving environment variables, redeploy or restart the service so the new values take effect.
- If you use CI (GitHub Actions), add secrets in the repository Settings → Secrets and reference them in your workflow.
