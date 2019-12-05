const dealerConstructor = require('./dealer.js');

// Initial state test.
test('a new game should have 50 cards left in the deck', () => {
    // Arrange
    const context = require('./context.js').newContext();

    // Act
    let game = context('lucky21')(context);

    // Assert
    expect(game.state.deck.length).toEqual(50);
});

// Initial state test.
test('a new game should have 2 drawn cards', () => {
    // Arrange
    const context = require('./context.js').newContext();

    // Act
    let game = context('lucky21')(context);

    // Assert
    expect(game.state.cards.length).toEqual(2);
});

// Card draw test.
test('guess21OrUnder should draw the next card', () => {
    // Arrange
    const context = require('./context.js').newContext();

    let deck = [
        '10H', '09S', '01D', '05C'
    ];

    let dealer = dealerConstructor(context);
    dealer.shuffle = (deck) => {};

    let dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Act
    let game = context('lucky21')((name) => dependencies[name]);
    game.guess21OrUnder(game);

    // Assert
    expect(game.state.cards.length).toEqual(3);
    expect(game.state.cards[2]).toEqual('09S');
});

// Card draw test
test('guessOver21 should draw the next card into our designated card slot', () => {
    // Arrange
    const context = require('./context.js').newContext();

    let deck = [
        '10H', '09S', '01D', '05C'
    ];

    let dealer = dealerConstructor(context);
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    let dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Act
    // Inject our dependencies
    let game = context('lucky21')((name) => dependencies[name]);
    game.guessOver21(game);

    // Assert
    expect(game.state.card).toEqual('09S');
});


// Card array test
test('getCardsValue should give us 15 total at the start of the game', () => {
    // Arrange
    const context = require('./context.js').newContext();

    let deck = [
        '10H', '04S', '05D', '13C'
    ];

    let dealer = dealerConstructor(context);
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    let dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Act
    // Inject our dependencies.
    let game = context('lucky21')((name) => dependencies[name]);
    let totalCardValue = game.getCardsValue(game);

    // Assert
    expect(totalCardValue).toEqual(15);
});

// Card draw and value test
test('getCardsValue should give us 19 after one draw', () => {
    // Arrange
    const context = require('./context.js').newContext();

    let deck = [
        '10H', '04S', '05D', '13C'
    ];

    let dealer = dealerConstructor(context);
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    let dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Act
    // Inject our dependencies.
    let game = context('lucky21')((name) => dependencies[name]);
    game.guess21OrUnder(game);
    let totalCardValue = game.getCardsValue(game);

    // Assert
    expect(totalCardValue).toEqual(19);
});

// Card type test
test('getCards should give us an array of strings with the length 2', () => {
    // Arrange
    const context = require('./context.js').newContext();

    let deck = [
        '10H', '04S', '08D', '07C'
    ];

    let dealer = dealerConstructor(context);
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    let dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Act
    // Inject our dependencies.
    let game = context('lucky21')((name) => dependencies[name]);
    let cardsArray = game.getCards(game);

    // Assert
    expect(cardsArray.length).toEqual(2);
    expect(cardsArray[0]).toEqual('07C');
});

// Card type and draw test
test('getCards should return an array of string with length 3 after drawing once', () => {
    // Arrange
    const context = require('./context.js').newContext();

    let deck = [
        '10H', '04S', '08D', '07C'
    ];

    let dealer = dealerConstructor(context);
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    let dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Act
    // Inject our dependencies.
    let game = context('lucky21')((name) => dependencies[name]);
    game.guess21OrUnder(game);
    let cardsArray = game.getCards(game);

    // Assert
    expect(cardsArray.length).toEqual(3);
    expect(cardsArray[0]).toEqual('07C');
});

// Card object test
test('getCardValue should be undefined at the start of the game', () => {
    // Arrange
    const context = require('./context.js').newContext();

    let deck = [
        '10H', '09S', '01D', '05C'
    ];

    let dealer = dealerConstructor(context);
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    let dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Act
    // Inject our dependencies.
    let game = context('lucky21')((name) => dependencies[name]);
    let cardValue = game.getCardValue(game);

    // Assert
    expect(cardValue).toEqual(undefined);
});

// Card object and draw test
test('getCardValue should be 9 after the first guess being over 21', () => {
    // Arrange
    const context = require('./context.js').newContext();

    let deck = [
        '10H', '09S', '01D', '05C'
    ];

    let dealer = dealerConstructor(context);
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    let dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Act
    // Inject our dependencies.
    let game = context('lucky21')((name) => dependencies[name]);
    game.guessOver21(game);
    let cardValue = game.getCardValue(game);

    // Assert
    expect(cardValue).toEqual(9);
});

// Score test
test('getTotal should give us 13 total at the start of the game', () => {
    // Arrange
    const context = require('./context.js').newContext();
    
    let deck = [
        '10H', '08S', '08D', '05C'
    ];

    let dealer = dealerConstructor(context);
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    let dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Act
    // Inject our dependencies.
    let game = context('lucky21')((name) => dependencies[name]);
    let totalValue = game.getTotal(game);

    // Assert
    expect(totalValue).toEqual(13);
});


// Score and draw test
test('getTotal should give us 20 in total after the first draw', () => {
    // Arrange
    const context = require('./context.js').newContext();

    let deck = [
        '10H', '08S', '08D', '05C'
    ];

    let dealer = dealerConstructor(context);
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    let dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Act
    // Inject our dependencies.
    let game = context('lucky21')((name) => dependencies[name]);
    game.guess21OrUnder(game);
    let totalValue = game.getTotal(game);

    // Assert
    expect(totalValue).toEqual(21);
});

