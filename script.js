const slider = document.querySelector(".sliderr")
const container = document.querySelector(".slider_container")
const slides = document.querySelectorAll(".slide")
const navigations = document.querySelectorAll(".slider_navigation")

let activeOrder = 0;
main()

function main(){
    for(let i = 0; i < slides.length; i++){
        const slide = slides[i]

        slide.dataset.order = i;
        slide.style.transform = "translate(-50%, -50%)"
        slide.addEventListener('click', onClick)
    }
    

    for(const navigation of navigations){
        navigation.addEventListener('click', NavigationOnClick)
    }
    activeOrder = Math.floor(slides.length / 2)
    update();
}

function update(){
    const {width, height} = container.getBoundingClientRect()
    

    const a = width /2
    const b = height /2

    const delta = Math.PI / slides.length / 2

    for(let i = 0; i < slides.length; i++){
        const leftSlide = document.querySelector(
            `.slide[data-order="${activeOrder - i}"]`
        )
        if(leftSlide){
            leftSlide.style.zIndex = slides.length - i
            leftSlide.style.left = `${
                width/2 + a* Math.cos((Math.PI*3)/2 - delta* i *1.5
            )}px`
            leftSlide.style.top = `50%`
            //  leftSlide.style.top = `${
            //       -b * Math.sin((Math.PI * 3) / 2 - delta * i * 2)}px`
        } 
        const rightSlide = document.querySelector(`.slide[data-order = '${activeOrder + i}']`)

        if(rightSlide){
            rightSlide.style.zIndex = slides.length - i
            rightSlide.style.left = `${
                width/2 + a * Math.cos((Math.PI*3)/2 + delta* i *1.5)}px`
            // rightSlide.style.top = `${
            //     -b * Math.sin((Math.PI * 3) / 2 - delta * i * 2)}px`
            rightSlide.style.top = `50%`
        } 
    }
}

function onClick(){
    const order = parseInt(this.dataset.order, 10)
    activeOrder = order
    update()
}

function NavigationOnClick(e){
    e.preventDefault()
    const {dir} = this.dataset
    if(dir === 'prev'){
        activeOrder = Math.max(0, activeOrder - 1)
    }else if (dir === 'next'){
        activeOrder = Math.min(slides.length - 1, activeOrder + 1)
    }
    update()
}