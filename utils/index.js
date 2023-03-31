export const checkImageURL = (url) => {
    let isTrue = false; 
    if (!url) isTrue = false; 
    else {
        const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');
        isTrue =  pattern.test(url);
    }

    // console.log(`CheckImageURL -> ${isTrue} `);
    return isTrue; 
};