

export default class SubBuilder {
  positions5 = ['Goalie', 'Defender', 'Left Runner', 'Forward Attacker', 'Right Runner']

  enabledPlayers(playersToCheck) {
    const p = []
    for (const item of Object.keys(playersToCheck)) {
      if(playersToCheck[item].enabled) {
        p.push(item)
      }
    }
    return p
  }

  buildRoster(playerConfig) {
    const players = this.enabledPlayers(playerConfig)

    if(players.length < this.positions5.length) {
      console.log('Fewer players than positions5. Good luck!')
      return 0
    }

    const numBlocks = 8

    let playerIndex = 0
    const rosterBlockArray = []
    for (let i = 0; i < numBlocks; i++) {
      const assignedPositionsArray = []
      rosterBlockArray.push(assignedPositionsArray)
      for (let positionIndex = 0; positionIndex < this.positions5.length; positionIndex++) {
        const position = this.positions5[positionIndex]
        const player = players[playerIndex]
        assignedPositionsArray.push({
          player,
          position
        })
        playerIndex++
        if(playerIndex == players.length) {playerIndex = 0}
      }
   }
   return rosterBlockArray
  }

  printRoster(rosterBlocksArray) {
    for (let i = 0; i < rosterBlocksArray.length; i++) {
      const rosterBlock = rosterBlocksArray[i]
      if(i == rosterBlocksArray.length/2) {
        console.log('\n----HALFTIME----')
      }
      console.log(`\nBlock ${i+1}`)

      for (let j = 0; j < rosterBlock.length; j++) {
        const assignment = rosterBlock[j]
        const player = assignment.player
        console.log(`${this.positions5[j]}\t ${player}`)
      }
    }
  }



}