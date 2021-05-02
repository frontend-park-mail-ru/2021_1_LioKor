export const plugStates = {
    none: 0,
    loading: 1,
    end: 2,
    offline: 3
};

export class Listing {
    block;
    elements = [];

    scrollHandler;
    clickElementHandler;

    selectedElem;
    activeElem;

    plugTop = plugStates.none;
    plugBottom = plugStates.none;

    constructor(block) {
        this.block = block;
    }

    findById(id) {
        return this.elements.find(elem => elem.id === id);
    }

    setScrollHandlers(scrollTopHandler, scrollBottomHandler, scrollTopOffset = 0, scrollBottomOffset = 0) {
        this.scrollHandler = (event) => {
            if (this.block.scrollTop < scrollTopOffset) {
                scrollTopHandler();
            }
            if (this.block.scrollTop + this.block.clientHeight < this.block.scrollHeight - scrollTopOffset) {
                scrollBottomHandler();
            }
        };

        this.block.addEventListener('scroll', this.scrollHandler);
    }

    setClickElementHandler(handler) {
        this.clickElementHandler = (event) => {
            handler(event.currentTarget.id);
        };

        this.block.addEventListener('click', this.clickElementHandler);
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

    redraw() {
        this.elements.forEach((elem) => {
            this.block.appendChild(elem);
        });
    }

    setSelected(id) {
        this.selectedElem.classList.remove('selected');
        this.selectedElem = this.findById(id);
        this.selectedElem.classList.add('selected');
    }

    setActive(id) {
        this.activeElem.classList.remove('active');
        this.activeElem = this.findById(id);
        this.activeElem.classList.add('active');
    }
}
