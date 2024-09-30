const dayjs = require('dayjs');
const fs = require('fs');

exports.fileUpload = async function(file,directory) {

    console.log("file : ",file);

    return new Promise((resolve,reject) => {

        try {
            
            let mime_type = file.split(';')[0].split('/')[1];
            console.log("mime_type : ",mime_type);

            if(mime_type === "png" || "jpeg" || "jpg" || "mp4" || "mp3" || "pdf"){

                console.log("allowed file type");

                let fileName = dayjs() + String(Math.floor(Math.random)) + "." + mime_type;
                console.log("fileName : ",fileName);

                let uploadPath = `uploads/${directory}`;
                console.log("uploadPath : ",uploadPath);

                let base64 = file.split(';base64,')[1];
                // console.log("base64 : ",base64);

                fs.mkdir(uploadPath,{recursive : true},(error) => {

                    if(error) {

                        reject(error.message ? error.message : error);

                    } else {

                        let uploadPath = `uploads/${directory}/${fileName}`;
                        console.log("uploadPath : ",uploadPath);

                        fs.writeFile(
                            uploadPath,
                            base64,
                            {encoding : "base64"},
                            function (err) {
                                if(err) {
                                    console.log("err : ",err);
                                    reject(err.message ? err.message : err);
                                } else {
                                    resolve(uploadPath);
                                }
                            }
                        )

                    }

                })

            } else {

                reject("file size upto 100mb");

            }
            
        } catch (error) {

            console.log("error : ",error);
            
        }

    })

}