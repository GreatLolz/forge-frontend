# forge-frontend

Frontend infrastructure for the Synapse Forge platform

## Development

### Local Setup

1. Install Node.js if you haven't already. See [Node.js documentation](https://nodejs.org/) for installation instructions.

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The development server will be available at `http://localhost:3000` by default. The application will automatically reload when you make changes to the code.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

### Deployment

To deploy to the staging server, you can use the following git alias. This will:
1. Stash any uncommitted changes
2. Update main branch
3. Update staging branch with latest changes from main
4. Force push staging branch
5. Restore your working branch and any stashed changes

```bash
git config alias.deploy-staging '!f() { \
  current_branch=$(git rev-parse --abbrev-ref HEAD); \
  stash_needed=false; \
  if ! git diff --quiet || ! git diff --cached --quiet; then \
    stash_needed=true; \
    git stash push -u -m "deploy-staging"; \
  fi; \
  git checkout main && \
  git pull origin main && \
  git checkout staging && \
  git pull origin staging && \
  git rebase main && \
  git push --force-with-lease origin staging && \
  git checkout "$current_branch"; \
  if $stash_needed; then git stash pop; fi; \
}; f'
```

After configuring the alias, you can deploy to staging by running:
```bash
git deploy-staging
```