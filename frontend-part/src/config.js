function config() {
    if (process.env.NODE_ENV == "production") {
        return {
            baseUrl: "https://language-buddy.herokuapp.com"
        }
    } else {
        return {
            baseUrl: "http://localhost:4000"
        }
    }
}

export default config()