const moveOffset = 5; // pixels (for desktops)
const mobileWaitBeforeDragging = 500; // milliseconds (for mobiles)

/**
 * @param elem
 * @param enterDroppableHandler
 * @param leaveDroppableHandler
 * @param mouseUpHandler
 */
export default function setDraggable(elem, enterDroppableHandler, leaveDroppableHandler, mouseUpHandler, droppableClass) {
    // --- For desktops
    elem.onmousedown = (event) => {
        let currentDroppable;
        const shiftX = event.clientX - elem.getBoundingClientRect().left;
        const shiftY = event.clientY - elem.getBoundingClientRect().top;
        const initialX = event.clientX;
        const initialY = event.clientY;
        let canMove = false;

        document.onmousemove = (event) => {
            event.preventDefault(); // отключаем выделение текста при перетаскивании
            if (-moveOffset > event.pageX - initialX || event.pageX - initialX > moveOffset || -moveOffset > event.pageY - initialY || event.pageY - initialY > moveOffset) {
                if (!canMove) {
                    canMove = true;
                    prepareForDragging(elem);
                }
            }
            if (!canMove) {
                return;
            }

            moveTo(elem, event, shiftX, shiftY);
            const elemBelow = getUnderElem(elem, event);
            if (!elemBelow) {
                return;
            }

            const droppableBelow = elemBelow.closest('.' + droppableClass);

            if (currentDroppable !== droppableBelow) {
                if (currentDroppable) { // null если мы были не над droppable до этого события
                    // (например, над пустым пространством)
                    leaveDroppableHandler(currentDroppable);
                }
                currentDroppable = droppableBelow;
                if (currentDroppable) { // null если мы не над droppable сейчас, во время этого события
                    // (например, только что покинули droppable)
                    enterDroppableHandler(currentDroppable);
                }
            }
        };

        document.onmouseup = (event) => {
            document.onmousemove = null;
            document.onmouseup = null;
            if (!canMove) {
                return;
            }

            elem.removeAttribute('style');
            if (currentDroppable) {
                leaveDroppableHandler(currentDroppable);
            }

            if (mouseUpHandler) {
                mouseUpHandler(elem, currentDroppable, isOnDroppable(event.clientX, event.clientY, droppableClass));
            }
        };
    };

    // --- For mobiles
    elem.ontouchstart = (event) => {
        let currentDroppable;
        event = event.changedTouches[0];
        const shiftX = event.clientX - elem.getBoundingClientRect().left;
        const shiftY = event.clientY - elem.getBoundingClientRect().top;

        let movedWhileWait = false;
        document.ontouchmove = (event) => {
            movedWhileWait = true;
        }

        setTimeout(() => {
            if (movedWhileWait) {
                document.ontouchmove = null;
                return;
            }
            prepareForDragging(elem);
            moveTo(elem, event, shiftX, shiftY);

            document.ontouchmove = (event) => {
                event.preventDefault(); // отключаем прокрутку блока и выделение текста при перетаскивании
                event = event.changedTouches[0];

                moveTo(elem, event, shiftX, shiftY);
                const elemBelow = getUnderElem(elem, event);
                if (!elemBelow) {
                    return;
                }

                const droppableBelow = elemBelow.closest('.' + droppableClass);

                if (currentDroppable !== droppableBelow) {
                    if (currentDroppable) { // null если мы были не над droppable до этого события
                        // (например, над пустым пространством)
                        leaveDroppableHandler(currentDroppable);
                    }
                    currentDroppable = droppableBelow;
                    if (currentDroppable) { // null если мы не над droppable сейчас, во время этого события
                        // (например, только что покинули droppable)
                        enterDroppableHandler(currentDroppable);
                    }
                }
            }
        }, mobileWaitBeforeDragging);

        document.ontouchend = document.ontouchcancel = (event) => {
            movedWhileWait = true;
            document.ontouchmove = null;
            document.ontouchend = null;
            document.ontouchcancel = null;
            event = event.changedTouches[0];

            elem.removeAttribute('style');
            if (currentDroppable) {
                leaveDroppableHandler(currentDroppable);
            }

            if (mouseUpHandler) {
                mouseUpHandler(elem, currentDroppable, isOnDroppable(event.clientX, event.clientY, droppableClass));
            }
        };
    };

    elem.ondragstart = function () {
        return false;
    };
}

/**
 * Определяет, находится ли курсор над элементом, на который можно перетаскивать
 * @param x
 * @param y
 * @param droppableClass
 */
function isOnDroppable(x, y, droppableClass) {
    const underElem = document.elementFromPoint(x, y);
    if (!underElem) {
        return false;
    }
    const closestDraggable = underElem.closest('.' + droppableClass);
    if (!closestDraggable) {
        return false;
    }
    return true;
}

/**
 * Подготавливает элемент, который будем таскать
 * @param elem
 */
function prepareForDragging(elem) {
    // чтоб не распидорасило на полстраницы
    elem.style.width = elem.clientWidth + 'px';
    elem.style.height = elem.clientHeight + 'px';
    // абсолютные координаты + поверх всего + небольшой поворот
    elem.style.position = 'absolute';
    elem.style.zIndex = '10000';
    elem.style.transform = 'rotate(8deg)';
    elem.remove();
    document.body.append(elem);
}

/**
 * Сдвигает элемент на координаты
 * @param elem
 * @param event
 * @param shiftX
 * @param shiftY
 */
function moveTo(elem, event, shiftX, shiftY) {
    elem.style.left = event.pageX - shiftX + 'px';
    elem.style.top = event.pageY - shiftY + 'px';
}

/**
 * Выдаёт элемент под текущим пложением мышки
 * @param elem
 * @param event
 */
function getUnderElem(elem, event) {
    elem.style.display = 'none';
    const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    elem.style.display = 'block';
    return elemBelow;
}
