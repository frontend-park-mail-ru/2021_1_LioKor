const moveOffset = 10; // pixels (for desktops)
const mobileWaitBeforeDragging = 500; // milliseconds (for mobiles)

let currentMoveEvent;
let lastPageX, lastPageY;
let currentRotation = 0;
let shiftX, shiftY;
/**
 * @param elem
 * @param enterDroppableHandler
 * @param leaveDroppableHandler
 * @param mouseUpHandler
 * @param droppableClass
 */
export default function setDraggable(elem, enterDroppableHandler, leaveDroppableHandler, mouseUpHandler, droppableClass) {
    // --- For desktops
    elem.onmousedown = (event) => {
        if (event.button !== 0) {
            return;
        }
        let currentDroppable;
        shiftX = event.clientX - elem.getBoundingClientRect().left;
        shiftY = event.clientY - elem.getBoundingClientRect().top;
        const initialX = event.clientX;
        const initialY = event.clientY;
        let canMove = false;

        startFakeMoving();
        document.onmousemove = (event) => {
            currentMoveEvent = event;
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

            moveTo(elem, event);
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
            lastPageX = lastPageY = null;
            currentRotation = 0;
            currentMoveEvent = null;
            document.onmousemove = null;
            document.onmouseup = null;
            stopFakeMoving();
            if (!canMove) {
                return;
            }

            elem.removeAttribute('style');
            elem.classList.remove('ondrag');
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
        shiftX = event.clientX - elem.getBoundingClientRect().left;
        shiftY = event.clientY - elem.getBoundingClientRect().top;

        let movedWhileWait = false;
        document.ontouchmove = (event) => {
            movedWhileWait = true;
        };

        setTimeout(() => {
            if (movedWhileWait) {
                document.ontouchmove = null;
                return;
            }
            prepareForDragging(elem, true, event.pageX);
            moveTo(elem, event);

            startFakeMoving();
            document.ontouchmove = (event) => {
                currentMoveEvent = event;
                event.preventDefault(); // отключаем прокрутку блока при перетаскивании
                event = event.changedTouches[0];

                moveTo(elem, event);
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
        }, mobileWaitBeforeDragging);

        document.ontouchend = document.ontouchcancel = (event) => {
            lastPageX = lastPageY = null;
            currentRotation = 0;
            currentMoveEvent = null;
            movedWhileWait = true;
            document.ontouchmove = null;
            document.ontouchend = null;
            document.ontouchcancel = null;
            event = event.changedTouches[0];
            stopFakeMoving();

            elem.removeAttribute('style');
            elem.classList.remove('ondrag');
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
 *
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
 *
 * @param elem
 * @param isMobile
 * @param cursorX
 */
function prepareForDragging(elem, isMobile = false, cursorX = null) {
    // чтоб не распидорасило на полстраницы
    elem.style.width = elem.clientWidth + 'px';
    elem.style.height = elem.clientHeight + 'px';
    // абсолютные координаты + поверх всего + небольшой поворот
    elem.style.position = 'absolute';
    elem.style.zIndex = '10000';
    elem.style.transform = 'rotate(0deg)';
    elem.style.transformOrigin = `${shiftX}px ${shiftY}px`;
    elem.style.cursor = 'grabbing';
    elem.classList.add('ondrag');
    elem.remove();
    document.body.append(elem);

    if (isMobile) {
        elem.style.width = elem.clientWidth / 2 + 'px';
        shiftX -= cursorX - elem.clientWidth / 4;
        elem.style.transformOrigin = `${shiftX}px ${shiftY}px`;
        sideModifier = 1 + Math.abs((0.5 - shiftX / elem.clientWidth * 2) * constSide);
        if (shiftX > elem.clientWidth / 4) {
            sideModifier = 1 / sideModifier;
        }
    }

    sideModifier = 1 + Math.abs((0.5 - shiftX / elem.clientWidth) * constSide);
    if (shiftX > elem.clientWidth / 2) {
        sideModifier = 1 / sideModifier;
    }
    sideModifierVertical = (0.5 - shiftX / elem.clientWidth) * constSideVertical;
}

const constG = 4;
const constAcceleration = 0.3;
const constSide = (1) * 2;
const constSideVertical = (0.4) * 2;
let sideModifier;
let sideModifierVertical;
/**
 * Сдвигает элемент на координаты
 *
 * @param elem
 * @param event
 */
function moveTo(elem, event) {
    if (!lastPageX) { lastPageX = event.pageX; }
    if (!lastPageY) { lastPageY = event.pageY; }

    currentRotation = currentRotation / 180 * Math.PI;
    const accelerationG = -constG * Math.sin(currentRotation);
    const accelerationMove = ((event.pageX - lastPageX > 0) ? sideModifier : 1 / sideModifier) * Math.cos(currentRotation) * (event.pageX - lastPageX) * constAcceleration;
    const accelerationMoveVertical = -sideModifierVertical * Math.cos(currentRotation) * (event.pageY - lastPageY);
    currentRotation = currentRotation / Math.PI * 180;

    currentRotation += accelerationG + accelerationMove + accelerationMoveVertical;

    elem.style.left = event.pageX - shiftX + 'px';
    elem.style.top = event.pageY - shiftY + 'px';
    elem.style.transform = `rotate(${currentRotation}deg)`;

    lastPageX = event.pageX;
    lastPageY = event.pageY;
}

/**
 * Выдаёт элемент под текущим пложением мышки
 *
 * @param elem
 * @param event
 */
function getUnderElem(elem, event) {
    elem.style.display = 'none';
    const elemBelow = document.elementFromPoint(event.pageX, event.pageY);
    elem.style.display = 'block';
    return elemBelow;
}

/**
 *
 */
function fakeMove() {
    if (!currentMoveEvent) {
        return;
    }
    document.dispatchEvent(currentMoveEvent);
}
/**
 *
 */
function startFakeMoving() {
    setInterval(fakeMove, 25);
}
/**
 *
 */
function stopFakeMoving() {
    clearInterval(fakeMove);
}
