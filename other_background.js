env = env || { configs: { url : '', apikey : ''}};

let done = false;

async function sendJSON(data) {
    try {

        const response = await fetch(env.configs.url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "ApiKey" : env.configs.apikey
        },
        body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
            console.error("Error:", error);
    }
}

async function readAndSend() {
    //ToDo: change the query selector because it relies on possible dynamic classes
    let elem = document.querySelectorAll('._ae5q._akdo').forEach(async function(x) {
        const result = await sendJSON({ content : x.innerText, producer : document.querySelector('header h1').innerText, createdon : x.nextElementSibling.querySelector('time').getAttribute('datetime') });
        console.log(result);
    });
}

function open_articles() {
    console.log('opening');
    //Click more button in the first loaded posts
    document.querySelectorAll('._ae5q._akdo').forEach(function(x) { if (x.querySelector('div[role=button]')) {
        x.querySelector('div[role=button]').dispatchEvent(new Event('click', { bubbles: true}))
    }});

    setTimeout(readAndSend, 500);
}

//Waits for the post messages to be open in the feed
function callback(mutationList) {
    mutationList.forEach((mutation) => {
        if (document.querySelector('article')) {
        if (!done) {
            done = true;
            setTimeout(open_articles, 1000);
        }
        observer.disconnect();
        }
    });
}

const config = {
    subtree: true,
    attributeOldValue: true
  };

const observerTarget = document.querySelector("body");

const observer = new MutationObserver(callback);
observer.observe(observerTarget, config);