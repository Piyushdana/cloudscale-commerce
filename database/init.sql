-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    image_url TEXT,
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create cart table
CREATE TABLE IF NOT EXISTS cart (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed products data
INSERT INTO products (name, description, price, category, image_url, stock) VALUES
(
    'Mechanical Keyboard',
    'Tactile mechanical keyboard with RGB backlighting and Cherry MX switches',
    129.99,
    'Electronics',
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    50
),
(
    'Wireless Mouse',
    'Ergonomic wireless mouse with 12 month battery life and silent clicks',
    49.99,
    'Electronics',
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    75
),
(
    'USB-C Hub',
    '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader and PD charging',
    39.99,
    'Electronics',
    'https://images.unsplash.com/photo-1625895197185-efcec01cffe0?w=500',
    100
),
(
    'Monitor Stand',
    'Adjustable aluminum monitor stand with storage drawer underneath',
    59.99,
    'Desk Setup',
    'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500',
    30
),
(
    'Desk Lamp',
    'LED desk lamp with wireless charging base and adjustable color temperature',
    79.99,
    'Desk Setup',
    'https://images.unsplash.com/photo-1534189076567-a735703b793c?w=500',
    45
),
(
    'Webcam 4K',
    '4K webcam with built-in ring light and noise cancelling microphone',
    99.99,
    'Electronics',
    'https://images.unsplash.com/photo-1596742578443-7682ef5251cd?w=500',
    60
),
(
    'Cable Management Kit',
    'Complete cable management solution with clips, sleeves and velcro ties',
    19.99,
    'Desk Setup',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    200
),
(
    'Laptop Stand',
    'Portable aluminum laptop stand with foldable design and heat dissipation',
    34.99,
    'Desk Setup',
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
    80
);