import * as renderer from "./renderer.js";

export default class Router {
    linkedButtons;

    constructor() {
        /*window.onpopstate = ((event) => {
            event.preventDefault();
        });*/

        this.linkButtons();
    }

    linkButtons() {
        this.linkedButtons = document.querySelectorAll("linkButton");
        this.linkedButtons.forEach((button) => {
            //console.log("New link: " + button.innerHTML.toString());
            button.addEventListener("click", (event) => {
                this.linksListener(event);
            });
        })
    }

    relinkButtons() {
        this.linkedButtons.forEach((button) => {
            button.outerHTML = button.outerHTML.toString();
            //console.log("Remove link: " + button.innerHTML);
            button.removeEventListener("click", (event) => {
                this.linksListener(event);
            });
        })
        //document.innerHTML = document.documentElement.innerHTML;
        this.linkButtons();
    }

    linksListener(event) {
        event.preventDefault();
        this.goto(event.currentTarget.getAttribute("href").toString());
    }

    goto(path) {
        history.pushState({}, "", path);
        renderer.render("body", path, this, () => {this.relinkButtons();});
    }
}