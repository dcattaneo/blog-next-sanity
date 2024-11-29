# Blog App with Next.js 15, Sanity, and TypeScript

## Project Summary

This is a **Blog App** built with **Next.js 15**, **Sanity CMS**, and **TypeScript**. The app demonstrates a modern and scalable architecture, utilizing powerful features from Next.js for rendering, routing, and performance optimization. It integrates a CMS for dynamic content management and provides a smooth user experience with responsive styling and efficient state management.

### **1. Architecture**

- **Client Components:** Used for interactive and stateful UI parts.
- **Server Components:** Optimize performance by handling server-side rendering (SSR) and reducing JavaScript sent to the client.

### **2. Rendering Strategies**

- **Client-Side Rendering (CSR):** Renders the page entirely in the browser.
- **Server-Side Rendering (SSR):** Pre-renders pages on the server for each request, ensuring up-to-date content.
- **Static Site Generation (SSG):** Generates HTML pages during the build process, which are cached for fast delivery.
- **Incremental Static Regeneration (ISR):** Combines SSG benefits with periodic updates to static pages, allowing for time-based or on-demand revalidation.

### **3. Partial Prerendering (PPR)**

- Combines static and dynamic rendering within a single page.
- Uses static shells with placeholders for dynamic content wrapped in `<Suspense>` tags.
- **Examples:**
  - **Articles:** Static details with dynamic view counters.
  - **User Profile Card:** The user profile card is cached but the content (user articles) is always generated fresh. This ensures that the latest data is desplayed without caching using the PPR approach.

### **4. Routing**

- **App Router:** Handles navigation and enables advanced features like layouts and parallel routes.
- **API Routes:** Created via `route.js` files, enabling serverless functions.

### **5. Performance Optimizations**

- **Automatic Code Splitting:** Loads only the required code for the active page.
- **Font and Image Optimization:** Enhances user experience with faster loads.

### **6. Server-Side Fetching and Strategies**

- **Static generation with revalidation:** Ensures static content is refreshed periodically.
- **Dynamic server-side fetching:** Uses options like `fetch({ next: { revalidate: 3600 } })`.

### **TypeScript**

- Ensures type safety and reduces runtime errors, especially for complex app logic and API integrations.

### **NextAuth**

- Integrated **GitHub** for social authentication, providing secure login functionality.

### **Sanity CMS**

- Used to manage and structure the app’s content dynamically.

### **Styling**

- **Tailwind CSS:** Provides utility-first CSS for quick and responsive styling.
- **Shadcn:** Enhances Tailwind with pre-designed components for consistent design.

### **Validation with Zod**

- **Zod schemas** were used to ensure form input validation and API data consistency.

### **Custom Features**

- **useActionState Hook:** Simplified managing action states across components.
- **Next.js Form Features:** Leveraged built-in features for accessible and efficient form handling.

### How to run the App

`npm i -g vercel`: Install vercel CLI

`vercel link --yes` Link project

`vercel env pull .env` Download development environment vars

`npm install` Install deps

`npm run dev` Run app
