// CREATE TABLE Categories (
//     id VARCHAR(255) PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     is_top_level BIT NOT NULL DEFAULT 0,
    
//     CHECK (name <> ''),
//     CHECK (is_top_level IN (0,1)),
// );


// create a category model class to be used as a type for the category

class CategoryModel {
    id: string;
    name: string;
    is_top_level: string;
    
    constructor(id: string, name: string, is_top_level: string) {
        this.id = id;
        this.name = name;
        this.is_top_level = is_top_level;
    }
    }

export default CategoryModel;