const movies = require('../db/model/movies');
const movies_categories = require('../db/model/movie_categories');
const { success_function, error_function } = require('../utils/responseHandler');
const movies_languages = require('../db/model/movies_language');
const { fileUpload } = require('../utils/fileUpload');

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

        let image = body.image;

        const regexp = /^data/ ; 
        const result = regexp.test(image); // check if str2 starts with 'rat'
        console.log("result : ",result) ; //true

        if(result === true) {

            let img_path = await fileUpload(image,"movie");
            console.log("img_path : ",img_path);

            body.image = img_path;

        }

        await movies.updateOne({_id : id},{$set : body}).populate("category").populate("language");

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

    try {

        let query = req.query;
        console.log("query : ",query);

        if(query.category !== "category" && query.language === "language"){

            try {

                let category = query.category;

                let category_collection = await movies_categories.findOne({category});
                let category_id = category_collection._id;

                let categorized = await movies.find({category : category_id}).populate("category");

                let response = success_function({
                    statusCode : 200,
                    data : categorized
                });

                res.status(response.statusCode).send(response);

                return ;
                
            } catch (error) {

                console.log("error : ",error);
                
            }

        }else if(query.category && query.language){

            try {

                let category = query.category;

                let category_collection = await movies_categories.findOne({category});
                console.log("category_collection : ",category_collection);
                let category_id = category_collection._id;

                let language = query.language;

                // let language_collection = await movies_languages.findOne({language});
                // console.log("language_collection : ",language_collection);
                // let language_id = language_collection._id;

                let categorized = await movies.find({category : category_id}).populate('category').populate('language');
                console.log("categorized : ",categorized);

                let filtered = '';

                for(let i=0; i<categorized.length; i++) {
                    if(categorized[i].language.language === query.language){
                        filtered = filtered + categorized[i];
                    }
                }

                let response = success_function({
                    statusCode : 200,
                    data : filtered
                });

                res.status(response.statusCode).send(response);

                return ;
                
            } catch (error) {

                console.log("error : ",error);
                
            }

        }else if(query.category === "category" && query.language !== "language"){

            try {

                let language = query.language;

                let language_collection = await movies_languages.findOne({language});
                let language_id = language_collection._id;

                let categorized = await movies.find({language : language_id}).populate("language");

                let response = success_function({
                    statusCode : 200,
                    data : categorized
                });

                res.status(response.statusCode).send(response);

                return ;
                
            } catch (error) {

                console.log("error : ",error);
                
            }

        }else {
            console.log("nothing to show");
        }
        
    } catch (error) {

        console.log("error : ",error);

        let response = error_function({
            statusCode : 400,
            message : "getting categorized movies failed"
        });

        res.status(response.statusCode).send(response);

        return ;
        
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