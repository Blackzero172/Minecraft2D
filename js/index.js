const worldContainer = document.querySelector(".world-container");
const landingPage = document.querySelector(".landing-page");
const blocks = {
	cobble: "cobble",
	iron: "iron",
	gold: "gold",
	diamond: "diamond",
	dirt: "dirt",
	sky: "sky",
	grass: "grass",
	log: "log",
	leaves: "leaves",
	cloud: "cloud",
};
let inventory = [];
let selectedTool = "";
let toolLevel = 0;
let tierMaterials = [
	{
		amount: 3,
		material: blocks.log,
		imgs: [
			"/assets/img/logTexture.png",
			"/assets/img/woodenPickaxeTexture.png",
			"/assets/img/woodenAxeTexture.png",
			"/assets/img/woodenShovelTexture.png",
		],
	},
	{
		amount: 10,
		material: blocks.cobble,
		imgs: [
			"/assets/img/cobbleTexture.png",
			"/assets/img/stonePickaxeTexture.png",
			"/assets/img/stoneAxeTexture.png",
			"/assets/img/stoneShovelTexture.png",
		],
	},
	{
		amount: 5,
		material: blocks.iron,
		imgs: [
			"/assets/img/ironTexture.png",
			"/assets/img/ironPickaxeTexture.png",
			"/assets/img/ironAxeTexture.png",
			"/assets/img/ironShovelTexture.png",
		],
	},
	{
		amount: 5,
		material: blocks.gold,
		imgs: [
			"/assets/img/goldTexture.png",
			"/assets/img/goldPickaxeTexture.png",
			"/assets/img/goldAxeTexture.png",
			"/assets/img/goldShovelTexture.png",
		],
	},
	{
		amount: 3,
		material: blocks.diamond,
		imgs: [
			"/assets/img/diamondTexture.png",
			"/assets/img/diamondPickaxeTexture.png",
			"/assets/img/diamondAxeTexture.png",
			"/assets/img/diamondShovelTexture.png",
		],
	},
];
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
const probability = (chance) => {
	return Math.random() < chance;
};
const resetTier = () => {
	toolLevel = 0;
	const tools = document.querySelectorAll(".toolbar .tool");
	tools.forEach((tool) => {
		if (!tool.classList.contains("hand")) tool.querySelector("img").style.opacity = "0.25";
	});
	for (let i = 1; i < tierMaterials[0].imgs.length; i++) {
		tools[i - 1].querySelector("img").src = tierMaterials[0].imgs[i];
	}
	const costContainer = craftingTable.querySelector(".cost-container");
	const imgContainer = craftingTable.querySelector(".img-container");
	costContainer.querySelector("img").src = tierMaterials[0].imgs[0];
	costContainer.querySelector("p").innerText = `x${tierMaterials[0].amount}`;
	const imgs = imgContainer.querySelectorAll("img");
	for (let i = 0; i < imgs.length; i++) {
		imgs[i].src = tierMaterials[0].imgs[i + 1];
	}
	toolButtons.forEach((tool) => {
		toolButtons.forEach((tool) => {
			tool.id = "";
		});

		tool.id = "selected";
		selectedTool = tool.getAttribute("data-tool");
	});
};
const populateWorld = () => {
	worldContainer.innerHTML = "";
	landingPage.style.display = "none";
	inventory = [];
	inventoryButtons.forEach((button) => {
		let counter = button.querySelector("h2");
		counter.innerText = 0;
	});
	selectedTool = "";
	resetTier();
	for (let i = 1; i <= 21; i++) {
		let tileRow = document.createElement("tr");
		for (let j = 1; j <= 21; j++) {
			let tile = document.createElement("td");

			if (i < 12) {
				tile.classList.add(blocks.sky);
				tile.addEventListener("click", placeBlock);
			} else if (i == 12) {
				tile.classList.add(blocks.grass);
				tile.addEventListener("click", mineBlock);
			} else if (i > 12 && i < 15) {
				let randomBlock = probability(0.5) ? blocks.cobble : blocks.dirt;
				tile.classList.add(blocks[randomBlock]);
				tile.addEventListener("click", mineBlock);
			} else {
				let randomBlock = probability(0.5)
					? blocks.cobble
					: probability(0.6)
					? blocks.iron
					: probability(0.6)
					? blocks.gold
					: blocks.diamond;
				tile.classList.add(blocks[randomBlock]);
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
	changeTile("x:18 y:11", blocks.log);
	changeTile("x:18 y:10", blocks.log);
	changeTile("x:18 y:9", blocks.log);
	// Leaves
	changeTile("x:17 y:8", blocks.leaves);
	changeTile("x:18 y:8", blocks.leaves);
	changeTile("x:19 y:8", blocks.leaves);
	changeTile("x:17 y:7", blocks.leaves);
	changeTile("x:18 y:7", blocks.leaves);
	changeTile("x:19 y:7", blocks.leaves);
	changeTile("x:17 y:6", blocks.leaves);
	changeTile("x:18 y:6", blocks.leaves);
	changeTile("x:19 y:6", blocks.leaves);
	changeTile("x:4 y:11", blocks.leaves);
	changeTile("x:5 y:11", blocks.leaves);
	changeTile("x:5 y:10", blocks.leaves);
	changeTile("x:6 y:11", blocks.leaves);
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
		}
	});
});
const craftingTable = document.querySelector(".crafting-menu");
const ToggleCrafting = () => {
	craftingTable.classList.toggle("display-none");
};
const updateCounter = (blockType) => {
	const parentButton = document.querySelector(`.inventory-container .${blockType}`);
	const counter = parentButton.querySelector("h2");
	const amount = inventory.filter((block) => block === blockType);
	counter.innerText = amount.length;
};
const updateToolBar = () => {
	const tools = document.querySelectorAll(".toolbar .tool");
	if (toolLevel === 0) {
		tools.forEach((tool) => {
			tool.querySelector("img").style.opacity = "1";
		});
	}
	if (toolLevel > 0 && toolLevel < 5) {
		const tier = tierMaterials[toolLevel];

		for (let i = 1; i < tier.imgs.length; i++) {
			tools[i - 1].querySelector("img").src = tier.imgs[i];
		}
	}
};
const upgradeTier = () => {
	const costContainer = craftingTable.querySelector(".cost-container");
	const imgContainer = craftingTable.querySelector(".img-container");
	let tier = tierMaterials[toolLevel];
	const amount = inventory.filter((block) => block === tier.material);

	if (amount.length >= tier.amount) {
		let count = 0;
		inventory.forEach((item) => {
			if (item === tier.material && count < tier.amount) {
				const index = inventory.indexOf(item);
				inventory.splice(index);
				count++;
			}
		});
		updateCounter(tier.material);
		updateToolBar();
		toolLevel++;
		tier = tierMaterials[toolLevel];
		if (toolLevel < 5) {
			costContainer.querySelector("img").src = tier.imgs[0];
			costContainer.querySelector("p").innerText = `x${tier.amount}`;
			const imgs = imgContainer.querySelectorAll("img");
			for (let i = 0; i < imgs.length; i++) {
				imgs[i].src = tier.imgs[i + 1];
			}
		} else {
			craftingTable.innerHTML = "<p>Congratulations You have reached max upgrades!</p>";
		}
	}
};
const startButton = document.querySelector(".start-btn");
startButton.addEventListener("click", populateWorld);

const resetButton = document.querySelector(".reset-btn");
resetButton.addEventListener("click", populateWorld);

const craftingButton = document.querySelector(".crafting");
craftingButton.addEventListener("click", ToggleCrafting);

const upgradeButton = document.querySelector(".button-container .confirm");
upgradeButton.addEventListener("click", upgradeTier);

const cancelButton = document.querySelector(".button-container .cancel");
cancelButton.addEventListener("click", ToggleCrafting);
