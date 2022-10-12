class ClickedFigure{
    team = "";
    figure = "";
    source_cell = "00";
    path = "";
    element = "";
    bg_color = "";
    constructor(team, figure, source_cell, path,
                element, bg_color) {
        this.figure = figure;
        this.team = team;
        this.source_cell = source_cell;
        this.path = path;
        this.element = element;
        this.bg_color = bg_color;}

    turn_color_back(){
        this.element.style.backgroundColor = this.bg_color;}
}

function show_corner_message(message, time){
    let alert_div = document.createElement('p');
    alert_div.innerHTML = message;
    document.querySelector(".alert").style
        .display = "block";
    document.querySelector(".alert").append(alert_div);
    setTimeout(() =>
            document.querySelector(".alert").style.display = "none", time);
    setTimeout(() => alert_div.remove(), time);
}
let board = document.querySelector("#board_table");

function switch_sides(){
    for (let i = 1; i < 5; i++){
        for (let j = 0; j < 8; j++) {
            let cell = document.querySelector('[cell_number="'
                + String(i) + String(j) + '"]');
            let cell2 = document.querySelector('[cell_number="'
                + String(9 - i) + String(7 - j) + '"]');
            let image = cell.firstElementChild;
            let image2 = cell2.firstElementChild;
            let image_src = image.getAttribute("src");
            image.src = image2.getAttribute("src");
            image2.src = image_src;}}
}

function twisting_board(){
    let button = document.querySelector('#twisting');
    if (SWITCH === 0){
        button.style.backgroundColor = 'greenyellow';
        SWITCH++;
    } else {
        button.style.backgroundColor = 'orangered';
        SWITCH--;
    }

}

let move = new ClickedFigure("", "",
    "00", "", "", "");
for (let i = 1; i < 9; i++){
    for (let j = 0; j < 8; j++) {
        let cell = board.rows[i].cells[j];
        cell.addEventListener("click", function(event){
            let team = current_figure_team(cell);
            let figure = current_figure_name(cell);
            let path = cell.firstElementChild.getAttribute("src");
            let bg_color = cell.style.backgroundColor;
            if (move.source_cell === "00" && TURNS % 2 === 0 && team === "w" ||
                move.source_cell === "00" && TURNS % 2 !== 0 && team === "b" ||
                move.source_cell !== "00" || team === "i"){
                if (move.source_cell === "00"){
                    if (team !== "i"){
                        move.team = team;
                        move.figure = figure;
                        move.path = path;
                        move.element = cell;
                        move.bg_color = bg_color;
                        cell.style.backgroundColor = "lightyellow";
                        move.source_cell = cell.getAttribute("cell_number");}}
                else{
                    if ((move.team === "w" && team === "b") ||
                        (move.team === "b" && team === "w") ||
                        (team === "i")){
                        cell.firstElementChild.src = move.path;
                        move.element.firstElementChild.src = "images/invisible_fig.png";
                        move.path = "images/invisible_fig.png";
                        TURNS++;
                        move.source_cell = "00";
                        if (SWITCH === 1){
                            switch_sides();}
                    }
                    else if (move.team === team){
                        if (cell.getAttribute("cell_number") !== move.source_cell)
                            show_corner_message("You can't eat yourself!", 2000);
                        move.source_cell = "00";}
                    move.turn_color_back();}}
            else{
                show_corner_message("It's not your turn!", 2000);}
        })
    }
}
