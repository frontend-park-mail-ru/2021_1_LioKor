const moveOffset = 5;

/**
 * @param elem
 * @param enterDroppableHandler
 * @param leaveDroppableHandler
 * @param mouseUpHandler
 */
export default function setDraggable(elem, enterDroppableHandler, leaveDroppableHandler, mouseUpHandler) {
    elem.onmousedown = (event) => {
        let currentDroppable;
        const shiftX = event.clientX - elem.getBoundingClientRect().left;
        const shiftY = event.clientY - elem.getBoundingClientRect().top;
        const initialX = event.clientX;
        const initialY = event.clientY;
        let canMove = false;

        const onMouseMove = (event) => {
            if (-moveOffset > event.pageX - initialX || event.pageX - initialX > moveOffset || -moveOffset > event.pageY - initialY || event.pageY - initialY > moveOffset) {
                if (!canMove) {
                    canMove = true;
                    // Подготавливаем элемент, который будем таскать
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
            }
            if (!canMove) {
                return;
            }

            // сдвигаем элемент
            elem.style.left = event.pageX - shiftX + 'px';
            elem.style.top = event.pageY - shiftY + 'px';

            // получаем элемент под ним
            elem.style.display = 'none';
            const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            elem.style.display = 'block';

            if (!elemBelow) return;

            const droppableBelow = elemBelow.closest('.droppable');

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

        document.addEventListener('mousemove', onMouseMove);

        elem.onmouseup = (event) => {
            document.removeEventListener('mousemove', onMouseMove);
            elem.onmouseup = null;
            if (!canMove) {
                elem.dispatchEvent(new Event('click'));
                return;
            }

            elem.removeAttribute('style');
            if (currentDroppable) {
                leaveDroppableHandler(currentDroppable);
            }

            if (mouseUpHandler) {
                mouseUpHandler(elem, currentDroppable, isOnDroppable(event.clientX, event.clientY));
            }
        };
    };

    elem.ondragstart = function () {
        return false;
    };
}

/**
 * @param x
 * @param y
 */
function isOnDroppable(x, y) {
    const closestDraggable = document.elementFromPoint(x, y).closest('.droppable');
    if (!closestDraggable) {
        return false;
    }
    return true;
}
