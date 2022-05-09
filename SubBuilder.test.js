import SubBuilder from './SubBuilder'

const players = {
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
  for(let player in players) {
    let playerCount = 0
    rosterBlocksArray.forEach(rosterBlock => {
      rosterBlock.forEach(assignment => {
        if(assignment.player === player) {
          playerCount++
        }
      })
    })
    playerCounts[player] = playerCount
    count += playerCount
  }

  playerCounts.total = count
  return playerCounts
}

describe('SubBuilderTests', () => {
  test('buildRoster returns array with 8 blocks and even player assignments', () => {
    const roster = new SubBuilder().buildRoster(players)
    expect(roster).toBeDefined()
    expect(roster.length).toBe(8)
  })
  test('buildRoster returns array with even player assignments for nicely divisible # of players', () => {
    const roster = new SubBuilder().buildRoster(players)
    const playerCount = countAssignments(roster)
    for(let player in players) {
      expect(playerCount[player]).toBe(4)
    }
  })

  test('buildRoster returns array with even player assignments for nicely divisible # of players, some not enabled', () => {
    players['Crystal Dunn'].enabled = false
    players['Tobin Heath'].enabled = false
    const roster = new SubBuilder().buildRoster(players)
    const enabledPlayers = Object.keys(players).filter(p => players[p].enabled == true)
    expect(enabledPlayers.length).toBe(8)
    const playerCount = countAssignments(roster)

    for(let player in players) {
      if(players[player].enabled) {
        expect(playerCount[player]).toBe(5)
      } else {
        expect(playerCount[player]).toBe(0)
      }
    }
  })

  test('buildRoster returns array with close to even player assignments for less divisible # of players', () => {
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
          expect(playerCount[player]).toBe(5)
        }
        else {
          expect(playerCount[player]).toBe(6)
        }
      } else {
        expect(playerCount[player]).toBe(0)
      }
    }
  })
})