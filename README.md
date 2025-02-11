# 🧭 Personal Compass App

A simple tool to help you maintain direction and focus in your personal development journey. This app provides a structured way to reflect on your priorities, track your progress, and maintain accountability through physical reminders.

## Features

### Priority Cards

- Choose up to 3 priority cards from a deck of 7 predefined options
- Designate one card as your top priority
- Easily modify your selections as your priorities shift

### Virtue Pyramid

- Visual representation of your virtue hierarchy
- Interactive display at the bottom of the app

### Progress Tracking

- Calendar system with adjustable sliders to mark your last check-in
- Physical accountability checkbox for marking when you've written and placed a physical reminder
- Track your journey through time with simple date markers

### Personal Notes

- Space for 1-2 brief notes to yourself
- Character-limited to encourage concise, focused thoughts
- ⚠️ **Important**: Notes are stored locally and are not backed up. Keep them brief and meaningful!

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser

## Data Storage

This app uses localStorage for all data storage, meaning:

- Your data stays in your browser
- No server-side storage or backup
- Data persists between sessions but can be lost if you clear your browser data
- Different browsers/devices will have separate data

## Development Notes

Built with:

- Next.js 14+
- TypeScript
- Tailwind CSS
- ESLint for code quality

Standard Next.js project structure without src directory or path aliases.

## For Students

This app is designed to be simple and focused. Some tips for best use:

- Set aside regular time to check in with your compass
- Actually write down your priorities when prompted
- Place your written reminders where you'll naturally encounter them
- Don't rely solely on the digital interface - the physical component is key to making this work

## Contributing

Feel free to submit issues and enhancement requests!
