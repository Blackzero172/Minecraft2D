const worldContainer = document.querySelector(".world-container");
const blocks = {
	dirt: "dirt",
	sky: "sky",
	grass: "grass",
};
let selectedTool = "";
const populateWorld = () => {
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

			tileRow.append(tile);
		}
		worldContainer.append(tileRow);
	}
};
populateWorld();
const toolButtons = document.querySelectorAll("button");
toolButtons.forEach((tool) => {
	tool.addEventListener("click", (e) => {
		toolButtons.forEach((tool) => {
			tool.classList.remove("selected");
		});
		tool.classList.add("selected");
		selectedTool = tool.getAttribute("data-tool");
	});
});
