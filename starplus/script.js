function isHome() {
    return location.pathname == '/home';
}

function handleChangeRoute() {
    if (isHome()) {
        hoistContinueWatching();
    }
}

function updatePushState(){
    var ps = history.pushState; 
    history.pushState = function() {
        ps.apply(history, arguments); // preserve normal functionality
        handleChangeRoute();
    }
};

function hoistContinueWatching() {
    let interval = setInterval(() => {
        let continueWatching = document.querySelectorAll('[data-testid=continue-watching]')[0];
        if (continueWatching != undefined) {
            continueWatching = continueWatching.parentNode.parentNode
            let parent = continueWatching.parentNode;
            let reference = parent.childNodes[1]
            parent.insertBefore(continueWatching, reference)
            clearInterval(interval);
        }
    }, 150)    
}


function initialConfiguration() {
    window.addEventListener('popstate', handleChangeRoute); //back button

    let scriptTag = document.createElement("script");
    scriptTag.innerHTML = `
        ${hoistContinueWatching}
        ${isHome}
        ${updatePushState}
        
        ${handleChangeRoute}
        updatePushState()
        handleChangeRoute()
    `
    document.getElementsByTagName('body')[0].appendChild(scriptTag);
}

initialConfiguration();