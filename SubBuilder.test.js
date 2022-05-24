import SubBuilder from './SubBuilder'

const seedPlayers = {
  'Crystal Dunn': {
    'enabled': true
  },
  'Tobin Heath': {
    'enabled': true
  },
  'Lindsey Horan': {
    'enabled': true
  },
  'Mallory Pugh': {
    'enabled': true
  },
  'Kelly O\'Hara': {
    'enabled': true
  },
  'Julie Johnston': {
    'enabled': true
  },
  'Becky Sauerbrunn': {
    'enabled': true
  },
  'Abby Dahlkemper': {
    'enabled': true
  },
  'Megan Rapinoe': {
    'enabled': true
  },
  'Carli Lloyd': {
    'enabled': true
  }
}

function countAssignments(rosterBlocksArray) {
  let count = 0
  const playerCounts = {}
  for(let player in seedPlayers) {
    let playerCount = 0
    const playerPositions = {}
    rosterBlocksArray.forEach(rosterBlock => {
      Object.keys(rosterBlock).forEach(position => {
        if(rosterBlock[position] === player) {
          playerCount++
          if(playerPositions[position]) {
            playerPositions[position] += 1
          }
          else {
            playerPositions[position] = 1
          }
        }
      })
    })
    playerCounts[player] = {count: playerCount, positions: playerPositions}
    count += playerCount
  }

  playerCounts.total = count
  return playerCounts
}

describe('SubBuilderTests', () => {
  let players

  beforeEach(() => {
    players = JSON.parse(JSON.stringify(seedPlayers)) // deep copy players for clean data for each test
  })

  test('buildRoster returns result with 8 blocks and even player assignments', () => {
    const roster = new SubBuilder().buildRoster(players)
    expect(roster).toBeDefined()
    expect(roster.length).toBe(8)
  })
  test('buildRoster returns result with even player assignments for nicely divisible # of players', () => {
    const roster = new SubBuilder().buildRoster(players)
    const playerCount = countAssignments(roster)
    for(let player in players) {
      expect(playerCount[player].count).toBe(4)
    }
  })

  test('buildRoster returns result with even player assignments for nicely divisible # of players, some not enabled', () => {
    players['Crystal Dunn'].enabled = false
    players['Tobin Heath'].enabled = false
    const roster = new SubBuilder().buildRoster(players)
    const enabledPlayers = Object.keys(players).filter(p => players[p].enabled == true)
    expect(enabledPlayers.length).toBe(8)
    const playerCount = countAssignments(roster)

    for(let player in players) {
      if(players[player].enabled) {
        expect(playerCount[player].count).toBe(5)
      } else {
        expect(playerCount[player].count).toBe(0)
      }
    }
  })

  test('buildRoster returns result with close to even player assignments for less divisible # of players', () => {
    players['Crystal Dunn'].enabled = false
    players['Tobin Heath'].enabled = false
    players['Lindsey Horan'].enabled = false
    const roster = new SubBuilder().buildRoster(players)
    const enabledPlayers = Object.keys(players).filter(p => players[p].enabled == true)
    expect(enabledPlayers.length).toBe(7)
    const playerCount = countAssignments(roster)

    for(let player in players) {
      if(players[player].enabled) {
        if(player == 'Megan Rapinoe' || player == 'Carli Lloyd') { // could make this index based
          expect(playerCount[player].count).toBe(5)
        }
        else {
          expect(playerCount[player].count).toBe(6)
        }
      } else {
        expect(playerCount[player].count).toBe(0)
      }
    }
  })

  test('buildRoster returns result with rotating positions when # players equals # positions', () => {
    players['Crystal Dunn'].enabled = false
    players['Tobin Heath'].enabled = false
    players['Lindsey Horan'].enabled = false
    players['Mallory Pugh'].enabled = false
    players['Kelly O\'Hara'].enabled = false

    const subBuilder = new SubBuilder()
    const roster = subBuilder.buildRoster(players)
    const playerCount = countAssignments(roster)
    for(let player in players) {
      if(players[player].enabled) {
        expect(playerCount[player].count).toBe(8)
        const thisPlayerPositions = playerCount[player].positions
        expect(Object.keys(thisPlayerPositions).length).toBe(5)
        for(let position of Object.keys(thisPlayerPositions)) {
          expect(thisPlayerPositions[position]).toBeLessThanOrEqual(2)
        }
      }
      else {
        expect(playerCount[player].count).toBe(0)
      }
    }
  })

  test('buildRoster returns result with rotating positions for evenly divisible # of players', () => {
    const subBuilder = new SubBuilder()
    const roster = subBuilder.buildRoster(players)
    const playerCount = countAssignments(roster)
    for(let player in players) {
      expect(playerCount[player].count).toBe(4)
      const thisPlayerPositions = playerCount[player].positions
      expect(Object.keys(thisPlayerPositions).length).toBe(4)
      for(let position of Object.keys(thisPlayerPositions)) {
        expect(thisPlayerPositions[position]).toBe(1)
      }
    }
  })

  // Need a test for rotating things like 9 players through 6 positions but needs position list other than 5


})