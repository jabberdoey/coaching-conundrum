## Prerequisites

You will need a local [PostgreSQL](https://www.postgresql.org/) instance installed and running on your machine. Once installed, create a database then modify the `.env` file to ensure that the `DATABASE_URL` maps to your `USER`, `PASSWORD`, and `DATABASE_NAME` accordingly.

## Getting Started

**Step 1:**

Run the schema generation script to allow prisma to build the database schema and perform mapping to your database:

```bash
npm run schema:generate
```

**Step 2:**

Generate test data by populating your database with dummy data found in `/seed/data.json` file:

```bash
npm run seed:restart
```

**Step 3:**

You should be all set! Fire up the server:

```bash
npm run dev
```

## To do

These are the list of deliverables that were not satisfied due to time constraints and would have been implemented given more time

- Implement the calling feature to establish interaction between the coach and the student
- Capture the feedback information which consists of `satisfaction` rating and `notes` message from the call

## Nice to have

Features that could greatly improve the user's experience

- Add *video* calling feature by utilizing web api such as [WebRTC API](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API) or [Media Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API) to allow dynamic interaction between the coach and the student