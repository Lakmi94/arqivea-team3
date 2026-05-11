The web app is live at [https://arqivea-team3.vercel.app/] (https://arqivea-team3.vercel.app/) and the source code can be found at the following GitHub repository: [https://github.com/Lakmi94/arqivea-team3]
(https://github.com/Lakmi94/arqivea-team3). 


**⚠️ IMPORTANT:** 
The folder is uploaded without the node modules folder and it is crucial to run 'npm install' to install all the dependencies. 

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

```text
arqivea/
├── app/
│   ├── components/       # Reusable UI components (ArtworkCard, ArtworkDialog, Filters, Header)
│   ├── context/          # React Context providers (FilterContext, RoutePlannerContext)
│   ├── discovery/        # Discovery page component
│   ├── layout.tsx        # Next.js root layout
│   ├── page.tsx          # Main entry point / Discovery page
│   ├── provider.tsx      # Global state and theme providers
│   └── filters.json      # Filter options data
├── public/
│   ├── artworks.json     # Mock database of artworks
│   └── images/           # Artwork image assets
├── README.md
└── package.json
```

# Arqivea

Arqivea is a hyper-search and academic gallery application designed for exploring artworks, planning museum routes, and viewing historical footprints.

## Getting Started

If you have received this project as a compressed folder (ZIP file) without the `node_modules`, follow the instructions below to install the dependencies and run the application locally on your machine.

### Prerequisites

Make sure you have Node.js installed on your computer (v18.17.0 or later is recommended). Installing Node.js will automatically install `npm` (Node Package Manager), which is required to download the project's dependencies.

### 1. Extract the Project
Extract the compressed folder to a location on your computer.

### 2. Open the Terminal
Open your terminal (or Command Prompt / PowerShell on Windows) and navigate to the extracted project folder. For example:

```bash
cd path/to/arqivea-team3
```

### 3. Install Dependencies
Since the `node_modules` folder is excluded from the ZIP to save space, you must install the required dependencies before running the app. Run the following command:

```bash
npm install
```
*(If you use `yarn` or `pnpm` instead of `npm`, run `yarn install` or `pnpm install` respectively).*

### 4. Run the Development Server
Once the installation completes, start the local development server by running:

```bash
npm run dev
```

### 5. View the App
Open your web browser and navigate to http://localhost:3000. You should now see the Arqivea application running!
