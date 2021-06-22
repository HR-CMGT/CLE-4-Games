export class Hook {

    // letter : Letter
    div: HTMLElement
    img: HTMLElement

    x: number
    y: number

    targetX: number
    targetY: number

    // mousex: number
    // mousey: number

    constructor() {
        document.body.addEventListener("click", this.clickHandler)
        this.create()

    }

    shootHook(mousex: number, mousey: number) {
        this.targetX = mousex - this.div.clientWidth / 2
        this.targetY = mousey - this.div.clientHeight / 2
    }

    update() {

        if (this.x < this.targetX) {
            this.x = this.x + 1
            this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
        }

        if (this.y < this.targetY){
            this.y = this.y + 1
            this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
        }
        if (this.x > this.targetX) {
            this.x = this.x - 1
            this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
        }

        if (this.y > this.targetY){
            this.y = this.y - 1
            this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
        }
           
    }

    create() {
        this.div = document.createElement("hook");
        this.img = document.createElement("img")
        this.img.classList.add("tile")
        this.img.setAttribute("src", "../images/hook.png")
        this.div.appendChild(this.img)
        document.body.appendChild(this.div)
        this.x = (window.innerWidth / 2) - (this.div.clientWidth / 2)
        this.y = window.innerHeight - this.div.clientHeight
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    clickHandler = (e: MouseEvent) => {
        this.shootHook(e.clientX, e.clientY)
    }

  
}