CREATE TABLE IF NOT EXISTS 

    authors (

        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,

        name VARCHAR(50) NOT NULL,

        lastname VARCHAR(50) NOT NULL,

        username VARCHAR(50) NOT NULL,

        email VARCHAR(50) NOT NULL

    );

CREATE TABLE IF NOT EXISTS 
    
    categories (

        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,

        name VARCHAR(150) NOT NULL
    
    );


CREATE TABLE IF NOT EXISTS 

    articles (

        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,

        headLine VARCHAR(50) NOT NULL,

        subHead VARCHAR(50),

        content VARCHAR(2000) NOT NULL,

        category VARCHAR(150) NOT NULL,

        cover VARCHAR(500),
        
        authorId INTEGER NOT NULL,

        categoryId INTEGER NOT NULL,
        
        FOREIGN KEY (authorId) REFERENCES authors,

        FOREIGN KEY (categoryId) REFERENCES categories
    );


CREATE TABLE IF NOT EXISTS 
    
    reviews (

        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,

        text VARCHAR(150) NOT NULL,
        rate INTEGER NOT NULL,
        
        articleId INTEGER NOT NULL,

        FOREIGN KEY (articleId) REFERENCES articles
    
    );
