let commentArray = [];
let commentsArrayOfArrays = [];

function getComments(element, commentIdArray){
    commentArray = [];
    for(let comment of commentIdArray){
        fetch(`https://hacker-news.firebaseio.com/v0/item/${comment}.json?print=pretty`)
            .then((raw)=> raw.json())
            .then((commentObj)=>{
                commentArray.push(commentObj)
                if(commentArray.length === commentIdArray.length){
                    commentsArrayOfArrays = [];
                    let currentCommentSet = [];
                    for(let i = 0; i < commentArray.length; i++){
                        if(i % 5 || i === 0){
                            currentCommentSet.push(commentArray[i]);
                        }else{
                            commentsArrayOfArrays.push(currentCommentSet);
                            currentCommentSet = [];
                            currentCommentSet.push(commentArray[i]);
                        }
                    }
                    if(currentCommentSet.length){
                        commentsArrayOfArrays.push(currentCommentSet);
                    }
                    postComments(element, 0);
                }
            })
    }
}

function postComments(element, setNumber){
    const newElement = document.createElement("div");
    newElement.classList.add("commentContainer");
    let commentsHTML = "";
    for(let i = 0; i < commentsArrayOfArrays[setNumber].length; i++){
        commentsHTML += `<div class="comment">
                            <div class="postedBy">${commentsArrayOfArrays[setNumber][i].by}</div>
                            <div class="commentText">${commentsArrayOfArrays[setNumber][i].text}</div>
                        </div>`
    }
    commentsHTML += `<div class="commentArrows"><span class="back">back</span><span class="forward">forward</span></div>`
    newElement.innerHTML = commentsHTML;
    element.appendChild(newElement);
    element.querySelector(".back").addEventListener('click', () =>{
        if (setNumber){
            element.removeChild(newElement);
            postComments(element, setNumber - 1);
        }
    })
    element.querySelector(".forward").addEventListener('click', () =>{
        if (commentsArrayOfArrays[setNumber + 1]){
            element.removeChild(newElement);
            postComments(element, setNumber + 1);
        }
    })
}

//take comment Array, separate out first five in separate Array. 
//post first five along with arrows forward/back