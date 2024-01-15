const config = {
    subtree: true,
    attributeOldValue: true
  };

  let done = false;

  function open_articles() {
    console.log('opening');
    document.querySelectorAll('._ae5q._akdo').forEach(function(x) { if (x.querySelector('div[role=button]')) {
        x.querySelector('div[role=button]').dispatchEvent(new Event('click', { bubbles: true}))
    }});
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