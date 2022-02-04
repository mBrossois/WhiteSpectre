export const calculateImageSize = (image: HTMLElement, fullscreen: boolean): {width: number, height: number } => {
    const sizes: {height: number, width: number } = {height: 0, width: 0 };
    if(fullscreen) {
        sizes.width = screen.width;
        sizes.height = (screen.width / image.offsetWidth) * image.offsetHeight;
        if(sizes.height < screen.height) {
            sizes.height =  screen.height;
            sizes.width = (screen.height / image.offsetHeight) * image.offsetWidth;
        }
    } else {
        sizes.height =  screen.height / 2;
        sizes.width = ((screen.height / 2) / image.offsetHeight) * image.offsetWidth;
        if(sizes.width < screen.width / 2.5) {
            sizes.width = screen.width / 2.5;
            sizes.height = ((screen.width / 2.5) / image.offsetWidth) * image.offsetHeight;
        }
    }
    return sizes;
}
