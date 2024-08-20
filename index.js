/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: oneway
@author: SpeedyGo55
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const wall = "w"
const exit = "e"
const relic = "r"
const trap = "t"

setLegend(
  [ player, bitmap`
................
................
.......000......
.......020......
......0220......
......02220.0...
....0003230.0...
....0.0222000...
....0.05550.....
......02220.....
.....022220.....
.....02220......
......000.......
......0.0.......
.....00.00......
................`],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
L0L0L0L0L0L0L0LL
LL0000000000000L
L0000000000000LL
LL0000000000000L
L0000000000000LL
LL0000000000000L
L0000000000000LL
LL0000000000000L
L0000000000000LL
LL0000000000000L
L0000000000000LL
LL0000000000000L
L0000000000000LL
LL0L0L0L0L0L0L0L
LLLLLLLLLLLLLLLL`],
  [ exit, bitmap`
...7777777777...
...7D44444447...
...74D4444447...
...74D4444447...
...744D444447...
...744D444447...
...7444D44447...
...7444D44447...
...74444D4447...
...74444D4447...
...744444D447...
...744444D447...
...7444444D47...
...7444444D47...
...74444444D7...
...7777777777...`],
  [ relic, bitmap`
................
................
....33333333....
.....333333.....
.....333333.....
......3333......
.......33.......
.......33.......
.......66.......
.......33.......
.......33.......
.......33.......
....33333333....
................
................
................`]
)

setSolids([wall,player])

let level = 0
const levels = [  
  map`
wwwwwww
wwwwwww
wwwwwww
wwerpww
wwwwwww
wwwwwww
wwwwwww`,
  map`
.......p
...www..
.r....w.
...e..w.
.w....w.
.w...r..
rw......
....www.`,

]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  const player_data = getFirst(player)
  if (getTile(player_data.x, player_data.y + 1).length == 0 || getTile(player_data.x, player_data.y + 1)[0].type != "w") {
  addSprite(player_data.x, player_data.y, wall)
  }
  player_data.y += 1
})
onInput("w", () => {
  const player_data = getFirst(player)
  if (getTile(player_data.x, player_data.y - 1).length == 0 || getTile(player_data.x, player_data.y - 1 )[0].type != "w") {
  addSprite(player_data.x, player_data.y, wall)
  }
  player_data.y -= 1
})
onInput("d", () => {
  const player_data = getFirst(player)
  if (getTile(player_data.x + 1, player_data.y).length == 0 || getTile(player_data.x + 1, player_data.y)[0].type != "w") {
  addSprite(player_data.x, player_data.y, wall)
  }
  player_data.x += 1
})
onInput("a", () => {  
  const player_data = getFirst(player)
  if (getTile(player_data.x - 1, player_data.y).length == 0 || getTile(player_data.x - 1, player_data.y)[0].type != "w") {
  addSprite(player_data.x, player_data.y, wall)
  }
  player_data.x -= 1
})
onInput("l", () => {
  setMap(levels[level])
})
onInput("j", () => {
    if (tilesWith(relic,player).length != 0) {
    getTile(getFirst(player).x, getFirst(player).y)[1].remove()
  }
})

afterInput(() => {
  const targetNumber = tilesWith(relic).length;

  const numberCovered = tilesWith(player, exit).length;

  if (targetNumber == 0 && numberCovered != 0) {
    level = level + 1
        const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
  
})
