const worldContainer = document.querySelector(".world-container");
const landingPage = document.querySelector(".landing-page");
const blocks = {
	dirt: "dirt",
	sky: "sky",
	grass: "grass",
	cobble: "cobble",
	log: "log",
	leaves: "leaves",
	cloud: "cloud",
};
const inventory = [];
let selectedTool = "";
const mineBlock = (e) => {
	if (selectedTool === "shovel") {
		const inventoryBtn = document.querySelector(".inventory");
		inventory.push(e.target.className);
		inventoryBtn.classList.add(e.target.className);
		e.target.className = blocks.sky;
	}
};
const populateWorld = () => {
	worldContainer.innerHTML = "";
	// landingPage.style.display = "none";
	for (let i = 1; i <= 21; i++) {
		let tileRow = document.createElement("tr");
		for (let j = 1; j <= 21; j++) {
			let tile = document.createElement("td");

			if (i < 15) {
				tile.classList.add(blocks.sky);
				tile.addEventListener("click", placeBlock);
			} else if (i == 15) {
				tile.classList.add(blocks.grass);
				tile.addEventListener("click", (e) => {
					if (selectedTool === "shovel") {
						e.target.classList.replace(blocks.grass, blocks.sky);
						inventory.push(blocks.grass);
					}
				});
			} else {
				tile.classList.add(blocks.dirt);
				tile.addEventListener("click", mineBlock);
			}
			tile.id = `x:${j} y:${i}`;
			tileRow.append(tile);
		}
		worldContainer.append(tileRow);
	}
	// Cobble Creation
	changeTile("x:21 y:14", blocks.cobble);
	changeTile("x:15 y:14", blocks.cobble);
	changeTile("x:14 y:14", blocks.cobble);
	// Log Creation
	changeTile("x:18 y:14", blocks.log);
	changeTile("x:18 y:13", blocks.log);
	changeTile("x:18 y:12", blocks.log);
	// Leaves Creation
	changeTile("x:17 y:11", blocks.leaves);
	changeTile("x:18 y:11", blocks.leaves);
	changeTile("x:19 y:11", blocks.leaves);
	changeTile("x:17 y:10", blocks.leaves);
	changeTile("x:18 y:10", blocks.leaves);
	changeTile("x:19 y:10", blocks.leaves);
	changeTile("x:17 y:9", blocks.leaves);
	changeTile("x:18 y:9", blocks.leaves);
	changeTile("x:19 y:9", blocks.leaves);
	changeTile("x:4 y:14", blocks.leaves);
	changeTile("x:5 y:14", blocks.leaves);
	changeTile("x:5 y:13", blocks.leaves);
	changeTile("x:6 y:14", blocks.leaves);
	changeTile("x:3 y:6", blocks.cloud);
	changeTile("x:4 y:6", blocks.cloud);
	changeTile("x:4 y:5", blocks.cloud);
	changeTile("x:5 y:6", blocks.cloud);
	changeTile("x:5 y:5", blocks.cloud);
	changeTile("x:6 y:6", blocks.cloud);
	changeTile("x:6 y:5", blocks.cloud);
	changeTile("x:7 y:6", blocks.cloud);
};

const changeTile = (tilePosition, tileType) => {
	const tile = document.getElementById(tilePosition);
	let requiredTool = "";
	tile.classList.replace("sky", tileType);

	switch (tile.className) {
		case blocks.dirt:
		case blocks.grass:
			requiredTool = "shovel";
			break;
		case blocks.leaves:
		case blocks.log:
			requiredTool = "axe";
			break;
		case blocks.cobble:
			requiredTool = "pickaxe";
			break;
	}
	tile.addEventListener("click", (e) => {
		console.log(requiredTool);
		console.log(tile.className);
		console.log(tile.className === blocks.log);
		if (selectedTool === requiredTool) e.target.classList.replace(tile.className, blocks.sky);
	});
};
const placeBlock = (e) => {
	const currBlock = inventory[inventory.length - 1];
	if (currBlock) {
		e.target.className = currBlock;
		inventory.pop();
	}
};
populateWorld();
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
// startButton.addEventListener("click", populateWorld);
const resetButton = document.querySelector(".reset-btn");
resetButton.addEventListener("click", populateWorld);
