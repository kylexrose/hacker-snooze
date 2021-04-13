const main = document.querySelector("#mainContent")
const apiTop500 = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";

fetch(apiTop500)
    .then((res) => res.json())
    .then((data) => {
        data = data.slice(0, 100);
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
    let url = (story.url) ? story.url : "#";
    let commentCount = (story.kids) ? `| ${story.kids.length} comments`: "";
    const newElement = document.createElement("div");
    newElement.classList.add("storyContainer");
    newElement.innerHTML = `<h2 class="title"><a href=${url} target="_blank">${story.title}</a></h2>
                            <div class="subHeading">
                                ${story.score} points by ${story.by} | <span class="hide">hide</span> <span class="comments">${commentCount}<span>
                            </div>`
    newElement.querySelector(".subHeading .hide").addEventListener('click', ((e) => hide(newElement)))
    newElement.querySelector(".subHeading .comments").addEventListener('click', ((e) => {
        let currentCommentContainer = document.querySelector(".commentContainer");
        if(newElement.querySelector(".commentContainer")){
            console.log("comments");
            currentCommentContainer.remove();
        }else{
            if(currentCommentContainer){
                console.log(currentCommentContainer)
                currentCommentContainer.remove();
            } 
            getComments(newElement, story.kids)
        }
    }))
    
    main.appendChild(newElement);

}

function hide(element){
    element.style.display = "none";
}