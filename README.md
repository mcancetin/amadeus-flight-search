# Introduction

This is a straightforward application for searching flights. It has been developed using `React` and `Vite`. Date formatting is handled through the `dayjs` library. The MOCK API integration relies on the `json-server` package, while requests are managed using the `axios` package. Form management is facilitated by the `formik` and `yup` packages.

# Installation

First of all, you need to have Node.js installed on your machine. If you don't have it, you can download it [here](https://nodejs.org/en/).

After that, you can clone this repository or download it as a zip file and extract it.

Create a new file called `.env` in the root folder of the project and add the following line:

```env
VITE_BASE_URL=http://localhost:3000
```

Open the terminal and navigate to the project folder.

For installing the dependencies, run the following command:

```bash
npm install
```

For running the application, you need to start the Mock JSON server. You can do this by running the following command:

```bash
npx json-server src/database/db.json
```

Finally, you can start the application by running the following command:

```bash
npm start
```

