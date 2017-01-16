class FileUploadController {
    constructor() {

    }

    service(req, res) {
        switch (req.method) {
            case "POST": {
                res.send("Success");
                break;
            }
        }
    }

}

module.exports = FileUploadController;