

export default class SubBuilder {
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
    const positions = ['Goalie', 'Defender', 'Left Runner', 'Forward Attacker', 'Right Runner']

    if(players.length < positions.length) {
      console.log('Fewer players than positions. Good luck!')
      return 0
    }

    const numBlocks = 8

    let playerIndex = 0
    for (let i = 0; i < numBlocks; i++) {
      if(i == numBlocks/2) {
        console.log('\n----HALFTIME----')
      }
      console.log(`\nBlock ${i+1}`)

      // need to rotate position offset
      for (let positionIndex = 0; positionIndex < positions.length; positionIndex++) {
        const position = positions[positionIndex]
        const player = players[playerIndex]
        console.log(`${position}\t ${player}`)
        playerIndex++
        if(playerIndex == players.length) {playerIndex = 0}
      }

  }
}




}