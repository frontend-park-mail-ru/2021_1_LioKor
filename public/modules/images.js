const DEFAULT_SIZE = 256;
const DEFAULT_MAX_FILE_SIZE_MB = 10;
const MB = 1024 * 1024;

const createCanvas = (width, height) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.display = 'none';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    return { canvas, ctx };
};

/**
 * Opens user file selection (with filter to images) dialog and returns dataURL of selected image
 *
 * @param {number} size size of resulting image (square size x size)
 * @param {number} maxFileSizeMB maximum allowed file size
 * @returns {string} Data url of image selected by user
 */
export const readImageAsDataURL = async (size = DEFAULT_SIZE, maxFileSizeMB = DEFAULT_MAX_FILE_SIZE_MB) => {
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
        if (file.size / MB > maxFileSizeMB) {
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
                const img = new Image();
                img.addEventListener('load', () => {
                    const { canvas, ctx } = createCanvas(size, size);

                    const imgSize = Math.min(img.width, img.height);
                    ctx.drawImage(img, 0, 0, imgSize, imgSize, 0, 0, canvas.width, canvas.height);

                    const dataURL = canvas.toDataURL();
                    canvas.remove();

                    resolve(dataURL);
                });
                img.src = e.target.result;
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
