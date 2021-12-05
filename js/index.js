const worldContainer = document.querySelector(".world-container");
const landingPage = document.querySelector(".landing-page");
const blocks = {
	dirt: "dirt",
	sky: "sky",
	grass: "grass",
	cobble: "cobble",
	iron: "iron",
	gold: "gold",
	diamond: "diamond",
	log: "log",
	leaves: "leaves",
	cloud: "cloud",
};
let inventory = [];
let selectedTool = "";
let toolLevel = 0;
const inventoryButtons = document.querySelectorAll(".inventory-container .tool");
const mineBlock = (e) => {
	const tile = e.target;
	let requiredTool = [];
	let requiredLevel = 0;
	switch (tile.className) {
		case blocks.dirt:
		case blocks.grass:
			requiredTool.push("shovel", "hand");
			break;
		case blocks.log:
			requiredTool.push("axe", "hand");
			break;
		case blocks.leaves:
			requiredTool.push("axe");
			requiredLevel = 1;
			break;
		case blocks.cobble:
			requiredTool.push("pickaxe");
			requiredLevel = 1;
			break;
		case blocks.iron:
			requiredTool.push("pickaxe");
			requiredLevel = 2;
			break;
		case blocks.gold:
			requiredTool.push("pickaxe");
			requiredLevel = 3;
			break;
		case blocks.diamond:
			requiredTool.push("pickaxe");
			requiredLevel = 4;
			break;
	}
	if (requiredTool.includes(selectedTool) && toolLevel >= requiredLevel) {
		inventoryButtons.forEach((button) => {
			if (button.classList.contains(tile.className)) {
				let counter = button.querySelector("h2");
				counter.innerText = +counter.innerText + 1;
			}
		});
		inventory.push(tile.className);
		tile.className = blocks.sky;
		tile.addEventListener("click", placeBlock);
	}
};
const populateWorld = () => {
	worldContainer.innerHTML = "";
	landingPage.style.display = "none";
	inventory = [];
	inventoryButtons.forEach((button) => {
		let counter = button.querySelector("h2");
		counter.innerText = 0;
	});
	for (let i = 1; i <= 21; i++) {
		let tileRow = document.createElement("tr");
		for (let j = 1; j <= 21; j++) {
			let tile = document.createElement("td");

			if (i < 15) {
				tile.classList.add(blocks.sky);
				tile.addEventListener("click", placeBlock);
			} else if (i == 15) {
				tile.classList.add(blocks.grass);
				tile.addEventListener("click", mineBlock);
			} else {
				tile.classList.add(blocks.dirt);
				tile.addEventListener("click", mineBlock);
			}
			tile.id = `x:${j} y:${i}`;
			tileRow.append(tile);
		}
		worldContainer.append(tileRow);
	}
	// Log Creation
	createTree();
	// Cloud Creation
	createCloud();
};
const createTree = () => {
	// Log
	changeTile("x:18 y:14", blocks.log);
	changeTile("x:18 y:13", blocks.log);
	changeTile("x:18 y:12", blocks.log);
	// Leaves
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
};
const createCloud = () => {
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
	tile.classList.replace("sky", tileType);
	tile.addEventListener("click", mineBlock);
};
const placeBlock = (e) => {
	const selectedButton = document.getElementById("selected");
	const selectedBlock = selectedButton.classList[0];
	if (
		selectedBlock &&
		selectedTool === "inventory" &&
		e.target.className === "sky" &&
		inventory.includes(selectedBlock)
	) {
		e.target.className = selectedBlock;
		e.target.addEventListener("click", mineBlock);
		let counter = selectedButton.querySelector("h2");
		counter.innerText = +counter.innerText - 1;
		inventory.pop();
	}
};
const toolButtons = document.querySelectorAll(".tool");
toolButtons.forEach((tool) => {
	tool.addEventListener("click", (e) => {
		if (toolLevel >= 1 || tool.classList.contains("hand") || tool.getAttribute("data-tool") === "inventory") {
			toolButtons.forEach((tool) => {
				tool.id = "";
			});

			tool.id = "selected";
			selectedTool = tool.getAttribute("data-tool");
		} else {
			console.log("you need to unlock this tool");
		}
	});
});

const startButton = document.querySelector(".start-btn");
startButton.addEventListener("click", populateWorld);
const resetButton = document.querySelector(".reset-btn");
resetButton.addEventListener("click", populateWorld);
