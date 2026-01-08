# Rick & Morty Pro Analytics Dashboard

Rick and Morty character explorer built with React, TypeScript, and Tailwind CSS, featuring advanced filtering, search capabilities, and favorites management.

🔗 **Live Demo:** [rick-morty-self.vercel.app]

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Features Explained](#key-features-explained)
- [Performance Optimizations](#performance-optimizations)
- [API Reference](#api-reference)

## ✨ Features

- **Smart Search**: Debounced search with 500ms delay to optimize API calls
- **Advanced Filtering**: Multi-filter by Status, Species, and Gender simultaneously
- **URL State Sync**: All filters persist in URL parameters - refresh-safe
- **Pagination**: Clean pagination with windowed navigation
- **Character Details**: Dedicated detail page showing origin, location, and episodes
- **Favorites System**: Persistent favorites using localStorage
- **Loading States**: Skeleton loaders for better UX
- **Error Handling**: Comprehensive error states with user feedback
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript Strict Mode**: Full type safety throughout the application

## 🛠 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety (Strict mode)
- **Vite** - Build tool with SWC
- **Tailwind CSS v4** - Styling
- **React Router DOM** - Client-side routing
- **Rick & Morty API** - Data source

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation
```bash
# Clone the repository
git clone [your-repo-url]
cd rick-morty-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `rick-morty-self.vercel.app`

## 📁 Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── character-card.tsx
│   ├── filter-dashboard.tsx
│   ├── pagination.tsx
│   └── ...
├── pages/              # Route pages
│   ├── HomePage.tsx
│   └── CharacterDetailPage.tsx
├── services/           # API layer
│   └── api.ts
├── types/              # TypeScript interfaces
│   └── character.ts
├── hooks/              # Custom React hooks
│   └── useDebounce.ts
├── utils/              # Utility functions
│   └── favorites.ts
├── App.tsx             # Root component with routing
└── main.tsx           # Application entry point
```

## 🔑 Key Features Explained

### 1. Debounced Search

Implements a custom `useDebounce` hook that delays API calls by 500ms after the user stops typing, reducing unnecessary requests.
```typescript
const debouncedName = useDebounce(name, 500);
```

### 2. URL State Management

All filters are synced with URL parameters using `useSearchParams` from React Router:
```
/?name=Rick&status=Alive&species=Human&page=2
```

This ensures:
- Shareable URLs with active filters
- Browser back/forward navigation works correctly
- Page refresh preserves user state

### 3. Performance Optimizations

- **React.memo**: Applied to `CharacterCard` and `Pagination` components to prevent unnecessary re-renders
- **useCallback**: Stable function references for pagination handler
- **useMemo**: Cached filter parameters object to prevent redundant API calls

### 4. Favorites System

- Stores favorite character data in localStorage
- Persists across browser sessions
- Toggle to view only favorited characters
- Works on both list and detail pages

## ⚡ Performance Optimizations

### Component Memoization
```typescript
const CharacterCard = React.memo(({ id, name, ... }) => { ... });
const Pagination = React.memo(({ totalPages, ... }) => { ... });
```

### Stable Callbacks
```typescript
const handlePaginationButton = useCallback((pageNo) => {
  setSearchParams(prev => {
    const newParams = new URLSearchParams(prev);
    newParams.set("page", pageNo.toString());
    return newParams;
  });
}, [setSearchParams]);
```

### Memoized Values
```typescript
const filterParams = useMemo(() => ({
  currentPage,
  debouncedName,
  status: status === 'all' ? undefined : status,
  // ...
}), [currentPage, debouncedName, status, ...]);
```

## 🌐 API Reference

This project uses the [Rick and Morty API](https://rickandmortyapi.com/documentation):

- **GET /api/character** - List characters with filters
- **GET /api/character/:id** - Get single character details

### Query Parameters

- `name`: Filter by character name
- `status`: Filter by status (Alive, Dead, unknown)
- `species`: Filter by species (Human, Alien, etc.)
- `gender`: Filter by gender (Male, Female, Genderless, unknown)
- `page`: Pagination

## 🎨 UI/UX Considerations

- **Loading States**: Skeleton loaders while fetching data
- **Error States**: User-friendly error messages with icons
- **Empty States**: Clear messaging when no favorites exist
- **Disabled States**: Filter inputs disabled during favorites view
- **Responsive Grid**: Adapts from 1 to 5 columns based on screen size

## 📝 Development Approach

This project follows best practices:

- Clean component architecture with separation of concerns
- Type-safe development with TypeScript strict mode
- Performance optimizations using React memoization patterns
- Descriptive Git commit history following conventional commits
- Production-ready error handling and loading states

## 👨‍💻 Author

**Diwash Kafle** 

## 📄 License

This project was created as part of a technical assessment for LQ Digital.

---