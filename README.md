# Julian Andres Silva, portfolio site

Static single-page site (index.html + styles.css, no build step).

- Preview locally: `python3 -m http.server` in this folder, then open http://localhost:8000
- Add work samples: see `assets/samples/README.md` and the "WORK SAMPLES" comment in index.html.
- CV download: intentionally not included (the CV PDF contains a phone number).

## Deploy to GitHub Pages
1. `gh auth login` (or create an empty public repo, e.g. `<user>.github.io`, on github.com)
2. `gh repo create <user>.github.io --public --source=. --push`
3. Repo Settings → Pages → Deploy from branch `main` / root.

## Content notes
- Site rule: no accent marks anywhere (write "Bogota", not the accented form).
- Experience timeline (6 roles, newest first; career since Nov 2012, 13+ years):
  1. Commercial Design Reviewer, Exactus Energy (Jan 2023 – Present)
  2. Contractor Engineer, Planning Consultant Office, IDU (Dec 2020 – Jan 2022)
  3. Hydraulic Engineer, Cemosa Colombia (Oct 2019 – Dec 2020)
  4. Teaching Assistant, Universidad de Los Andes (Feb 2019 – Dec 2019)
  5. Project Engineer, Hidrinco (Mar 2014 – Dec 2015)
  6. Project Support Engineer, Panamerican Firestop Consulting LTDA (Nov 2012 – Feb 2014)
- If you add or remove a role, also update the years of experience in the meta descriptions and the About text.
