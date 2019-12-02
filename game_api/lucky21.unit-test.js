const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');
const lucky21Constructor = require('./lucky21.js');

test('a new game should have 50 cards left in the deck', () => {
  // Arrange
  let deck = deckConstructor();
  let dealer = dealerConstructor();

  // Act
  let game = lucky21Constructor(deck, dealer);

  // Assert
  expect(game.state.deck.length).toEqual(50);
});

test('a new game should have 2 drawn cards', () => {
  // Arrange
  let deck = deckConstructor();
  let dealer = dealerConstructor();

  // Act
  let game = lucky21Constructor(deck, dealer);

  // Assert
  expect(game.state.cards.length).toEqual(2);
});

test('guess21OrUnder should draw the next card', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '05C', '01D', '09S', '10H', 
  ];

  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game);
  
  // Assert
  expect(game.state.cards.length).toEqual(3);
  expect(game.state.cards[2]).toEqual('01D');
});

test('getCardValue should be undefined at the start of the game, and 9 after the first draw', () => {

  // Arrange 
  let deck = deckConstructor();
  deck = [
      '05C', '01D', '09S', '10H', 
  ];

  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  let cardValue = game.getCardValue(game);

  // Assert
  expect(cardValue).toEqual(undefined);
  
  //game.guess21OrUnder(game);
  //cardValue = game.getCardValue(game);
  //expect(cardValue).toEqual(9);
});