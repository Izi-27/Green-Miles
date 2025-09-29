#!/bin/bash

# Make sure .gitignore exists with node_modules excluded
echo "# Dependencies
node_modules/
/.pnp
.pnp.js

# Next.js
.next/
out/

# Production
/build
/dist

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# OS files
.DS_Store
Thumbs.db" > .gitignore

# Add .gitignore
git add .gitignore

# Create a new branch without the history
git checkout --orphan temp_branch

# Add all files except node_modules (which is now ignored)
git add .

# Commit
git commit -m "Initial commit without node_modules"

# Delete the main branch
git branch -D main

# Rename the current branch to main
git branch -m main

# Force push to GitHub
git push -f origin main

echo "Done! node_modules has been removed from Git tracking."