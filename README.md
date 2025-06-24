# SecureBank AI Assistant

A modern, Perplexity-inspired frontend for a banking chatbot built with Angular 17. This application provides a clean, professional interface for customers to interact with an AI-powered banking assistant.

## Features

- 🤖 **Intelligent Chat Interface** - Clean, modern chat UI inspired by Perplexity
- 🏦 **Banking-Focused** - Specialized for banking queries and transactions
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI/UX** - Professional design with smooth animations
- 🚀 **Fast Performance** - Built with Angular 17 standalone components
- 🔒 **Security First** - Banking-grade security considerations

## Tech Stack

- **Angular 17** - Latest Angular with standalone components
- **TypeScript** - Type-safe development
- **CSS Variables** - Modern styling with custom properties
- **Font Awesome** - Professional icons
- **Inter Font** - Clean, modern typography

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd bank-chatbot-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run serve
   ```

4. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/           # Main header component
│   │   ├── message/          # Individual chat message component
│   │   └── quick-actions/    # Quick action buttons
│   ├── chat/                 # Main chat interface
│   ├── models/              # TypeScript interfaces
│   ├── services/            # Angular services
│   └── app.component.ts     # Root component
├── styles.css               # Global styles
└── index.html              # Main HTML file
```

## Features Overview

### Chat Interface
- Real-time messaging with typing indicators
- Message history with timestamps
- Smooth animations and transitions
- Auto-scroll to latest messages

### Quick Actions
- Pre-defined banking queries
- Visual action cards with icons
- One-click message sending

### Responsive Design
- Mobile-first approach
- Adaptive layout for all screen sizes
- Touch-friendly interactions

### Banking Functionality
- Account balance inquiries
- Money transfer assistance
- Loan and credit information
- Investment guidance
- Card services support
- Customer support routing

## Available Scripts

- `npm run serve` - Start development server with auto-reload
- `npm run build` - Build for production
- `npm run watch` - Build and watch for changes
- `npm run test` - Run unit tests

## Customization

### Styling
The application uses CSS custom properties for easy theming. Main color variables are defined in `src/styles.css`:

```css
:root {
  --primary-blue: #1e40af;
  --secondary-blue: #3b82f6;
  --text-primary: #1f2937;
  /* ... more variables */
}
```

### Banking Responses
Modify the `generateAIResponse()` method in `chat.component.ts` to customize AI responses based on banking keywords.

### Quick Actions
Update the `actions` array in `quick-actions.component.ts` to add or modify quick action buttons.

## Security Considerations

- Client-side validation for all inputs
- Secure message handling
- No sensitive data stored in localStorage
- HTTPS-ready for production deployment

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact our development team or create an issue in the repository. 