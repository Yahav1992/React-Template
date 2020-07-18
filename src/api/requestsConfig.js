const config = {
    hosts: {
        springRestApi: "http://localhost:8080/api",
    },
    defaultTimeout: 60000 * 5,
    HTTP_METHODS: {
        GET: "get",
        POST: "post",
        PUT: "put",
        DELETE: "delete"
    }
};

export default config;