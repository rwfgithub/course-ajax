/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;



    /* Replace XHR object with AJAX call below        
    const unsplashRequest = new XMLHttpRequest(); 
    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    unsplashRequest.onload = addImage;
    unsplashRequest.setRequestHeader('Authorization', 'Client-ID xxxxxx');
    unsplashRequest.send()
    */

    $.ajax({
        url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
        headers:{
            Authorization:'Client-ID xxxxxx'
        }
    }).done(addImage)
    .fail(function (err) {
        requestError(err, 'image');
    });


    function addImage(images){
        let htmlContent = '';
        const firstImage = images.results[0];

        if (images && images.results && images.results[0]) {
            htmlContent = `<figure>
                <img src="${firstImage.urls.regular}" alt"${searchedForText}">
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`;

        } else {
            htmlContent = '<div class="error-no-image">No images available</div>'
        }       

        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);            
    }
   



    /* Replace XHR object with AJAX call below
    const articleRequest = new XMLHttpRequest();
    articleRequest.onload = addArticles;
    articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=xxxxxx`);
    articleRequest.send();
    */

    $.ajax({
        url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=xxxxxx`
    }).done(addArticles)
    .fail(function (err) {
        requestError(err, 'articles');
    });


    function addArticles (data) {     
       let htmlContent = '';      

       if (data.response && data.response.docs && data.response.docs.length > 0) {
           htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article"> 
                <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                <p>${article.snippet}</p>
                </li>`
       ).join('') + '</ul>'; 
       } else {
           htmlContent = '<div class="error-no-articles">No articles available</div>'
       }

       responseContainer.insertAdjacentHTML('beforeend', htmlContent);   
    }


    function requestError(e, part) {
        console.log(e);
    }

    });   
})();
