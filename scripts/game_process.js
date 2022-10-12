class ClickedFigure{
    team = "";
    figure = "";
    source_cell = "00";
    path = "";
    element = "";
    bg_color = "";
    constructor(team, figure, source_cell, path, element, bg_color) {
        this.figure = figure;
        this.team = team;
        this.source_cell = source_cell;
        this.path = path;
        this.element = element;
        this.bg_color = bg_color;}

    turn_color_back(){
        this.element.style.backgroundColor = this.bg_color;}
}

let board = document.querySelector("#board_table");

// function switch_sides(){
//     for (let i = 1; i < 5; i++){
//         for (let j = 0; j < 8; j++) {
//             let i2 = 9 - i;
//             let j2 = 7 - j;
//             i2 = String(i2) + String(j2);
//             let cell = document.querySelector('[cell_number="' + String(i) + String(j) + '"]');
//             let cell2 = document.querySelector('[cell_number="' + String(i2) + String(j2) + '"]');
//             // let image = cell.firstElementChild;
//             // let image2 = cell2.firstElementChild;
//             // image_src = image.getAttribute("src");
//             // image.src = image2.getAttribute("src");
//             // image2.src = image_src;
//             let temp = cell.innerHTML;
//             cell.innerHTML = cell2.innerHTML;
//             cell.innerHTML = temp;
//
//         }}}

let move = new ClickedFigure("", "", "00", "", "", "");
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

                    }
                    else if (move.team === team){
                        alert("You can't eat yourself!");
                        move.source_cell = "00";
                    }
                    move.turn_color_back();}}
            else{
                alert("This is not your turn!")}
        })
    }
}
