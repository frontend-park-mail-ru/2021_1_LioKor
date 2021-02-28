export async function readImageAsDataURL(maxFileSizeMB = 10) {
    return new Promise((resolve, reject) => {
        let imageInput = document.createElement('INPUT');
        imageInput.type = 'file';
        imageInput.accept = 'image/png, image/jpeg, image/bmp';
        imageInput.style = 'display: none';

        imageInput.addEventListener('change', () => {
            if (imageInput.files.length == 1) {
                let file = imageInput.files[0];
                let typeSplitted = file.type.split('/');
                if (typeSplitted.length == 0 || typeSplitted[0] != 'image') {
                    reject(new Error('File is not an image!'));
                } else if (file.size / 1048576 > maxFileSizeMB) {
                    reject(new Error('File is bigger than allowed!'));
                } else {
                    const reader = new FileReader();
                    reader.addEventListener('load', (e) => {
                        resolve(e.target.result);
                    });
                    reader.addEventListener('error', (e) => {
                        reject(new Error('Unable to read file!'));
                    });
                    reader.readAsDataURL(file);
                }
            } else {
                reject(new Error('Wrong amount of files!'));
            }
        });
        imageInput.click();
    });
}
