// jQuery way of calling API - to learn, only works for search button
// API - 100 requests per month

// $("#form").submit(function (e) {
//     e.preventDefault();

//     var query = $("#search").val()
//     let result = ''
//     var API_KEY = '369c85ecb37501113ce70023b03d2b4a'
//     var url = 'http://api.serpstack.com/search?access_key=' + API_KEY + '&type=web&query=' + query
//     console.log(url)
    
//     $.get(url, function (data) {
//         $("#result").html('');
//         console.log(data);
//         data.organic_results.forEach(res => {
            
//             result = `<h2>${res.title}</h2><br>
//             <a target="_blank" href="${res.url}">${res.url}</a>
//             <p>${res.snippet}</p>`;


//             // This limits the amount of searches to 10 links
//             let counter = 0;
//             counter++;
//             if(counter <= 10){
//             $("#result").append(result);
//             };
//         });

//         // This updates the list randomly, currently doesn't take you to a random website
//         data.organic_results.push(res => {
//             arr = [];
//             arr = arr.push(`${res.url}`)
//             console.log(arr)
//             var randomSite = arr[Math.floor(Math.random() * arr.length)];
    
//             $('#random').click(function() {
//                     window.location.replace(randomSite);
//                     return false;
//                 });
//         })
        
//     });
// });

//Google API custom engine search settings  
const endPnt = "https://www.googleapis.com/customsearch/v1?";
const userKey = 'AIzaSyDvLratthKzg0ybEGCw9Z3cowIzGTu4g_Y';
const engine = '84ec0c213f611877d';

const searchButton = document.getElementById('search_btn');
const randomButton = document.getElementById('random');
const queryText = document.getElementById('search');

// set up listeneres for both buttons
searchButton.addEventListener("click", submitSearch);
randomButton.addEventListener("click", openRandom);

// Search button pressed function
function submitSearch(e) {
    e.preventDefault();
    // search bar value
    const query = queryText.value;
    console.log(query);
    // API with query = search bar value
    let  url = `${endPnt}key=${userKey}&cx=${engine}&q=${query}`;
    console.log(url);
    // request - response
    fetch(url)
        .then(r => r.json())
        // call function to work out the response
        .then((responseJson) => {appendLinks(responseJson)})
        .catch(console.warn)
};
// function works out response -  show the search results 
function appendLinks(links){
    const linksList = document.querySelector("ul")
    // control test 
    console.log("appendLink" + links.items[1].title);
    // clear previous results
    while (linksList.hasChildNodes()) {  
        linksList.removeChild(linksList.firstChild);
      }
    // call function to work out every item in array (response)
    links.items.forEach(appendLink);
    //scroll to tag 'ul' smoothly
    linksList.scrollIntoView({
        behavior: 'smooth'
      });
};

// function works out every item in array (response) - 
// picks out title, url, snippets from item, creates new tags for them and 
// append as a child tags to 'ul'  
function appendLink(linkData){
    // catch 'ul' element, all created elements will be appent to it 
    const linksList = document.querySelector('ul');

    // 1. work out the title
    // create the 'li' element
    const newLi = document.createElement('li');
    // put the title from item into 'li' content
    newLi.textContent = `${linkData.title}`
    // append the 'li' element to 'ul'
    linksList.appendChild(newLi);
    
    // 2. work out the snippet
    // create the 'p' element
    const newP = document.createElement('p');
    // put the snippet from item into 'p' content
    newP.textContent = linkData.snippet;
    // append the anchor element to 'ul'.
    linksList.appendChild(newP);

    // 3. worl out the link
    // create the 'a' element
    const a = document.createElement('a');
    // create the text node for 'a' element
    let link = document.createTextNode(`${linkData.link}`);
    // append the text node to 'a' element
    a.appendChild(link); 
    // put the title fron item to the title of 'a' (show when you hover over the link)
    a.title = linkData.title;  
    // set the href property
    a.href = linkData.link; 
    // append the anchor element to 'ul'.
    linksList.appendChild(a); 
};

function openRandom(e) {
    e.preventDefault();

    const query = queryText.value;
    console.log("openRandom "+query);

    let  url = `${endPnt}key=${userKey}&cx=${engine}&q=${query}`;
    console.log(url);

    fetch(url)
        .then(r => r.json())
        // .then((responseJson) => {console.log(responseJson)})
        .then((responseJson) => {openRandomLink(responseJson)})
        .catch(console.warn)
};

function openRandomLink(links){
    randomNumber = Math.floor(Math.random()*10);
    console.log(randomNumber);
    console.log("randomLink " + links.items[randomNumber].link);
    randomLink = links.items[randomNumber].link;
    window.open(randomLink, '_blank');
    // clear previous results
    const linksList = document.querySelector("ul")
    console.log("appendLink" + links.items[1].title);
    
    while (linksList.hasChildNodes()) {  
        linksList.removeChild(linksList.firstChild);
      }
    
};
