# Creating a GitHub Account

GitHub is the code-hosting platform where the Buika Elements source repository lives. You need an account to collaborate, file issues, and connect to deployment platforms like Vercel, Cloudflare, and Railway.

> **Official guide:** [docs.github.com — Creating an account on GitHub](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github)

---

## Table of Contents

1. [Sign Up](#sign-up)
2. [Verify Your Email](#verify-your-email)
3. [Secure Your Account](#secure-your-account)
4. [Join or Create the Buika Elements Repository](#join-or-create-the-buika-elements-repository)
5. [GitHub Desktop (Optional)](#github-desktop-optional)
6. [Next Steps](#next-steps)

---

## Sign Up

1. Navigate to [github.com](https://github.com/).
2. Click **"Sign up"** in the top-right corner.
3. Choose how you want to create your account:
   - **Email & password** — Enter your email, create a password, and choose a username.
   - **Continue with Google** — Use your Google account for one-click sign-up.
   - **Continue with Apple** — Use your Apple ID (note: if you use "Hide My Email," a new GitHub account will still be created).
4. Complete the CAPTCHA / puzzle verification.
5. Select the **free personal account** plan. It includes unlimited public and private repositories and is sufficient for this project.

> **Tip:** Choose a professional username. It will appear in commit history and public URLs.

---

## Verify Your Email

GitHub sends a confirmation email to the address you provided.

1. Open your email inbox.
2. Find the message from GitHub titled **"[GitHub] Please verify your email address"**.
3. Click the **Verify email address** button inside the email.
4. Return to GitHub — your account is now active.

> **Important:** You cannot create repositories or push code until your email is verified.

---

## Secure Your Account

### Enable Two-Factor Authentication (2FA)

GitHub strongly recommends 2FA. It is required for many organization memberships.

1. Click your profile picture → **Settings**.
2. In the left sidebar, click **Password and authentication**.
3. Under **Two-factor authentication**, click **Enable two-factor authentication**.
4. Choose your preferred method:
   - **Authenticator app** (e.g., Google Authenticator, Authy, 1Password) — recommended.
   - **SMS** — less secure but easier to set up.
   - **Security keys** (e.g., YubiKey) — most secure option.
5. Follow the prompts to complete setup and save your **recovery codes** in a safe place.

### Generate a Personal Access Token (for HTTPS Git operations)

If you clone repositories via HTTPS, you will need a token instead of a password.

1. Go to **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**.
2. Click **Generate new token (classic)**.
3. Give it a descriptive name, e.g., `Buika Elements Local Dev`.
4. Select scopes:
   - `repo` — full control of private repositories
   - `read:org` — if the repo belongs to an organization
5. Set an expiration date (GitHub recommends 30–90 days).
6. Click **Generate token**.
7. **Copy the token immediately** — you cannot see it again.

When Git asks for your password during `git clone` or `git push`, paste this token instead.

---

## Join or Create the Buika Elements Repository

### If the repository already exists

Ask the repository owner to send you an invite:

1. The owner navigates to the repo → **Settings** → **Access** → **Collaborators**.
2. Clicks **Add people** and enters your GitHub username or email.
3. You accept the invitation via email or the [GitHub notifications](https://github.com/notifications) page.

### If you are creating the repository

1. Click the **+** icon in the top-right → **New repository**.
2. Name it `buika-elements`.
3. Choose **Private** (recommended for client work).
4. Do **not** initialize with a README or `.gitignore` if you are pushing an existing local project.
5. Click **Create repository**.
6. Follow GitHub's instructions to push your existing code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/buika-elements.git
   git branch -M main
   git push -u origin main
   ```

---

## GitHub Desktop (Optional)

If you prefer a graphical interface over the command line, download **GitHub Desktop**:

- [desktop.github.com](https://desktop.github.com/)

It handles commits, branches, and pull requests with a visual UI and is especially helpful for beginners.

---

## Next Steps

With your GitHub account ready:

1. **Install Git locally** (see [`installing-git.md`](./installing-git.md)) if you haven't already.
2. **Clone the Buika Elements repository** to your machine:
   ```bash
   git clone https://github.com/YOUR_ORG/buika-elements.git
   ```
3. **Set up Sanity** (see [`creating-sanity-account.md`](./creating-sanity-account.md)) for the CMS backend.
4. **Deploy the app** — choose from:
   - [Vercel](./deploying-to-vercel.md)
   - [Cloudflare](./deploying-to-cloudflare.md)
   - [Railway](./deploying-to-railway.md)

---

## Resources

- [GitHub Docs — Getting Started](https://docs.github.com/en/get-started)
- [GitHub Docs — About authentication](https://docs.github.com/en/authentication)
- [GitHub Docs — Managing your personal account](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github)
