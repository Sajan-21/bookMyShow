//go to adminPage
function adminPage() {
    window.location = `admin.html`;
}

//get selectBox to addMovie form
async function getSelectBox() {

    try {

        let c_response = await fetch('/categories');
        console.log("response : ",c_response);

        let c_parsed_response = await c_response.json();
        console.log("parsed_response : ",c_parsed_response);

        let c_data = c_parsed_response.data;
        console.log("data : ",c_data);

        let cRows = '<option selected="category">category</option>';

        let category = document.getElementById('category');

        for(let i = 0; i < c_data.length; i++){

            cRows = cRows + `
            <option value="${c_data[i].category}">${c_data[i].category}</option>
            `;
        }

        category.innerHTML = cRows;

        //fetch languages

        let l_response = await fetch('/languages');
        console.log("l_response : ",l_response);

        let l_parsed_response = await l_response.json();
        console.log("l_parsed_response : ",l_parsed_response);

        let l_data = l_parsed_response.data;
        console.log("l_data : ",l_data);

        let lRows = '<option selected="language">language</option>';

        let language = document.getElementById('language');

        for(let j = 0; j < l_data.length; j++){

            lRows = lRows + `
            <option value="${l_data[j].language}">${l_data[j].language}</option>
            `;
        }

        language.innerHTML = lRows;
        
    } catch (error) {

        console.log("error : ",error);
        
    }

}

//add data
async function addMovie(event) {

    event.preventDefult();

    try {
        console.log("submitted");

        let title = document.getElementById('title').value;
        let image = document.getElementById('image').value;
        console.log("image : ",image);
        let category = document.getElementById('category').value;
        let language = document.getElementById('language').value;
        let duration = document.getElementById('duration').value;
        let release_date = document.getElementById('release_date').value;
        let description = document.getElementById('description').value;
        let cast = document.getElementById('cast').value;
        let crew = document.getElementById('crew').value;

        let movieData = {
            title,
            image,
            category,
            language,
            duration,
            release_date,
            description,
            cast,
            crew
        }

        let strMovieData = JSON.stringify(movieData);
        console.log("strMovieData : ",strMovieData);

        let response = await fetch('/movie',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : strMovieData
        });
        console.log("response : ",response);

        if(response.statusCode === 200) {
            alert("Movie datas added succesfully");
        } else {
            alert("Movie addition failed");
        }
        
    } catch (error) {

        console.log("error : ",error);
        
    }

}