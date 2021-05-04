export const plugStates = {
    none: 0,
    loading: 1,
    end: 2,
    offline: 3
};

export class Listing {
    block;
    elements = [];
    placeholder;

    scrollHandler;
    clickElementHandler;
    mousemoveElementHandler
    onActiveHandler;

    selectedElems = [];
    activeElem;

    plugTopState = plugStates.none;
    plugsTop = [];
    plugBottomState = plugStates.none;
    plugsBottom = [];

    constructor(block) {
        this.block = block;
    }

    findById(id) {
        return this.elements.find(elem => elem.id === id);
    }

    findBy(fieldName, value) {
        return this.elements.find(elem => elem[fieldName] === value);
    }

    getFirst() {
        return this.elements[0];
    }

    getLast() {
        return this.elements[this.elements.length - 1];
    }

    setScrollHandlers(scrollTopHandler, scrollBottomHandler, scrollTopOffset = 0, scrollBottomOffset = 0) {
        let isMutexBlocked = false;
        this.scrollHandler = (event) => {
            if (isMutexBlocked) {
                return;
            }
            isMutexBlocked = true;
            if (this.block.scrollTop <= scrollTopOffset && scrollTopHandler) {
                scrollTopHandler(event);
            }
            if (this.block.scrollTop + this.block.clientHeight >= this.block.scrollHeight - scrollBottomOffset && scrollBottomHandler) {
                scrollBottomHandler(event);
            }
            isMutexBlocked = false;
        };

        this.block.addEventListener('scroll', this.scrollHandler);
    }

    scroll() {
        this.scrollHandler();
    }

    setClickElementHandler(handler) {
        this.clickElementHandler = handler;

        this.elements.forEach((elem) => {
            elem.addEventListener('click', this.clickElementHandler);
        });
    }

    setMousemoveElementHandler(handler) {
        this.mousemoveElementHandler = handler;

        this.elements.forEach((elem) => {
            elem.addEventListener('mousemove', this.mousemoveElementHandler);
        });
    }

    push(element) {
        this.elements.push(element);
    }

    unshift(element) {
        this.elements.unshift(element);
    }

    delete(id) {
        const index = this.elements.findIndex(elem => elem.id === id);
        this.elements[index].remove();
        this.elements[index].removeEventListener(this.clickElementHandler);
        this.elements.splice(index, 1);
    }

    getElementsHeight() {
        let height = 0;
        this.elements.forEach((element) => { height += element.clientHeight; });
        return height;
    }

    clear() {
        this.elements.forEach((elem) => {
            elem.remove();
            elem.removeEventListener(this.clickElementHandler);
        });
    }

    setPlugTopState(state, HTML) {
        this.plugsTop[state] = HTML;
    }

    setPlugBottomState(state, HTML) {
        this.plugsBottom[state] = HTML;
    }

    redraw() {
        this.undraw();
        this.draw();
    }

    undraw() {
        this.block.innerHTML = '';
    }

    draw() {
        if (this.plugTopState !== plugStates.none) { // top plug
            this.block.appendChild(this.plugsTop[this.plugTopState]);
        }

        if (this.elements.length === 0 && this.placeholder) { // body
            this.block.appendChild(this.placeholder);
        } else {
            this.elements.forEach((elem) => {
                this.block.appendChild(elem);
            });
        }

        if (this.plugBottomState !== plugStates.none) { // bottom plug
            this.block.appendChild(this.plugsBottom[this.plugBottomState]);
        }
    }

    clearSelected() {
        this.selectedElems.forEach((elem) => { elem.classList.remove('selected'); });
        this.selectedElems = [];
    }

    removeSelected(id) {
        this.findById(id).classList.remove('selected');
        this.selectedElems.splice(this.selectedElems.findIndex(item => item.id === id), 1); // remove from selectedElems
    }

    addSelected(id) {
        const elem = this.findById(id);
        this.selectedElems.push(elem);
        elem.classList.add('selected');
    }

    unsetActive() {
        if (this.activeElem) {
            this.activeElem.classList.remove('active');
        }
        this.activeElem = null;
    }

    setActive(id) {
        if (this.activeElem) {
            if (this.activeElem.id === id) {
                return;
            }

            if (this.activeElem) {
                this.activeElem.classList.remove('active');
            }
        }
        const previousActive = this.activeElem;
        this.activeElem = this.findById(id);
        this.activeElem.classList.add('active');

        if (this.onActiveHandler) {
            this.onActiveHandler(this.activeElem, previousActive);
        }
    }

    setOnActiveHandler(handler) {
        this.onActiveHandler = handler;
    }

    scrollToTop() {
        this.block.scrollTop = 0;
    }

    scrollToBottom() {
        this.block.scrollTop = this.block.scrollHeight;
    }

    isEmpty() {
        return (this.elements.length === 0);
    }
}
