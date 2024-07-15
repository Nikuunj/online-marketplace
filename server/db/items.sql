CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  avg_rating DECIMAL(3, 2) DEFAULT NULL,
  total_sales INT DEFAULT NULL,
  details TEXT NOT NULL,
  image_data LONGBLOB NOT NULL,
  company VARCHAR(255) NOT NULL
);