# Installing Git for Local Development

Git is the version-control system used to track changes in the Buika Elements codebase, collaborate with others, and push code to deployment platforms. This guide covers installing Git on Windows, macOS, and Linux.

> **Latest version:** 2.53.0 (as of April 2026)  
> **Official source:** [git-scm.com/downloads](https://git-scm.com/downloads)

---

## Table of Contents

1. [Windows](#windows)
2. [macOS](#macos)
3. [Linux](#linux)
4. [Verify Your Installation](#verify-your-installation)
5. [First-Time Configuration](#first-time-configuration)
6. [Next Steps](#next-steps)

---

## Windows

### Option A: Standalone Installer (Recommended)

1. Go to the official download page:  
   [git-scm.com/install/windows](https://git-scm.com/install/windows)
2. Click **"Click here to download"** to get the latest `x64` installer.
3. Run the downloaded `.exe` file.
4. Follow the setup wizard. The default settings are safe for most users. Key choices:
   - **Editor:** Select your preferred code editor (e.g., VS Code).
   - **PATH environment:** Choose *"Git from the command line and also from 3rd-party software"*.
   - **Line ending conversions:** Choose *"Checkout Windows-style, commit Unix-style line endings"*.
5. Click **Install** and wait for the process to complete.

### Option B: Winget (Package Manager)

If you have Windows Package Manager (`winget`) installed, open **PowerShell** or **Command Prompt** and run:

```powershell
winget install --id Git.Git -e --source winget
```

### Option C: Portable Version

Download the portable edition from the same download page if you want to run Git from a USB drive without installing it.

---

## macOS

### Option A: Homebrew (Recommended)

If you have [Homebrew](https://brew.sh/) installed, run:

```bash
brew install git
```

To also install the graphical tools (`git-gui` and `gitk`):

```bash
brew install git-gui
```

### Option B: Xcode Command Line Tools

Apple ships Git with the Xcode Command Line Tools. Install them with:

```bash
xcode-select --install
```

> **Note:** The version bundled with Xcode may lag behind the latest release. Use Homebrew if you need the newest features.

### Option C: MacPorts

If you use [MacPorts](https://www.macports.org):

```bash
sudo port install git
```

---

## Linux

### Debian / Ubuntu

```bash
sudo apt update
sudo apt install git
```

### Fedora

```bash
sudo dnf install git
```

### Arch Linux

```bash
sudo pacman -S git
```

### openSUSE

```bash
sudo zypper install git
```

### Other Distributions

See the official Linux installation page for additional distributions:  
[git-scm.com/install/linux](https://git-scm.com/install/linux)

---

## Verify Your Installation

Open a terminal (PowerShell, Terminal, or your shell of choice) and run:

```bash
git --version
```

You should see output similar to:

```
git version 2.53.0
```

---

## First-Time Configuration

Before you start working with repositories, tell Git who you are. This information is attached to every commit you make.

```bash
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
```

To verify your settings:

```bash
git config --list
```

### Recommended Settings for This Project

Set the default branch name to `main` (matching our remote repository):

```bash
git config --global init.defaultBranch main
```

Enable colored output and helpful aliases:

```bash
git config --global color.ui auto
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
```

---

## Next Steps

Now that Git is installed:

1. **Create a GitHub account** (see [`creating-github-account.md`](./creating-github-account.md)).
2. **Clone the Buika Elements repository**:
   ```bash
   git clone https://github.com/YOUR_ORG/buika-elements.git
   cd buika-elements
   ```
3. **Install project dependencies**:
   ```bash
   pnpm install
   ```
4. **Copy environment variables** and start developing:
   ```bash
   cp .env.example .env.local
   pnpm dev
   ```

---

## Resources

- [Pro Git Book](https://git-scm.com/book) — free, comprehensive guide
- [Git Cheat Sheet](https://git-scm.com/docs/gitcredentials)
- [GitHub Git Guides](https://github.com/git-guides)
