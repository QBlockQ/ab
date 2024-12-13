CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    token_id VARCHAR NOT NULL,
    address TEXT NOT NULL,
    owner_address VARCHAR NOT NULL,
    property_details JSONB,
    verification_status VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE property_transactions (
    id SERIAL PRIMARY KEY,
    property_id INTEGER REFERENCES properties(id),
    from_address VARCHAR,
    to_address VARCHAR,
    transaction_hash VARCHAR,
    price NUMERIC,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 