module.exports = {
    apps: [
        {
            name: "fll-web",
            script: "./node_modules/next/dist/bin/next", // changed
            exec_mode: "cluster",
            instances: "2",
            args: "start",
            env: {
                NODE_ENV: "production",
                PORT: 5000,
            },
        },
    ],
};
