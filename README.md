# Cartões App

A modern React application for browsing and filtering credit card information. This application allows users to explore various credit cards, filter them by bank, type, and search by name, and view detailed information about each card.

![Cartões App Screenshot](screenshot.png)

## Features

- **Card Browsing**: View a collection of credit cards with detailed information
- **Filtering**: Filter cards by bank and card type
- **Search**: Search for cards by name
- **Responsive Design**: Works on desktop and mobile devices
- **Visual Hierarchy**: Cards are styled based on their tier (Black, Platinum+, Platinum, Gold, Standard)
- **Modern UI**: Built with Material-UI for a clean, professional look

## Technologies Used

- **React 19**: For building the user interface
- **TypeScript**: For type safety and better developer experience
- **Material-UI**: For UI components and styling
- **Vite**: For fast development and building
- **ESLint**: For code quality and consistency

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Dudu197/cartoes.git
   cd cartoes/cartoes-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Project Structure

```
cartoes-app/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # React components
│   │   └── CreditCard.tsx  # Credit card component
│   ├── styles/          # CSS styles
│   │   └── CreditCard.css  # Card styling
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── cartoes.json         # Credit card data
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Card Types and Styling

The application features different card types with distinct visual styles:

- **Black**: Premium tier cards with a black gradient background
- **Platinum+**: Upper tier cards with a dark blue gradient
- **Platinum**: Mid-high tier cards with a silver gradient
- **Gold**: Mid tier cards with a gold gradient
- **Standard**: Default cards with a blue gradient

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
