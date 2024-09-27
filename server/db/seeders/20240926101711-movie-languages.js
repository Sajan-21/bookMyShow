const movies_languages = require('../../db/model/movies_language');
'use strict';


module.exports = {
  up: (models, mongoose) => {
    
      return models.movies_languages.insertMany([

        {
          _id : "66f53aeddde88d7cd3e43839",
          language : "Malayalam"
        },
        {
          _id : "66f53b09dde88d7cd3e4383a",
          language : "English"
        },
        {
          _id : "66f53b1fdde88d7cd3e4383b",
          language : "Tamil"
        },
        {
          _id : "66f53b37dde88d7cd3e4383c",
          language : "Hindi"
        },
        {
          _id : "66f53b4adde88d7cd3e4383d",
          language : "Telugu"
        },

      ]).then(res => {
      // Prints "1"
      console.log("seeding successfull");
      console.log(res.insertedCount);
    });
    
  },

  down: (models, mongoose) => {
    
      return models.movies_languages.deleteMany({
        _id : {
          $in : [
            "66f53aeddde88d7cd3e43839",
            "66f53b09dde88d7cd3e4383a",
            "66f53b1fdde88d7cd3e4383b",
            "66f53b37dde88d7cd3e4383c",
            "66f53b4adde88d7cd3e4383d"
          ]
        }
      }).then(res => {
      // Prints "1"
      console.log("seeder rollback successfull");
      console.log(res.deletedCount);
      });
    
  }
};
