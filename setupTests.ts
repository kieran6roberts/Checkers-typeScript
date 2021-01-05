import "@testing-library/jest-dom";

const mockFullBoard = document.createElement("div");

mockFullBoard.innerHTML = `
    <div class="scoreboard">
        <div class="scoreboard__red player-turn">
            <p class="scoreboard__red-turn">
                Red Player Turn
            </p>
            <p class="scoreboard__red-score"></p>
        </div>
            <div class="scoreboard__blue">
                <p class="scoreboard__blue-turn">
                    Blue Player Turn
                </p>
                <p class="scoreboard__blue-score"></p>
            </div>
        </div>
        <div data-testid="win-modal" class="win-modal">
            <div class="win-modal__content">
                <div class="win-modal__winner">
                    
                </div>
                <button class="win-modal__reset">
                    New Game
                </button>
            </div>
        </div>
        <div class="wrapper">
        <div class="squares">
        <!---row 1-->
        <div data-color="dark" class="square" id="0"></div>
        <div data-color="light" class="square" id="1">
            <button data-color="red" class="piece a2" id="a2"></button>
        </div>
        <div data-color="dark" class="square" id="2"></div>
        <div data-color="light" class="square" id="3">
            <button data-color="red" class="piece a4" id="a4"></button>
        </div>
        <div data-color="dark" class="square" id="4"></div>
        <div data-color="light" class="square" id="5">
            <button data-color="red" class="piece a6" id="a6"></button>
        </div>
        <div data-color="dark" class="square" id="6"></div>
        <div data-color="light" class="square" id="7">
            <button data-color="red" class="piece a8" id="a8"></button>
        </div>
        <!---row 2-->
        <div data-color="light" class="square" id="8">
            <button data-color="red" class="piece b1" id="b1"></button>
        </div>
        <div data-color="dark" class="square" id="9"></div>
        <div data-color="light" class="square" id="10">
            <button data-color="red" class="piece b3" id="b3"></button>
        </div>
        <div data-color="dark" class="square" id="11"></div>
        <div data-color="light" class="square" id="12">
            <button data-color="red" class="piece b5" id="b5"></button>
        </div>
        <div data-color="dark" class="square" id="13"></div>
        <div data-color="light" class="square" id="14">
            <button data-color="red" class="piece b7" id="b7"></button>
        </div>
        <div data-color="dark" class="square" id="15"></div>
        <!---row 3-->
        <div data-color="dark" class="square" id="16"></div>
        <div data-color="light" data-testid="17" class="square" id="17">
            <button data-color="red" class="piece c2" id="c2"></button>
        </div>
        <div data-color="dark" class="square" id="18"></div>
        <div data-color="light" class="square" id="19">
            <button data-color="red" class="piece c4" id="c4"></button>
        </div>
        <div data-color="dark" class="square" id="20"></div>
        <div data-color="light" class="square" id="21">
            <button data-color="red" class="piece c6" id="c6"></button>
        </div>
        <div data-color="dark" class="square" id="22"></div>
        <div data-color="light" class="square" id="23">
            <button data-color="red" class="piece c8" id="c8"></button>
        </div>
        <!---row 4-->
        <div data-color="light" data-testid="24" class="square" id="24"></div>
        <div data-color="dark" class="square" id="25"></div>
        <div data-color="light" data-testid="26" class="square" id="26"></div>
        <div data-color="dark" class="square" id="27"></div>
        <div data-color="light" data-testid="28" class="square" id="28"></div>
        <div data-color="dark" class="square" id="29"></div>
        <div data-color="light" data-testid="30" class="square" id="30"></div>
        <div data-color="dark" class="square" id="31"></div>
        <!---row 5-->
        <div data-color="dark" class="square" id="32"></div>
        <div data-color="light" data-testid="33" class="square" id="33"></div>
        <div data-color="dark" class="square" id="34"></div>
        <div data-color="light" class="square" id="35"></div>
        <div data-color="dark" class="square" id="36"></div>
        <div data-color="light" class="square" id="37"></div>
        <div data-color="dark" class="square" id="38"></div>
        <div data-color="light" class="square" id="39"></div>
        <!---row 6-->
        <div data-color="light" data-testid="40" class="square" id="40">
            <button data-color="blue" class="piece f1" id="f1"></button>
        </div>
        <div data-color="dark" class="square" id="41"></div>
        <div data-color="light" class="square" id="42">
            <button data-color="blue" class="piece f3" id="f3"></button>
        </div>
        <div data-color="dark" class="square" id="43"></div>
        <div data-color="light" class="square" id="44">
            <button data-color="blue" class="piece f5" id="f5"></button>
        </div>
        <div data-color="dark" class="square" id="45"></div>
        <div data-color="light" class="square" id="46">
            <button data-color="blue" class="piece f7" id="f7"></button>
        </div>
        <div data-color="dark" class="square" id="47"></div>
        <!---row 7-->
        <div data-color="dark" class="square" id="48"></div>
        <div data-color="light" class="square" id="49">
            <button data-color="blue" class="piece g2" id="g2"></button>
        </div>
        <div data-color="dark" class="square" id="50"></div>
        <div data-color="light" class="square" id=51>
            <button data-color="blue" class="piece g4" id="g4"></button>
        </div>
        <div data-color="dark" class="square" id="52"></div>
        <div data-color="light" class="square" id="53">
            <button data-color="blue" class="piece g6" id="g6"></button>
        </div>
        <div data-color="dark" class="square" id="54"></div>
        <div data-color="light" class="square" id="55">
            <button data-color="blue" class="piece g8" id="g8"></button>
        </div>
        <!---row 8-->
        <div data-color="light" class="square" id="56">
            <button data-color="blue" class="piece h1" id="h1"></button>
        </div>
        <div data-color="dark" class="square" id="57"></div>
        <div data-color="light" class="square" id="58">
            <button data-color="blue" class="piece h3" id="h3"></button>
        </div>
        <div data-color="dark" class="square" id="59"></div>
        <div data-color="light" class="square" id="60">
            <button data-color="blue" class="piece h5" id="h5"></button>
        </div>
        <div data-color="dark" class="square" id="61"></div>
        <div data-color="light" class="square" id="62">
            <button data-color="blue" class="piece h7" id="h7"></button>
        </div>
        <div data-color="dark" class="square" id="63"></div>
    </div>
</div>
`;

export { mockFullBoard };