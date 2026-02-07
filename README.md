# Portfolio Frontend

Frontend application for Vasu Gupta's portfolio website. Built with React, Vite, and modern CSS.

## Architecture

```
client/
├── src/
│   ├── api/
│   │   └── axiosInstance.js    # Centralized HTTP client
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation header
│   │   ├── Footer.jsx          # Footer component
│   │   ├── ProjectCard.jsx     # Project display card
│   │   ├── SkillBadge.jsx      # Skill tag component
│   │   ├── Loading.jsx         # Loading spinner
│   │   └── ErrorMessage.jsx    # Error display
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── About.jsx           # About me page
│   │   ├── Projects.jsx        # Projects listing
│   │   └── Contact.jsx         # Contact form
│   ├── layouts/
│   │   └── MainLayout.jsx      # Main app layout
│   ├── hooks/
│   │   └── useFetch.js         # Custom data fetching hook
│   ├── utils/
│   │   └── constants.js        # App constants
│   ├── assets/                 # Static assets
│   ├── App.jsx                 # Root component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── public/                     # Public assets
├── .env.development            # Dev environment vars
├── .env.production             # Prod environment vars
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
└── package.json
```

## Features

- **Modern UI** — Dark theme with gradient accents and smooth animations
- **Responsive** — Fully responsive design for all screen sizes
- **API Integration** — Fetches projects from backend API with fallback
- **Form Validation** — Client-side validation with server error handling
- **SEO Optimized** — Proper meta tags and semantic HTML

## Local Development

### Prerequisites

- Node.js >= 18
- npm or yarn

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   
   The `.env.development` file is already configured for local development:
   ```
   VITE_API_BASE_URL=http://localhost:3000
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   Opens at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output is in the `dist/` directory.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | http://localhost:3000 |

## Deployment (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variable:
   - `VITE_API_BASE_URL`: Your Render backend URL
4. Deploy

### Vercel Settings

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

## Design System

The application uses CSS custom properties for consistent theming:

- **Colors**: Dark theme with indigo/purple accent gradient
- **Typography**: Inter font family
- **Spacing**: 4px base unit with scale
- **Animation**: Subtle fade and transform effects

## Pages

### Home
- Hero section with animated code block
- Skills grid with category colors
- Call-to-action section

### About
- Philosophy and approach
- Technical focus areas
- Values sidebar

### Projects
- Fetches from API with fallback data
- Project cards with tech stack tags
- Philosophy section

### Contact
- Form with client-side validation
- API submission with error handling
- Contact info sidebar

## Tech Stack

- **Build**: Vite
- **Framework**: React 19
- **Routing**: React Router 7
- **HTTP**: Axios
- **Styling**: Vanilla CSS with custom properties
- **Deployment**: Vercel

## License

MIT
