let table = document.querySelector('#board_table')
table.style.height = table.clientWidth + "px";
window.addEventListener("resize", function(event) {
    table.style.height = table.clientWidth + "px";
})
let TURNS = 0;
let SWITCH = 1;

for (let i = 1; i < 9; i++){
    for (let j = 0; j < 8; j++){
        let cell = table.rows[i].cells[j];
        if ((i + j) % 2 === 0){
            cell.style.backgroundColor = "lightgreen";}
        else {
            cell.style.backgroundColor = "lightblue";}
        cell.style.border = "1px black solid";

        cell.addEventListener("mouseover", function(event) {
            cell.style.border = "1px yellow solid";
        })
        cell.addEventListener("mouseout", function(event) {
            cell.style.border = "1px black solid";
        })
        cell.setAttribute("cell_number", "" + (String(i) + String(j)));
    }
}

function current_figure(element){
    let figure = element.firstElementChild.getAttribute("src");
    figure = figure.slice(7, 17);
    return(figure);
}

function current_figure_team(element){
    let figure = element.firstElementChild.getAttribute("src");
    figure = figure.slice(7, 8);
    return(figure);
}


function current_figure_name(element){
    let figure = element.firstElementChild.getAttribute("src");
    figure = figure.slice(13, 14);
    return(figure);
}

for (let elem of document.querySelectorAll('[cell_number]')){
    let index = elem.getAttribute("cell_number");
    let image = elem.firstElementChild;
    if (Number(index) < 28){
        switch (index){
            case "17":
            case "10": image.src = "images/black_rook.png";
                break
            case "16":
            case "11": image.src = "images/black_knight.png";
                break
            case "15":
            case "12": image.src = "images/black_bishop.png";
                break
            case "13": image.src = "images/black_king.png";
                break
            case "14": image.src = "images/black_queen.png";
                break
            default: image.src = "images/black_pawn.png";
        }
    }
    if (Number(index) > 69){
        switch (index){
            case "87":
            case "80": image.src = "images/white_rook.png";
                break
            case "86":
            case "81": image.src = "images/white_knight.png";
                break
            case "85":
            case "82": image.src = "images/white_bishop.png";
                break
            case "83": image.src = "images/white_king.png";
                break
            case "84": image.src = "images/white_queen.png";
                break
            default: image.src = "images/white_pawn.png";
        }
    }
}

//current_figure(document.querySelector("[cell_number]"));
