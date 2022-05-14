const pipeSpacing = 3
const gridSize = 5

class Bird {
    height: number

    constructor(height: number | undefined = null) {
        this.height = height || 0
    }

    drop() {
        this.height += 1
    }

    jump() {
        this.height -= 2
    }
}

class Pipe {
    column: number
    hole: number

    constructor(column: number | undefined = null, hole: number | undefined = null) {
        this.column = column || gridSize - 1
        this.hole = hole || Math.randomRange(0, gridSize - 1)
    }

    advance() {
        this.column -= 1
    }
}

let isGameStarted: boolean = false
let bird = new Bird()
let pipes: Pipe[] = []
let loopNum = -1


loops.everyInterval(400, () => {
    if (!isGameStarted) return

    loopNum += 1

    if (loopNum === 0) {
        pipes.push(new Pipe(gridSize))
    } else if (loopNum >= pipeSpacing) {
        loopNum = -1
    }

    bird.drop()
    pipes.forEach(pipe => pipe.advance())

    basic.clearScreen()

    for (let i=0; i<pipes.length; i++) {
        const pipe = pipes[i]
        for (let j=0; j<gridSize; j++) {
            if (j !== pipe.hole) {
                led.plotBrightness(pipe.column, j, 255)
            }
        }
    }

    led.plotBrightness(1, bird.height, 25)
})

input.onButtonPressed(Button.A, () => {
    bird.jump()
})

input.onButtonPressed(Button.B, () => {
    bird.jump()
})

input.onButtonPressed(Button.AB, () => {
    if (isGameStarted) return
    led.stopAnimation()

    bird = new Bird()

    basic.showString("321Go")
    isGameStarted = true
})
