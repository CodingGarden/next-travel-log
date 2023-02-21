# Full Stack Travel Log with Next.js 13 Beta

Install dependencies

```sh
npm install
```

Copy `.env.sample` to `.env.local`

Add your own Map Tiles URL (Get one from [Leaflet-Providers](https://leaflet-extras.github.io/leaflet-providers/preview/) Notice that some of them require registration and a key) - Recommended free one: `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png`

Get MongoDB running, either locally or can create a Project and Cluster using any online provider.

Update `DB_URL` and `DB_NAME` accordingly. (DB_NAME could stay with the default value)

Finally run the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Tech Stack

## Backend

* [Next.js 13 Beta](https://beta.nextjs.org/docs)
  * [app directory](https://beta.nextjs.org/docs/routing/fundamentals)
  * [server components](https://beta.nextjs.org/docs/rendering/server-and-client-components)
* [MongoDB](https://www.mongodb.com/)
  * [mongodb](https://www.npmjs.com/package/mongodb)

## Shared

* [react](https://reactjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Zod](https://zod.dev/)

## Frontend
* [react-leaflet](https://react-leaflet.js.org/)
  * [Leaflet](https://leafletjs.com/)
* [react-hook-form](https://react-hook-form.com/)
* [Tailwind](https://tailwindcss.com/)
* [DaisyUI](https://daisyui.com/)

## Developer Tools

* [eslint](https://eslint.org/)
* [prettier](https://prettier.io/)
* [prettier + eslint](https://github.com/prettier/eslint-plugin-prettier)

## Utilities

* [Map Box Studio - Custom Tile Layer](https://www.mapbox.com/mapbox-studio)