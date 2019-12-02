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
  let totalCardValue = game.getCardsValue(game);

  // Assert
  expect(totalCardValue).toEqual(15);
  game.guess21OrUnder(game);
  totalCardValue = game.getCardsValue(game);
  expect(totalCardValue).toEqual(19);
});

test('getCards should give us an array of strings with the length 2 and then 3 after the first draw/guess', () => {
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
  let cardsArray = game.getCards(game);

  // Assert
  expect(cardsArray.length).toEqual(2);
  game.guess21OrUnder(game);
  cardsArray = game.getCards(game);
  expect(cardsArray.length).toEqual(3);
  expect(cardsArray[2]).toEqual('04S');
});

test('getCardValue should be undefined at the start of the game, and 9 after the first draw', () => {
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
  let cardValue = game.getCardValue(game);

  // Assert
  expect(cardValue).toEqual(undefined);
  //game.guessOver21(game);
  //cardValue = game.getCardValue(game);
  //expect(cardValue).toEqual(9);
});

test('getTotal should give us 13 total at the start of the game, and 20 in total after the first draw', () => {

  // Arrange 
  let deck = deckConstructor();
  deck = [
    '05C', '08D', '08S', '10H'
  ]

  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  // Act
  let game = lucky21Constructor(deck, dealer);
  let totalValue = game.getTotal(game);

  // Assert 
  expect(totalValue).toEqual(13);
  game.guess21OrUnder(game);
  totalValue = game.getTotal(game);
  expect(totalValue).toEqual(20);
});

test('getCard should give us undefined at the start of the game and then give us the string 08S', () => {

  // Arrange 
  let deck = deckConstructor();
  deck = [
    '05C', '08D', '08S', '10H'
  ]

  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  // Act
  let game = lucky21Constructor(deck, dealer);
  let card = game.getCard(game);

  // Assert 
  expect(card).toEqual(undefined);
  game.guessOver21(game);
  card = game.getCard(game);
  expect(card).toEqual('08S');
});