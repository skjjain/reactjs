let loginServer = "http://localhost:4000/";

function IDLoginWidget(loginElementId){
    window.loginElementId = loginElementId;
    this.init = function(){
        fetch(loginServer + "asset-manifest.json")
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " +
              response.status
          );
          return;
        }
        response.json().then(function (data) {
          data.entrypoints.forEach((scr) => {
            if(scr.endsWith('.js')){
              addScript(loginServer + scr);
            }else if(scr.endsWith('.css')){
              addStyle(loginServer + scr);
            }
            
          });
          function addScript(scriptPath) {
            const script = document.createElement("script");
            script.setAttribute("id", "script-id");
            script.src = scriptPath;
            const position = document.querySelector("body");
            position.appendChild(script);
          }
          function addStyle(stylePath) {
            const style = document.createElement("link");
            style.setAttribute("rel", "stylesheet");
            style.href = stylePath;
            const position = document.querySelector("head");
            position.appendChild(style);
          }
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
    }
}