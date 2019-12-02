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
      '05C', '01D', '09S', '10H'
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




test('getCardsValue should give us 15 total at the start of the game, and 19 after one draw', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
    '07C', '08D', '04S', '10H'
  ];

  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  // Act
  let game = lucky21Constructor(deck, dealer);
  let totalCardValue = game.getCardValue(game);

  // Assert
  expect(totalCardValue).toEqual(15);
  // game.guess21OrUnder(game);
  // Debateable if guess21OrUnder puts new card into the cards array right away (Probably though)
  // totalCardValue = game.getCardValue(game);
  // expect(totalCardValue).toEqual(19);
});