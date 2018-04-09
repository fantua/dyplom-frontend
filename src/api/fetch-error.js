class FetchError {

    constructor(status, json = null, response = null) {
        this.status = status;
        this.json = json;
        this.responce = response;
    }

}

export default FetchError;