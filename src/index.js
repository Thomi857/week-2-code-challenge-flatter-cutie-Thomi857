// Your code here
fetch('http://localhost:3000/characters')
  .then(response => response.json())
  .then(characters => {
    characters.forEach(character => {
      let span = document.createElement('span');
      span.textContent = character.name;
      document.querySelector('#character-bar').appendChild(span);

      span.addEventListener('click', () => {
        let img = document.getElementById('image');
        img.src = character.image;

        document.getElementById('votes-form').dataset.characterId = character.id;

        let voteCountElement = document.getElementById('vote-count');
        voteCountElement.textContent = character.votes;

        document.getElementById('votes').value = 0;
      });
    });
  })
  .catch(error => console.error('Error fetching characters:', error));

document.getElementById('votes-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const characterId = this.dataset.characterId;

  if (characterId) {
    const currentVotes = parseInt(document.getElementById('vote-count').textContent);
    const newVotes = parseInt(document.getElementById('votes').value);
    const updatedVotes = currentVotes + newVotes;

    document.getElementById('vote-count').textContent = updatedVotes;

    this.reset();

    fetch(`http://localhost:3000/characters/${characterId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ votes: updatedVotes }),
    })
    .then(response => response.json())
    .catch(error => console.error('Error updating votes:', error));
  }
});

const resetButton = document.getElementById('reset-btn');

if (resetButton) {
  resetButton.addEventListener('click', () => {
    const characterId = document.getElementById('votes-form').dataset.characterId;

    if (characterId) {
      document.getElementById('vote-count').textContent = 0;

      fetch(`http://localhost:3000/characters/${characterId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ votes: 0 }),
      })
      .then(response => response.json())
      .catch(error => console.error('Error resetting votes:', error));
      
    }
  });
}






