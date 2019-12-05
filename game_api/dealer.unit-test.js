function newRandom(randomReturnValues) {
    let i = 0;
    return {
        randomInt: (min, max) => {
            return randomReturnValues[i++];
        }
    };
}

// Shuffle test
test('dealer should not shuffle cards', () => {
    // Arrange
    let dependencies = {
        'random': () => newRandom([2, 1]),
    };
    let newDealer = require('./dealer.js');
    let dealer = newDealer((name) => {
        return dependencies[name];
    });
    let deck = ['a', 'b', 'c'];
    dealer.shuffle = (deck) => {};

    // Act
    dealer.shuffle(deck);

    // Assert
    expect(deck).toEqual(['a', 'b', 'c']);
});

// Shuffle test
test('dealer should shuffle cards in a non-random way', () => {
    // Arrange
    let dependencies = {
        'random': () => newRandom([2, 1]),
    };
    let newDealer = require('./dealer.js');
    let dealer = newDealer((name) => {
        return dependencies[name];
    });
    let deck = ['a', 'b', 'c'];

    // Act
    dealer.shuffle(deck);

    // Assert
    expect(deck).toEqual(['c', 'b', 'a']);
});

// Draw test
test('dealer should return expected card after drawing', () => {
    // Arrange
    let dependencies = {
        'random': () => newRandom([2, 1]),
    };
    let newDealer = require('./dealer.js');
    let dealer = newDealer((name) => {
        return dependencies[name];
    });
    let deck = ['a', 'b', 'c'];

    // Act
    dealer.shuffle(deck);
    let card = dealer.draw(deck);

    // Assert
    expect(card).toEqual('a');
});

// Draw test
test('dealer should return expected order of cards and be empty after 3 draws', () => {
    // Arrange
    let dependencies = {
        'random': () => newRandom([2, 1]),
    };
    let newDealer = require('./dealer.js');
    let dealer = newDealer((name) => {
        return dependencies[name];
    });
    let deck = ['a', 'b', 'c'];

    // Act
    dealer.shuffle(deck);
    let card01 = dealer.draw(deck);
    let card02 = dealer.draw(deck);
    let card03 = dealer.draw(deck);

    // Assert
    expect(card01).toEqual('a');
    expect(card02).toEqual('b');
    expect(card03).toEqual('c');
    expect(deck).toEqual([]);
});