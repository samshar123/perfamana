module.exports = {
  apps: [
    {
      name: "perfamana",
      script: "server.js",
      env: {
        PORT: 3010,
        NODE_ENV: "production",
      },
      instances: 1,
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "500M",
    },
  ],
};
