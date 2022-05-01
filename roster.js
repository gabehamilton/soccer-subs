const players = [
  'Player 1',
  'Player 2',
  'Player 3',
  'Player 4',
  'Player 5',
  'Player 6',
  'Player 7',
  'Player 8',
  'Player 9',
  'Player 10'
]

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
    console.log(`${position}: ${player}`)
    playerIndex++
    if(playerIndex == players.length) {playerIndex = 0}
  }

}