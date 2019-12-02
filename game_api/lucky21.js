// We are exporitng game which has set deck and dealer (injected)
module.exports = (deck, dealer) => {
    dealer.shuffle(deck);
    let card0 = dealer.draw(deck);
    let card1 = dealer.draw(deck);
    let state = {
        deck: deck,
        dealer: dealer,
        cards: [
            card0,
            card1,
        ],
        // The card that the player thinks will exceed 21.
        card: undefined,
    };
    return {
        state: state,
        // Is the game over (true or false).
        // Is the game finished.
        isGameOver: (game) => {
            // TODO
        },
        // Has the player won (true or false).
        playerWon: (game) => {
            // TODO
        },
        // The highest score the cards can yield without going over 21 (integer).
        getCardsValue: (game) => {
            let total = 0;
            game.state.cards.forEach(element => {
                let newNumber = parseInt(element);
                
                // This is not an ace
                if(newNumber != 1) {
                    if(newNumber > 10) {
                        newNumber = 10;
                    }
                }
                else {
                    // Set the ace to be an 11, if that goes over 21, we want it to be 1
                    newNumber = 11;
                    if((total + newNumber) > 21) {
                        newNumber = 1;
                    }
                }

                // Add the number to the total
                console.log(newNumber);
                total += newNumber;
            });

            return total;
        },
        // The value of the card that should exceed 21 if it exists (integer or undefined).
        getCardValue: (game) => {
            // TODO
        },
        // The cards value + the card value if it exits (integer).
        getTotal: (game) => {
            // TODO
        },
        // The player's cards (array of strings).
        getCards: (game) => {
            // TODO
        },
        // The player's card (string or undefined).
        getCard: (game) => {
            // TODO
        },
        // Player action (void).
        guess21OrUnder: (game) => {
            // TODO
        },
        // Player action (void).
        guessOver21: (game) => {
            // TODO
        },
    };
};