// // const express = require("express");
// // const app = express();

// // const PORT = process.env.PORT || 3000;

// // app.get("/", (req, res) => {
// //     res.json({
// //         status: "OK",
// //         message: "Hello Kazeem, welcome from Kubernetes"
// //     });
// // });

// // app.listen(PORT, () => {
// //     console.log(`Server running on port ${PORT}`);
// // });  



// const express = require("express");
// const app = express();

// const PORT = process.env.PORT || 3000;
// const APP_ENV = process.env.APP_ENV || "unknown";
// const APP_NAME = process.env.APP_NAME || "not-set";
// const SECRET_KEY = process.env.SECRET_KEY || "missing";

// app.get("/", (req, res) => {
//   res.json({
//     status: "OK",
//     app: APP_NAME,
//     environment: APP_ENV
//   });
// });

// app.get("/secret", (req, res) => {
//   res.json({
//     secretLoaded: SECRET_KEY !== "missing"
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const APP_ENV = process.env.APP_ENV || "unknown";
const APP_NAME = process.env.APP_NAME || "not-set";
const SECRET_KEY = process.env.SECRET_KEY || "missing";

/**
 * Simulate slow startup (for readiness probe demo)
 */
let isReady = false;

setTimeout(() => {
  isReady = true;
  console.log("App is now ready to receive traffic");
}, 5000);

/**
 * Business endpoints
 */
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    app: APP_NAME,
    environment: APP_ENV
  });
});

app.get("/secret", (req, res) => {
  res.json({
    secretLoaded: SECRET_KEY !== "missing"
  });
});

/**
 * Kubernetes health endpoints
 */
app.get("/healthz", (req, res) => {
  res.status(200).send("alive");
});

app.get("/readyz", (req, res) => {
  if (isReady) {
    res.status(200).send("ready");
  } else {
    res.status(503).send("not ready");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
