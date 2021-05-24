/**
 * @param elem
 * @param defaultAvatar
 */
export default function convertAvatarUrlToDefault(elem, defaultAvatar) {
    if (elem.avatarUrl) {
        return;
    }
    const splitted = elem.username.split('@');
    if (splitted.length < 2) {
        return;
    }

    const tail = splitted[1];
    switch (tail) { // get address after '@'
    case 'mail.ru':
        elem.avatarUrl = '/images/mail.png';
        break;
    case 'gmail.com':
        elem.avatarUrl = '/images/gmail.png';
        break;
    case 'yandex.ru':
    case 'ya.ru':
        elem.avatarUrl = '/images/yandex.png';
        break;
    default:
        elem.avatarUrl = defaultAvatar;
    }
}
