$(document).ready(function () {
    const infoDisplay = document.querySelector("#info")
    const startCells = ["", "", "", "", "", "", "", "", ""]

    let go = "circulo"
    infoDisplay.textContent = "Es el turno de " + go.toUpperCase()

    function createBoard() {
        const cellElements = document.querySelectorAll(".celda")
        startCells.forEach((cell, index) => {
            const cellElement = cellElements[index]
            cellElement.addEventListener('click', addGo)
        })
    }

    createBoard();

    function addGo(e) {
        const goDisplay = document.createElement('div')
        goDisplay.classList.add(go)
        e.target.append(goDisplay)
        go = go === "circulo" ? "cruz" : "circulo"
        infoDisplay.textContent = "Es el turno de " + go
        e.target.removeEventListener("click", addGo)
        checkScore()
    }

    function checkScore() {
        const allCells = document.querySelectorAll('.celda')
        var circleWins = false
        var crossWins = false

        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]
        console.log("allCells ", allCells)
        winningCombos.forEach(array => {
            circleWins = array.every(cell => {

                console.log("cell ", cell)
                allCells[cell].firstChild?.classList.contains('circulo')})
            if (circleWins) {
                infoDisplay.textContent = "Gana el círculo"
                allCells.forEach(celda => celda.replaceWith(celda.cloneNode(true)))
                return
            }

        })

        winningCombos.forEach(array => {
                crossWins = array.every(cell =>
                allCells[cell].firstChild?.classList.contains('cruz'))

            if (crossWins) {
                infoDisplay.textContent = "Gana la cruz"
                allCells.forEach(celda => celda.replaceWith(celda.cloneNode(true)))
                return
            }
        })

        var ocupadas = 0
        for (i = 0; i < allCells.length; i++) {
            if (allCells[i].hasChildNodes()) {
                ocupadas++
            } 
        }

        console.log(ocupadas)

        if((ocupadas > 8) && (!circleWins) && (!crossWins)) {
            infoDisplay.textContent = "EMPATE"
        }
    }

    $('#reset-button').click(function () {
        location.reload();
    })
})