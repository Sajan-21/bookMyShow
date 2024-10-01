const movies = require('../db/model/movies');
const movies_categories = require('../db/model/movie_categories');
const { success_function, error_function } = require('../utils/responseHandler');
const movies_languages = require('../db/model/movies_language');
const { fileUpload } = require('../utils/fileUpload');
const fileDelete = require('../utils/fileDelete').fileDelete;

exports.addMovie = async function(req, res) {

    try {

        let body = req.body;

        let category = body.category;
        console.log("category : ",category);

        let category_collection = await movies_categories.findOne({category});
        console.log("category_collection : ",category_collection);

        category = category_collection._id;
        console.log("category : ",category);
        body.category = category;

        let language = body.language;
        console.log("language : ",language);

        let language_collection = await movies_languages.findOne({language});
        console.log("language_collection : ",language_collection);

        language = language_collection._id;
        console.log("language : ",language);
        body.language = language;

        if(body.image) {

            let image = body.image;

            let img_path = await fileUpload(image,"movie");
            console.log("img_path : ",img_path);

            body.image = img_path;

        }

        await movies.create(body);

        let response = success_function({
            statusCode : 200,
            message : "movie added successfully"
        });

        res.status(response.statusCode).send(response);

        return ;
        
    } catch (error) {

        console.log("error : ",error);

        let response = error_function({
            statusCode : 400,
            message : "movie addition failed"
        });

        res.status(response.statusCode).send(response);

        return ;
        
    }

}

exports.getAllMovies = async function(req, res) {

    try {

        let movieDatas = await movies.find().populate("category").populate("language");

        let response = success_function({
            statusCode : 200,
            data : movieDatas
        });

        res.status(response.statusCode).send(response);

        return ;
        
    } catch (error) {

        console.log("error : ",error);

        let response = error_function({
            statusCode : 400,
            message : "error while get all movies"
        });

        res.status(response.statusCode).send(response);

        return ;
        
    }

}

exports.getMovie = async function(req, res) {

    try {

        let id = req.params.id;
        let movieData = await movies.findOne({_id : id}).populate("category").populate("language");

        let response = success_function({
            statusCode : 200,
            data : movieData
        });

        res.status(response.statusCode).send(response);

        return ;
        
    } catch (error) {

        console.log("error : ",error);

        let response = error_function({
            statusCode : 400,
            message : "error while get movie"
        });

        res.status(response.statusCode).send(response);

        return ;
        
    }

}

exports.updateMovie = async function(req, res) {

    try {

        let id = req.params.id;
        let body = req.body;

        let category = body.category;
        console.log("category : ",category);

        let category_collection = await movies_categories.findOne({category});
        console.log("category_collection : ",category_collection);

        category = category_collection._id;
        console.log("category : ",category);
        body.category = category;

        let language = body.language;
        console.log("language : ",language);

        let language_collection = await movies_languages.findOne({language});
        console.log("language_collection : ",language_collection);

        language = language_collection._id;
        console.log("language : ",language);
        body.language = language;

        let splittedImage;

        if(body.image) {

            let imagePath = await movies.findOne({_id : id});
            splittedImage = imagePath.image.split('/')[2];

            let img_path = await fileUpload(image,"movie");
            console.log("img_path : ",img_path);

            body.image = img_path;

        }

        await movies.updateOne({_id : id},{$set : body}).populate("category").populate("language");

        if(body.image){
            const imagePath = path.join('./uploads', 'movie', splittedImage);
            fileDelete(imagePath);
        }

        let response = success_function({
            statusCode : 200,
            message : "movie datas updated succesfully"
        });

        res.status(response.statusCode).send(response);

        return ;
        
    } catch (error) {

        console.log("error : ",error);

        let response = error_function({
            statusCode : 400,
            message : "error while get movie"
        });

        res.status(response.statusCode).send(response);

        return ;
        
    }

}

exports.deleteMovie = async function(req, res) {

    try {

        let id = req.params.id;
        await movies.deleteOne({_id : id});

        let response = success_function({
            statusCode : 200,
            message : "movie deleted succesfully"
        });

        res.status(response.statusCode).send(response);

        return ;
        
    } catch (error) {

        console.log("error : ",error);

        let response = error_function({
            statusCode : 400,
            message : "error while deleting movie"
        });

        res.status(response.statusCode).send(response);

        return ;
        
    }

}

exports.categorizedMovies = async function(req, res) {

    let filterArr = [];

    if(req.query.category){

        let category = req.query.category;
        console.log("category : ",category);

        let category_collection = await movies_categories.findOne({category : category});
        let category_id = category_collection._id;

        filterArr.push({category_id});

    }

    if(req.query.language){

        let language = req.query.language;
        console.log("language : ",language);

        let language_collection = await movies_languages.findOne({language : language});
        let language_id = language_collection._id;

        filterArr.push({language_id});

    }

    try {

        let movie_data = await movies.find(filterArr.length > 0 ? {$and : filterArr} : {}).populate("category").populate("language");

        let response = success_function({
            statusCode : 200,
            data : movie_data
        });

        res.status(response.statusCode).send(response);
        return;
        
    } catch (error) {

        console.log("error : ",error);

        let response = error_function({
            statusCode : 400,
            message : "filtering failed"
        });

        res.status(response.statusCode).send(response);
        return;
        
    }


}

exports.getCategories = async function(req, res) {

    try {

        let db_response = await movies_categories.find();
        console.log("db_response : ",db_response);

        let response = success_function({
            statusCode : 200,
            message : "Category fetching successful",
            data : db_response
        });

        res.status(response.statusCode).send(response);
        return ;
        
    } catch (error) {

        console.log("error : ",error);

        let response = error_function({
            statusCode : 400,
            message : "fetching category failed"
        });

        res.status(response.statusCode).send(response);

        return ;
        
    }

}

exports.getLanguages = async function(req, res) {

    try {

        let db_response = await movies_languages.find();
        console.log("db_response : ",db_response);

        let response = success_function({
            statusCode : 200,
            message : "language fetching successful",
            data : db_response
        });

        res.status(response.statusCode).send(response);
        return ;
        
    } catch (error) {

        console.log("error : ",error);

        let response = error_function({
            statusCode : 400,
            message : "fetching language failed"
        });

        res.status(response.statusCode).send(response);

        return ;
        
    }

}