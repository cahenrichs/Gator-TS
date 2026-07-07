# TS Gator

TS Gator is a simple TypeScript RSS feed aggregator, also known as Gator.

This project was created while following along with the RSS aggregator course on [Boot.dev](https://www.boot.dev/).

## Description

TS Gator is a command-line application that lets you collect and manage RSS feeds. It stores feed data in a PostgreSQL database and keeps track of the current user through a local configuration file.

## Prerequisites

Before running this project, make sure you have:

* Node.js installed
* npm installed
* PostgreSQL installed and running

## Configuration

To configure this program, create a `.gatorconfig.json` file in your home directory.

### Example config

```json
{
  "db_url": "postgres://example",
  "current_user_name": "username_goes_here"
}
```

Replace the `db_url` value with your PostgreSQL connection string.

For example:

```json
{
  "db_url": "postgres://postgres:postgres@localhost:5432/gator",
  "current_user_name": "clint"
}
```

## Installation

Clone the repository:

```bash
git clone https://github.com/cahenrichs/Gator-TS.git
cd Gator-TS
```

Install dependencies:

```bash
npm install
```

## Database Setup

Run the database migrations:

```bash
npm run migrate
```

## Usage

Run the app with:

```bash
npm start -- <command>
```

Example:

```bash
npm start -- register clint
```

## Common Commands

```bash
npm start -- register <username>
npm start -- login <username>
npm start -- users
npm start -- addfeed <feed_name> <feed_url>
npm start -- feeds
npm start -- follow <feed_url>
npm start -- following
npm start -- unfollow <feed_url>
npm start -- agg <duration>
npm start -- browse
```

## Example Workflow

```bash
npm install
npm run migrate

npm start -- register clint
npm start -- addfeed "Boot.dev Blog" "https://blog.boot.dev/index.xml"
npm start -- agg 30s
npm start -- browse
```

## Notes

This project was built for learning purposes and focuses on practicing TypeScript, PostgreSQL, Drizzle ORM, CLI development, and RSS feed parsing.
