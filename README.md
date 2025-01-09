# TWIITTER (Twitter Clone Web App)

A web application that replicates the core functionalities of Twitter, enabling users to post, like, and interact with tweets in real-time.

## Features

- **Real-Time Interactions**: Users can post, like, and engage with tweets seamlessly.
- **Responsive Design**: Built with `Tailwind CSS` to ensure a smooth experience across devices.
- **User Authentication**: NextAuth integration with `Google OAuth` for secure and easy sign-in.
- **Efficient Data Handling**: Utilizes `Next.js App Router` and `Server Actions` for optimized API management and real-time updates.
- **Data Persistence**: User and tweet data are stored in `MongoDB` for reliability and scalability.

## Technologies Used

### Frontend

- **Next.js**: React-based framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for responsive and modern design.

### Backend

- **Next.js App Router**: For structured routing and server-side functionalities.
- **Server Actions**: Provides efficient and seamless data handling.
- **NextAuth**: Handles user authentication with support for Google OAuth.

### Database

- **MongoDB**: NoSQL database to manage user and tweet data efficiently.

## Getting Started

### Prerequisites

- **Node.js**: Install Node.js from [official website](https://nodejs.org/).
- **MongoDB**: Set up a MongoDB database (local or cloud).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/indbhatti/twiitter.git
   cd twiitter
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:

   ```env
   NEXTAUTH_SECRET=<your-nextauth-secret>
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   MONGO_URI=<your-mongodb-connection-string>
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Access the app at `http://localhost:3000`.

## Folder Structure

```
.
├── actions
├── app
│   ├── api
│   └── auth
├── public
├── components
├── lib
├── .env
├── package.json
└── README.md
```

## Contribution Guidelines

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Create a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or suggestions, contact [Inder](mailto:inderprbhatti@gmail.com).
