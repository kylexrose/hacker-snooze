const main = document.querySelector("#mainContent")
const apiTop500 = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";

fetch(apiTop500)
    .then((res) => res.json())
    .then((data) => {
        data = data.slice(0, 99);
        console.log(data)
        for(let id of data){
            fetchStory(id);
        }
    })

function fetchStory(storyID){
    const storyAPI = `https://hacker-news.firebaseio.com/v0/item/${storyID}.json?print=pretty`
    fetch (storyAPI)
        .then((result)=> result.json())
        .then((storyObj)=>{
            postStory(storyObj);
        })
}

function postStory(story){
    
    let html = `<div class="storyContainer">
                    <h2 class="title"><a href=${story.url}>${story.title}</a></h2>
                    <div class="subHeading">
                        ${story.score} points by ${story.by} 3 hours ago | hide | ${story.kids.length} comments
                    </div>
                </div>`

    main.innerHTML += html;
}