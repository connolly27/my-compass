# 🎨 Bobby's Room

A customizable personal dashboard built with Next.js and Tailwind CSS. This project features a sliding calendar, priority cards, and a notes section - all with a fun, paper-crafty aesthetic!

## 🌟 Features

- **Calendar Slider**: A fun, interactive calendar widget
- **Priority Cards**: Select and organize your top 3 priorities
- **Keep a Note**: A simple note-taking feature with local storage

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:9127](http://localhost:9127) in your browser

## 🙋‍♂ Troubleshooting

### Linting Errors

Before pushing your code to your repository (which will trigger a Vercel deployment), make sure to check for any code style issues:

```bash
npm run lint
```

Common issues and solutions:

- **Missing imports**: Double-check your import statements and make sure all components are properly imported
- **Unused variables**: Remove any variables you're not using
- **Missing dependencies in useEffect**: Make sure you've included all variables used in useEffect in its dependency array
- **Props validation**: Ensure you've properly typed your props with TypeScript

Pro tip: Many IDEs (like VS Code) can show you linting errors in real-time. Look for red squiggly lines under your code!

For more complex issues:

1. Read the error message carefully - ESLint usually tells you exactly what's wrong
2. Check the [ESLint documentation](https://eslint.org/docs/latest/rules/) for specific rule explanations
3. Consider using GitHub Copilot or ChatGPT to help understand and fix linting errors
4. Don't ignore linting errors - they help maintain code quality!

## 📝 Making It Your Own

Feel free to customize this project! Some ideas:

- Change "Bobby's Room" to your own title in `app/layout.tsx`
- Add new sections or widgets
- Modify the existing components
- Create your own theme by changing the colors in `ConstructionPaper.tsx` and `StuccoBackground.tsx`

## 🧩 Project Structure

```
/app
  ├── fonts.ts           # Google Font configurations
  ├── layout.tsx         # Root layout with font settings
  └── page.tsx           # Main page component

/components
  ├── /ui               # shadcn components (button, alert, etc.)
  ├── BobbysRoom.tsx    # Main container component
  ├── CalendarSlider.tsx # Interactive calendar widget
  ├── PriorityCard.tsx  # Individual priority card component
  └── ...               # Other components
```

## 💅 Styling & Components

### shadcn Components

The `/ui` folder contains shadcn components. These were added using:

```bash
npx shadcn@latest add button
npx shadcn@latest add alert
npx shadcn@latest add alert-dialog
```

Note: The latest version uses `shadcn` instead of `shadcn-ui` for installation.

### Priority Cards & Image Loading

In `PriorityCardSection.tsx`, you'll notice this code:

```typescript
const priorityCards = [
  { imagePath: "/images/hobby.png", label: "Hobby" },
  // ... more cards
].map((card, index) => ({
  ...card,
  priority: index < 6,
}));
```

Don't get confused by the `priority` property here! While this component is about setting personal priorities, this particular `priority` property is actually for Next.js image optimization. It tells Next.js to load the first 6 card images immediately (for cards visible "above the fold") and lazy-load the rest. This makes the initial page load faster!

## 🎨 Customization Ideas for Students

1. **Add New Sections**: Create your own widgets or sections
2. **Modify Themes**: Change the construction paper colors or background style
3. **Extend Features**: Add more interactive elements or persistence options
4. **Responsive Design**: Enhance mobile responsiveness
5. **Animations**: Add custom animations for card selections or note updates

## 💾 Local Storage

The app uses localStorage to persist:

- Selected priority cards
- Personal notes
- Calendar slider positions

## 🛠️ Technologies Used

- Next.js 14
- React 19
- Tailwind CSS
- shadcn components
- TypeScript

## 🤝 Contributing

Feel free to fork this project and make it your own! This is a learning tool, so experiment and have fun with it.

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn Documentation](https://ui.shadcn.com/docs)
