# FinTrack - Finance Dashboard

A modern, responsive financial management dashboard built with React, Redux Toolkit, and Tailwind CSS. FinTrack helps you track transactions, manage budgets, and gain insights into your financial health with beautiful visualizations.

## Features

- **Dashboard Overview**: Get a bird's-eye view of your financial status with key metrics and charts
- **Transaction Management**: Track income and expenses with a comprehensive transaction history
- **Budget Tracking**: Set and monitor budgets across different categories
- **Financial Insights**: Data-driven analytics and visualizations to understand spending patterns
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Role-Based Permissions**: Admin-only data entry with visual feedback for viewers
- **State Management**: Powered by Redux Toolkit for reliable state handling
- **Interactive Charts**: Recharts integration for beautiful data visualizations

## Tech Stack

- **React 19**: Modern UI library with hooks
- **Vite**: Lightning-fast build tool and dev server
- **Redux Toolkit**: Predictable state container
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Composable charting library
- **Lucide React & React Icons**: Icon libraries
- **ESLint**: Code linting and quality

## Project Structure

```
finance-dashboard/
├── public/              # Static assets
├── src/
│   ├── app/            # Redux store configuration
│   ├── components/     # Reusable UI components
│   │   ├── layout/    # Layout components (Sidebar, Header)
│   │   ├── insights/  # Insights-specific components
│   │   ├── transactions/ # Transaction-specific components
│   │   └── ui/        # Generic UI components
│   ├── data/          # Static data (categories)
│   ├── features/      # Redux slices by feature
│   │   ├── budget/
│   │   ├── filters/
│   │   ├── role/
│   │   ├── theme/
│   │   └── transactions/
│   ├── pages/         # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Transactions.jsx
│   │   ├── Budgets.jsx
│   │   ├── Insights.jsx
│   │   └── NotFound.jsx
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Main app component with routing
│   ├── main.jsx       # Entry point
│   ├── index.css      # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd finance-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Build for Production

Create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Features in Detail

### Dashboard
- Summary cards showing total balance, income, expenses
- Charts displaying financial trends
- Recent transactions list
- Quick actions and navigation

### Transactions
- View all transactions with filtering capabilities
- Add, edit, and delete transactions (admin only)
- Categorize transactions
- Sort by date, amount, or category
- Search functionality
- Responsive table design optimized for mobile devices
- Role-based access control with visual feedback

### Budgets
- Set monthly budgets for categories (admin only)
- Track spending against budget limits
- Visual progress indicators
- Budget alerts and notifications
- Disabled "Add Budget" button for viewers with hover tooltips

### Insights
- Comprehensive analytics and reports
- Spending patterns visualization
- Category breakdown with pie/bar charts
- Monthly and yearly comparisons

## State Management

The application uses Redux Toolkit with the following slices:

- `transactions`: Manage transaction data
- `budget`: Budget categories and limits
- `filters`: UI filtering state
- `theme`: Application theme (light/dark)
- `role`: User role/permissions

## Role-Based Access

The application supports role-based permissions:

- **Admin**: Full access to add transactions and budgets, delete data
- **Viewer**: Read-only access; "Add" buttons are disabled with tooltip "Only admin can add data"

Permissions are managed centrally via Redux state.

## Theming

The app supports both light and dark themes. Theme preference is saved to `localStorage` and persists across sessions.

Toggle theme via the UI or programmatically:
```javascript
// Dark mode
document.documentElement.classList.add('dark')

// Light mode
document.documentElement.classList.remove('dark')
```

## Styling

This project uses Tailwind CSS for styling. Custom configuration is available in `tailwind.config.js`. The app uses a dark mode strategy based on the `class` selector.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## Code Quality

Please ensure your code passes the linter before committing:

```bash
npm run lint
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

[Add your license information here]

## Acknowledgments

- Built with React and Vite
- Icons from [Lucide](https://lucide.dev) and [React Icons](https://react-icons.github.io/react-icons/)
- Charts powered by [Recharts](https://recharts.org)