// Card object value test
test('getCard should give us undefined at the start of the game', () => {
    // Arrange
    const context = require('./context.js').newContext();
    
    let deck = [
        '10H', '08S', '08D', '05C'
    ];

    let dealer = dealerConstructor(context);
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    let dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Act
    // Inject our dependencies.
    let game = context('lucky21')((name) => dependencies[name]);
    let card = game.getCard(game);

    // Assert
    expect(card).toEqual(undefined);
});

// Card object value and type test
test('getCard should give us the string 08S after guessing over 21 in the first draw', () => {
    // Arrange
    const context = require('./context.js').newContext();
    
    let deck = [
        '10H', '08S', '08D', '05C'
    ];

    let dealer = dealerConstructor(context);
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    let dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Act
    // Inject our dependencies.
    let game = context('lucky21')((name) => dependencies[name]);
    game.guessOver21(game);
    let card = game.getCard(game);

    // Assert
    expect(card).toEqual('08S');
});

// Game state test
test('isGameOver should give us false at the start of the game', () => {
    // Arrange
    const context = require('./context.js').newContext();
    
    let deck = [
        '10H', '08S', '08D', '05C'
    ];

    let dealer = dealerConstructor(context);
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    let dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Act
    // Inject our dependencies.
    let game = context('lucky21')((name) => dependencies[name]);
    let isOver = game.isGameOver(game);

    // Assert
    expect(isOver).toEqual(false);
});

// Game state test
test('isGameOver should give us true if we keep guessing 21 or under', () => {
    // Arrange
    const context = require('./context.js').newContext();

    let deck = [
        '10H', '08S', '08D', '05C'
    ];

    let dealer = dealerConstructor(context);
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    let dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Act
    // Inject our dependencies.
    let game = context('lucky21')((name) => dependencies[name]);
    game.guess21OrUnder(game);
    let isOver = game.isGameOver(game);

    // Assert
    expect(isOver).toEqual(true);
});

// Game state test
test('isGameOver should give us true if we guess over 21', () => {
    // Arrange
    const context = require('./context.js').newContext();

    let deck = [
        '10H', '08S', '10D', '10C'
    ];

    let dealer = dealerConstructor(context);
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    let dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Act
    // Inject our dependencies.
    let game = context('lucky21')((name) => dependencies[name]);
    game.guessOver21(game);
    let isOver = game.isGameOver(game);

    // Assert
    expect(isOver).toEqual(true);
});

// Win condition test
test('playerHasWon should give us false first', () => {
    // Arrange
    const context = require('./context.js').newContext();

    let deck = [
        '10H', '06S', '10D', '05C'
    ];

    let dealer = dealerConstructor(context);
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    let dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Act
    // Inject our dependencies.
    let game = context('lucky21')((name) => dependencies[name]);
    let hasWon = game.playerWon(game);

    // Assert
    expect(hasWon).toEqual(false);
});

// Win condition test
test('playerHasWon should give us true after guessing 21 or under once', () => {
    // Arrange
    const context = require('./context.js').newContext();

    let deck = [
        '10H', '06S', '10D', '05C'
    ];

    let dealer = dealerConstructor(context);
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    let dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Act
    // Inject our dependencies.
    let game = context('lucky21')((name) => dependencies[name]);
    game.guess21OrUnder(game);
    let hasWon = game.playerWon(game);

    // Assert
    expect(hasWon).toEqual(true);
});

// Win condition test
test('playerHasWon should give us false even after guessing 21 or under once and the game is not over', () => {
    // Arrange
    const context = require('./context.js').newContext();

    let deck = [
        '10H', '02S', '10D', '05C'
    ];

    let dealer = dealerConstructor(context);
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    let dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Act
    // Inject our dependencies.
    let game = context('lucky21')((name) => dependencies[name]);
    game.guess21OrUnder(game);
    let hasWon = game.playerWon(game);
    let isOver = game.isGameOver(game);

    // Assert
    expect(hasWon).toEqual(false);
    expect(isOver).toEqual(false);
});

// Win condition test
test('playerHasWon should give us true even after guessing 21 or under once and the game should be over', () => {
    // Arrange
    const context = require('./context.js').newContext();
    
    let deck = [
        '10H', '06S', '10D', '05C'
    ];

    let dealer = dealerConstructor(context);
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    let dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Act
    // Inject our dependencies.
    let game = context('lucky21')((name) => dependencies[name]);
    game.guess21OrUnder(game);
    let hasWon = game.playerWon(game);
    let isOver = game.isGameOver(game);

    // Assert
    expect(hasWon).toEqual(true);
    expect(isOver).toEqual(true);
});

// Win condition test
test('guessOver21 should draw the next card, game ends, player didnt win', () => {
    // Arrange
    const context = require('./context.js').newContext();

    let deck = [
        '10H', '03S', '01D', '05C'
    ];

    let dealer = dealerConstructor(context);
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    let dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Act
    // Inject our dependencies
    let game = context('lucky21')((name) => dependencies[name]);
    game.guessOver21(game);

    // Assert
    expect(game.state.card).toEqual('03S');
    expect(game.isGameOver(game)).toEqual(true);
    expect(game.getTotal(game)).toEqual(19);
    expect(game.playerWon(game)).toEqual(false);
});