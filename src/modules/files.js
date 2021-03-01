export const readImageAsDataURL = async (maxFileSizeMB = 10) => {
    const createImageInput = (changeCallback) => {
        const imageInput = document.createElement('INPUT')
        imageInput.type = 'file'
        imageInput.accept = 'image/png, image/jpeg, image/bmp'
        imageInput.style = 'display: none'
        imageInput.addEventListener('change', changeCallback)
        return imageInput
    }

    const getValidatedImage = (imageInput) => {
        if (imageInput.files.length !== 1) {
            throw new Error('Wrong amount of files!')
        }
        const file = imageInput.files[0]
        const typeSplitted = file.type.split('/')
        if (typeSplitted.length === 0 || typeSplitted[0] !== 'image') {
            throw new Error('File is not an image!')
        }
        if (file.size / 1048576 > maxFileSizeMB) {
            throw new Error('File is bigger than allowed!')
        }

        return file
    }

    return new Promise((resolve, reject) => {
        createImageInput((changeEvent) => {
            let image
            try {
                image = getValidatedImage(changeEvent.target)
            } catch (err) {
                reject(err)
                return
            }

            const reader = new FileReader()
            reader.addEventListener('load', (e) => {
                resolve(e.target.result)
            })
            reader.addEventListener('error', (e) => {
                reject(new Error('Unable to read file!'))
            })
            reader.readAsDataURL(image)
        }).click()
    })
}
