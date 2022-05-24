

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

    // avoid same players in same positions
    let offsetEveryXNumberOfRotations = 0
    if(players.length % this.positions5.length == 0) {
      // needs test || this.positions5.length % (players.length - this.positions5.length) == 0) {
      offsetEveryXNumberOfRotations = players.length / this.positions5.length
    }

    const numBlocks = 8

    let playerIndex = 0
    const rosterBlockArray = []
    for (let i = 0; i < numBlocks; i++) {
      const assignedPositionsMap = {}
      rosterBlockArray.push(assignedPositionsMap)
      for (let positionIndex = 0; positionIndex < this.positions5.length; positionIndex++) {
        let offsetPositionIndex = positionIndex
        if(offsetEveryXNumberOfRotations > 0) {
          offsetPositionIndex+= Math.floor(i / offsetEveryXNumberOfRotations)
          offsetPositionIndex = offsetPositionIndex % this.positions5.length
        }
        const position = this.positions5[offsetPositionIndex]
        const player = players[playerIndex]
        assignedPositionsMap[position] =  player
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

      for (let j = 0; j < this.positions5.length; j++) {
        const position = this.positions5[j]
        const player = rosterBlock[position]
       console.log(`${position}\t ${player}`)
      }
    }
  }



}