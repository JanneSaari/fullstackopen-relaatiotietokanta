CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes integer DEFAULT 0);
INSERT INTO blogs (author, url, title) values ('TestAuthor Name', 'example.com/test', 'TestTitle'); 
INSERT INTO blogs (author, url, title) values ('Some Author', 'example.com/test2', 'SomeTitle');