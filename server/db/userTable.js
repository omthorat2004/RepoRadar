const connection = require('./pool')

const createUserTable = () => {
  connection.query(
    'create table if not exists gitlab_user(id int primary key auto_increment,username varchar(255) not null unique,email varchar(255) not null unique,password varchar(255) not null,avatar_url varchar(255),gitlab_username varchar(255),gitlab_profile_url varchar(255),personal_access_token varchar(255) not null)'
  )
}

module.exports = createUserTable
