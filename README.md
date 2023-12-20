# VibeCheck

## Introduction

VibeCheck is a secure Next.js server designed to interact with the Spotify API. It enables real-time tracking of music being played on a specific Spotify account. This can be integrated with Twitch/Discord bots for enhanced user engagement.

## Prerequisites

- Node.js
- Spotify Developer Account
- API credentials from Spotify

## Installation

1. Clone the repository: `git clone https://github.com/AhmedAlbarghouti/vibecheck.git`
2. Navigate to the project directory: `cd vibecheck`
3. Install dependencies: `npm install`

## Configuration

- Set up your Spotify Developer account and create an application.
- Obtain your Client ID and Client Secret.
- Create a `.env` file in the project root and add your Spotify API credentials:

SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token

(Optional) SECRET_KEY=api_secret_key
If you need to secure it to a specefic client.

## Running the Server

- Start the server with: `npm run start`
- The server will be running at `http://localhost:3000`.

## Usage

- Make API calls to the server endpoint to retrieve the currently playing song on the designated Spotify account.

## Contributing

Contributions to improve VibeCheck are welcome. Please follow the standard GitHub pull request process to propose changes.

## License

[MIT](https://opensource.org/licenses/MIT)
