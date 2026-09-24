# Julian Andres Silva, portfolio site

Static single-page site (index.html + styles.css, no build step).

- Preview locally: `python3 -m http.server` in this folder, then open http://localhost:8000
- Add work samples: see `assets/samples/README.md` and the "WORK SAMPLES" comment in index.html.
- CV download: intentionally not included (the CV PDF contains a phone number).

## Deploy to GitHub Pages
1. `gh auth login` (or create an empty public repo, e.g. `<user>.github.io`, on github.com)
2. `gh repo create <user>.github.io --public --source=. --push`
3. Repo Settings → Pages → Deploy from branch `main` / root.
