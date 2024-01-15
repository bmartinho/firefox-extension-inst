env = env || { configs: { url : '', apikey : ''}};

const config = {
    subtree: true,
    attributeOldValue: true
  };

  let done = false;

  async function postJSON(data) {
    try {

      const response = await fetch(env.configs.url, {
        method: "PUT", // or 'PUT'
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

  async function open_articles() {
    console.log('opening');
    const result = await postJSON({ content : 'Hello from Extension', producer : 'me', createdon : new Date(), });
    /*document.querySelectorAll('._ae5q._akdo').forEach(function(x) { if (x.querySelector('div[role=button]')) {
        x.querySelector('div[role=button]').dispatchEvent(new Event('click', { bubbles: true}))
    }});*/
  }

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

const observerTarget = document.querySelector("body");

const observer = new MutationObserver(callback);
observer.observe(observerTarget, config);