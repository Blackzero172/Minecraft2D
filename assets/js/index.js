const worldContainer = document.querySelector(".world-container");
const landingPage = document.querySelector(".landing-page");
const blocks = {
	dirt: "dirt",
	sky: "sky",
	grass: "grass",
};
let selectedTool = "";
const populateWorld = () => {
	worldContainer.innerHTML = "";
	landingPage.style.display = "none";
	for (let i = 1; i <= 21; i++) {
		let tileRow = document.createElement("tr");
		for (let j = 1; j <= 21; j++) {
			let tile = document.createElement("td");

			if (i < 15) {
				tile.classList.add(blocks.sky);
			} else if (i == 15) {
				tile.classList.add(blocks.grass);
				tile.addEventListener("click", (e) => {
					if (selectedTool === "shovel") e.target.classList.replace(blocks.grass, blocks.sky);
				});
			} else {
				tile.classList.add(blocks.dirt);
				tile.addEventListener("click", (e) => {
					if (selectedTool === "shovel") e.target.classList.replace(blocks.dirt, blocks.sky);
				});
			}
			tile.id = `x:${j} y:${i}`;
			tileRow.append(tile);
		}
		worldContainer.append(tileRow);
	}
};
const changeTile = (tilePosition, tileType) => {
	document.querySelector(`#${tilePosition}`).classList.replace("sky", tileType);
};
// populateWorld();
const toolButtons = document.querySelectorAll(".toolbar .tool");
toolButtons.forEach((tool) => {
	tool.addEventListener("click", (e) => {
		toolButtons.forEach((tool) => {
			tool.id = "";
		});
		tool.id = "selected";
		selectedTool = tool.getAttribute("data-tool");
	});
});
const startButton = document.querySelector(".start-btn");
startButton.addEventListener("click", populateWorld);
const resetButton = document.querySelector(".reset-btn");
resetButton.addEventListener("click", populateWorld);
