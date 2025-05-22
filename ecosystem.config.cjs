module.exports = {
  apps: [
    {
      name: "short-url",
      exec_mode: "cluster",
      port: 9031,
      script: "dist/index.js",
    },
  ],
};
