# Shop (Vite + TypeScript + React + MobX)

## What's included
- Vite + React + TypeScript setup
- Class-component based pages (Home, ProductDetail, Cart)
- MobX store for cart + Context provider
- Fetching data from https://fakestoreapi.com
- SessionStorage-based cart persistence
- Basic Cypress test spec

## How to run
1. `npm install`
2. `npm run dev` (visit http://localhost:5173)
3. `npm run cy:open` to open Cypress

Notes:
- This project uses browser `fetch` to call fakestoreapi. The `got` library is Node-only (not suitable for browser fetches) so fetch is used in the client.
- Filters are applied locally / and for single-category selection we call the category API to demonstrate re-fetch behavior.
