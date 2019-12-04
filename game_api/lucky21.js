module.exports = (context) => {
    let deckConstructor = context('deck');
    let deck = deckConstructor(context);
    
    let dealerConstructor = context('dealer');
    let dealer = dealerConstructor(context);
    
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
            if(game.state.card != undefined) {
                // Player has guessed over 21:
                return true;
            }
            else {
                // Player has guessed 21 or under:
                if(game.getTotal(game) >= 21) {
                    return true;
                }
            }

            return false;
        },
        // Has the player won (true or false).
        playerWon: (game) => {
            if(game.state.card != undefined) {
                // Player has guessed over 21:
                if(game.getTotal(game) > 21) {
                    return true;
                }
            }
            else {
                // Player has guessed 21 or under:
                if(game.getTotal(game) == 21) {
                    return true;
                }
            }

            return false;
        },
        // The highest score the cards can yield without going over 21 (integer).
        getCardsValue: (game) => {
            let total = 0;
            game.state.cards.forEach((element) => {
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
                total += newNumber;
            });

            return total;
        },
        // The value of the card that should exceed 21 if it exists (integer or undefined).
        getCardValue: (game) => {
            if(game.state.card == undefined) {
                return undefined;
            }
            else {
                let newNumber = parseInt(game.state.card);

                // This is not an ace
                if(newNumber != 1) {
                    if(newNumber > 10) {
                        newNumber = 10;
                    }
                }
                else {
                    // Set the ace to be an 11, if that goes over 21, we want it to be 1
                    newNumber = 11;
                    if((game.getCardsValue() + newNumber) > 21) {
                        newNumber = 1;
                    }
                }

                return newNumber;
            }
        },
        // The cards value + the card value if it exits (integer).
        getTotal: (game) => {
            let cardsValue = game.getCardsValue(game);
            let cardValue = game.getCardValue(game);

            if(cardValue != undefined) {
                return cardsValue + cardValue;
            }

            return cardsValue;
        },
        // The player's cards (array of strings).
        getCards: (game) => {
            return game.state.cards;
        },
        // The player's card (string or undefined).
        getCard: (game) => {
            return game.state.card;
        },
        // Player action (void).
        guess21OrUnder: (game) => {
            game.state.cards.push(game.state.dealer.draw(game.state.deck));
        },
        // Player action (void).
        guessOver21: (game) => {
            game.state.card = game.state.dealer.draw(game.state.deck);
        },
        getState: (game) => {
            return {
                cards: game.state.cards,
                cardsValue: game.getCardsValue(game),
                card: game.state.card,
                cardValue: game.getCardValue(game),
                total: game.getTotal(game),
                gameOver: game.isGameOver(game),
                playerWon: game.playerWon(game)
            };
        }
    };
};