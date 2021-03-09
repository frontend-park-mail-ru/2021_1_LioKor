export const readImageAsDataURL = async (maxFileSizeMB = 10) => {
    const createImageInput = (changeCallback) => {
        let hasInp = true;
        let imageInput = document.getElementById('filesImageInput');
        if (imageInput === null) {
            hasInp = false;
            imageInput = document.createElement('INPUT');
        }
        imageInput.id = 'filesImageInput';
        imageInput.type = 'file';
        imageInput.accept = 'image/png, image/jpeg, image/bmp';
        imageInput.addEventListener('change', changeCallback);

        imageInput.style.display = 'none';
        if (!hasInp) {
            document.body.appendChild(imageInput); // otherwise don't work on ios
        }

        return imageInput;
    };

    const getValidatedImage = (imageInput) => {
        if (imageInput.files.length !== 1) {
            throw new Error('Wrong amount of files!');
        }
        const file = imageInput.files[0];
        const typeSplitted = file.type.split('/');
        if (typeSplitted.length === 0 || typeSplitted[0] !== 'image') {
            throw new Error('File is not an image!');
        }
        if (file.size / 1048576 > maxFileSizeMB) {
            throw new Error('File is bigger than allowed!');
        }

        return file;
    };

    const inputImageToDataURL = (inputImage) => {
        return new Promise((resolve, reject) => {
            let image;
            try {
                image = getValidatedImage(inputImage);
            } catch (err) {
                reject(err);
                return;
            }

            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                resolve(e.target.result);
            });
            reader.addEventListener('error', (e) => {
                reject(new Error('Unable to read file!'));
            });
            reader.readAsDataURL(image);
        });
    };

    return new Promise((resolve, reject) => {
        createImageInput(async ({ target }) => {
            try {
                const dataURL = await inputImageToDataURL(target);
                resolve(dataURL);
            } catch (err) {
                target.remove();
                reject(err);
            }
        }).click();
    });
};
