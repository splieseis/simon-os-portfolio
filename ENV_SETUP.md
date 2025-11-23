# Environment Variables Setup

This document lists all environment variables used in SimonOS.

## Required Environment Variables

**None!** SimonOS works out of the box without any environment variables.

## Optional Environment Variables

### `GITHUB_TOKEN`

**Purpose:** Fetches your GitHub commit statistics (commit count and last commit info)

**Type:** Optional

**How to get it:**
1. Go to [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "SimonOS Stats")
4. Set expiration (recommended: 90 days or custom)
5. Check these scopes:
   - ✅ `repo` - Access private repositories (to count private repo commits)
   - ✅ `read:user` - Read user profile data
   - ❌ `user:email` - NOT needed (we don't read email addresses)

**Setup:**
1. Create a `.env` file in the project root (if it doesn't exist)
2. Add your token:

```bash
GITHUB_TOKEN=ghp_your_secret_token_here
```

**Security:**
- ✅ The `.env` file is already in `.gitignore` - your token won't be committed
- ✅ The token is only used server-side during build time (Astro's frontmatter)
- ✅ The token is never exposed to the client/browser
- ✅ If the token is missing, the app gracefully shows `0` commits (no errors)

**What it does:**
- Fetches your commit count from the **last 10 years** (default, see `GITHUB_STATS_MAX_YEARS` below)
- Shows your last commit time and repository
- **Dynamic Updates:** Stats update automatically for visitors without needing to rebuild!
  - Initial load: Shows stats from build time (fast, no delay)
  - After 1 second: Fetches fresh stats from `/api/github-stats` endpoint
  - API endpoint: Caches responses for 15 minutes to reduce GitHub API calls
  - **Note:** Requires a hosting platform that supports serverless functions (Vercel, Netlify, Cloudflare Pages, etc.)

**Note:** Due to GitHub API limitations (1-year max per query), the function queries each year separately. For accounts older than 10 years, only the most recent 10 years are counted by default.

**Hosting Requirements for Dynamic Updates:**
- ✅ **Works with:** Vercel, Netlify, Cloudflare Pages, AWS Amplify, and other platforms with serverless function support
- ⚠️ **Static hosting (GitHub Pages, etc.):** API endpoint won't work, but the site will still show build-time stats
- The component gracefully falls back to initial stats if the API call fails

---

### `GITHUB_STATS_MAX_YEARS`

**Purpose:** Configures how many years of commit history to fetch (default: 10)

**Type:** Optional

**Default:** `10` years

**Setup:**
Add to your `.env` file if you want to query more (or fewer) years:

```bash
GITHUB_STATS_MAX_YEARS=20
```

**Examples:**
- `GITHUB_STATS_MAX_YEARS=5` - Only query last 5 years (faster, fewer API calls)
- `GITHUB_STATS_MAX_YEARS=15` - Query last 15 years (slower, more API calls)
- `GITHUB_STATS_MAX_YEARS=50` - Query up to 50 years (very slow, many API calls)

**Performance Note:**
- Each year requires 1 API call
- Default of 10 years = 11 API calls total (1 for account info + 10 for years)
- Setting to 20 years = 21 API calls total
- Higher values = longer build times but more complete commit counts

**Troubleshooting:**
- If you see `0` commits, check that:
  1. Your `.env` file exists in the project root
  2. The token is correctly formatted (starts with `ghp_`)
  3. The token has the correct scopes (`repo` and `read:user`)
  4. The token hasn't expired

## Clean Up

If you have old/unused environment variables in your `.env` file from previous attempts, you can safely remove them. The only variable currently used is:

- `GITHUB_TOKEN` (optional)

All other variables can be removed.

