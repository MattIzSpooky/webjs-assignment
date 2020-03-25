export const fileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

// see https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
export const base64ToFile = base64 => {
    let byteString;

    if (base64.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(base64.split(',')[1]);
    } else {
        byteString = unescape(base64.split(',')[1]);
    }

    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];

    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return  new File([new Blob([ia], {type: mimeString})], 'image');
};
