var mysql = require('mysql');
const env = require('../env.js');
const config = require('../dbconfig.js')[env];

/*
async function getMovieList() {

    var Query;
    var pool  = mysql.createPool(config);
    
    return new Promise((resolve, reject) => {

       //Query = `SELECT * FROM movies WHERE warehouse_status = 1 ORDER BY CONVERT( warehouse_name USING tis620 ) ASC `;
         Query = `SELECT * FROM movies`;
 
         pool.query(Query, function (error, results, fields) {
            if (error) throw error;

            if (results.length > 0) {
                pool.end();
                return resolve({
                    statusCode: 200,
                    returnCode: 1,
                    data: results,
                });   
            } else {
                pool.end();
                return resolve({
                    statusCode: 404,
                    returnCode: 11,
                    message: 'No movie found',
                });
            }

        });

    });
    

}
*/
async function getMovieList() {
    var Query;
    var pool = mysql.createPool(config);

    return new Promise((resolve, reject) => {

        //Query = `SELECT * FROM movies WHERE warehouse_status = 1 ORDER BY CONVERT( warehouse_name USING tis620 ) ASC `;
        Query = `SELECT * FROM movies`;

        pool.query(Query, function (error, results, fields) {
            if (error) throw error;

            if (results.length > 0) {
                pool.end();
                return resolve(results);
            } else {
                pool.end();
                return resolve({
                    statusCode: 404,
                    returnCode: 11,
                    message: 'No movie found',
                });
            }

        });

    });
}


async function getMovieSearch(title) {

    var Query;
    var pool = mysql.createPool(config);

    return new Promise((resolve, reject) => {

        Query = `SELECT * FROM movies WHERE title LIKE '%${title}%'`;

        pool.query(Query, function (error, results, fields) {
            if (error) throw error;

            if (results.length > 0) {
                pool.end();
                return resolve({
                    statusCode: 200,
                    returnCode: 1,
                    data: results,
                });
            } else {
                pool.end();
                return resolve({
                    statusCode: 404,
                    returnCode: 11,
                    message: 'No movie found',
                });
            }

        });

    });
}

async function postMovie(p_title, p_genre, p_director, p_release_year) {

    var Query;
    var pool = mysql.createPool(config);

    return new Promise((resolve, reject) => {

        //Query = `SELECT * FROM movies WHERE title LIKE '%${search_text}%'`;

        var post = {
            title: p_title,
            genre: p_genre,
            director: p_director,
            release_year: p_release_year
        };

        console.log('post is: ', post);


        Query = 'INSERT INTO movies SET ?';
        pool.query(Query, post, function (error, results, fields) {
            //pool.query(Query, function (error, results, fields) {
            if (error){
                return reject(error);
            }
            return resolve({
                statusCode: 200,
                returnCode: 1,
                message: 'Movie list was inserted',
            });
        });
    });
}

async function deleteMovie(title) {
    var Query;
    var pool = mysql.createPool(config);

    return new Promise((resolve, reject) => {
        Query = 'DELETE FROM movies WHERE title = ?';

        pool.query(Query, [title], function (error, results, fields) {
            pool.end();
            if (error) {
                return reject(error);
            }
            if (results.affectedRows > 0) {
                return resolve({
                    statusCode: 200,
                    returnCode: 1,
                    message: 'Movie deleted successfully',
                });
            } else {
                return resolve({
                    statusCode: 404,
                    returnCode: 11,
                    message: 'No movie found with the given title',
                });
            }
        });
    });
}

module.exports.MovieRepo = {
    getMovieList: getMovieList,
    getMovieSearch: getMovieSearch,
    postMovie: postMovie,
    deleteMovie: deleteMovie,
};
