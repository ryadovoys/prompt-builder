# Prompt Builder

An interactive application for building AI text and image generation prompts with a modern, user-friendly interface.

## Features

- Build text generation prompts with options for:
  - Purpose (creative, informative, persuasive, conversational)
  - Tone (formal, casual, humorous, serious)
  - Length (short, medium, long, specific word count)
  - Structure (narrative, bullet points, sectioned, dialogue)

- Create image generation prompts with options for:
  - Style (realistic, cartoon, abstract, digital art)
  - Subject (person/character, landscape/scene, object/item, abstract concept)
  - Mood (cheerful, dramatic, peaceful, mysterious)
  - Detail level (minimal, moderate, highly detailed, hyper-realistic)

- Save and manage your recent prompts
- Copy prompts to clipboard with one click
- Responsive interface with collapsible sidebars

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/prompt-builder.git
cd prompt-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your browser at http://localhost:3000.

## Project Structure

```
src/
├── components/      # UI components
├── context/         # React Context API
├── hooks/           # Custom React hooks
├── styles/          # Shared styles
└── utils/           # Utility functions
```

## Built With

- React - JavaScript library for building user interfaces
- React Context API - For state management

## License

This project is licensed under the MIT License - see the LICENSE file for details.