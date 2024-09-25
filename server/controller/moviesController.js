const movies = require('../db/model/movies');
const { success_function, error_function } = require('../utils/responseHandler');

exports.addMovie = async function(req, res) {

    try {

        let body = req.body;
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

        let movieDatas = await movies.find();

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
        let movieData = await movies.findOne({_id : id});

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
        await movies.updateOne({_id : id},{$set : body});

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