# URL Shortener API

A layered-architecture URL shortener — routes → controllers → services → repositories → models — with a custom base62 short-code generator instead of an external ID library.

## Screenshot

<img width="1180" height="760" alt="url-shortener" src="https://github.com/user-attachments/assets/f5987293-9fed-4fe2-b7fd-0772711beac0" />

## Tech Stack

Node.js, Express, Mongoose (MongoDB)

## Features

- Shorten a URL, with automatic reuse if it was already shortened
- Collision-safe random short-code generation
- Click tracking per short URL
- Centralized error-handling middleware

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Visit `http://localhost:4000`.
