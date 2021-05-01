export class Listing {
    block = undefined;
    elements = [];

    constructor(block) {
        this.block = block;
    }

    setScrollHandlers(scrollTopHandler, scrollBottomHandler, scrollTopOffset = 0, scrollBottomOffset = 0) {
        this.block.addEventListener('scroll', (event) => {
            if (this.block.scrollTop < scrollTopOffset) {
                scrollTopHandler();
            }
            if (this.block.scrollTop + this.block.clientHeight < this.block.scrollHeight - scrollTopOffset) {
                scrollBottomHandler();
            }
        });
    }

    setClickElementHandler(handler) {
        this.block.addEventListener('click', (event) => {
            handler(event.currentTarget.id);
        });
    }

    add(element) {
        this.elements.push({ elem: element, id: this.elements.length });
    }

    delete(id) {
        const index = this.elements.findIndex(elem => elem.id === id);
        this.elements[index].elem.remove();
        this.elements.splice(index, 1);
    }

    getElementsHeight() {
        let height = 0;
        this.elements.forEach((element) => { height += element.elem.clientHeight; });
        return height;
    }

    clear() {
        this.elements.forEach((elem) => { elem.elem.remove(); });
    }

    redraw() {
        this.elements.forEach((elem) => {
            console.log(elem);
        });
    }
}
