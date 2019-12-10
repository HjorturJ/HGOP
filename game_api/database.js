module.exports = function(context) {
    const Client = context('pgClient');
    const configConstructor = context('config');
    const config = configConstructor(context);

    function getClient() {
        return new Client({
            host: config.pgHost,
            user: config.pgUser,
            password: config.pgPassword,
            database: config.pgDatabase,
        });
    }

    return {
        insertResult: (won, score, total, onSuccess, onError) => {
            let client = getClient();
            client.connect((err) => {
                if (err) {
                    onError(err);
                    client.end();
                } else {
                    const query = {
                        text: 'INSERT INTO GameResult(Won, Score, Total, InsertDate) VALUES($1, $2, $3, CURRENT_TIMESTAMP);',
                        values: [won, score, total],
                    };
                    client.query(query, (err) => {
                        if (err) {
                            onError(err);
                        } else {
                            onSuccess();
                        }
                        client.end();
                    });
                }
            });
            return;
        },
        // Should call onSuccess with integer.
        getTotalNumberOfGames: (onSuccess, onError) => {
            let client = getClient();
            client.connect((err) => {
                if (err) {
                    onError(err);
                    client.end();
                } else {
                    const query = {
                        text: 'SELECT COUNT(*) FROM GameResult;'
                    };
                    client.query(query, (err, res) => {
                        if (err) {
                            onError(err);
                        } else {
                            onSuccess(parseInt(res.rows[0].count));
                        }
                        client.end();
                    });
                }
            });
            return;
        },
        // Should call onSuccess with integer.
        getTotalNumberOfWins: (onSuccess, onError) => {
            let client = getClient();
            client.connect((err) => {
                if (err) {
                    onError(err);
                    client.end();
                } else {
                    const query = {
                        text: 'SELECT COUNT(*) FROM GameResult WHERE Won = true;'
                    };
                    client.query(query, (err, res) => {
                        if (err) {
                            onError(err);
                        } else {
                            onSuccess(parseInt(res.rows[0].count));
                        }
                        client.end();
                    });
                }
            });
            return;
        },
        // Should call onSuccess with integer.
        getTotalNumberOf21: (onSuccess, onError) => {
            let client = getClient();
            client.connect((err) => {
                if (err) {
                    onError(err);
                    client.end();
                } else {
                    const query = {
                        text: 'SELECT COUNT(*) FROM GameResult WHERE Score = 21;'
                    };
                    client.query(query, (err, res) => {
                        if (err) {
                            onError(err);
                        } else {
                            onSuccess(parseInt(res.rows[0].count));
                        }
                        client.end();
                    });
                }
            });
            return;
        },
    };
};