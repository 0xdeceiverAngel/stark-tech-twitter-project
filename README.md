## Require
Create a twitter style api. Can use any stack, but must be deployable and of production quality.
Try using graphql or grpc for fun, but REST is ok too. (recommend graphql or swagger v2)

User Model: { id, name, followers, tweets }

Tweet Model: { id, title, content, user }

The API should have these features.

- write a tweet
- list tweets by user id
- list followers
- follow a user

Show how a production level project would look. (documentation, testing, error handling, etc ...)

Comment the project repo below when ready.


## Getting started 
open terminal,enter below command

`sudo docker build -t "nodev1" .`

`sudo docker run -itd -p 4000:4000 --rm nodev1`

then visit `127.0.0.1:4000`
### Api doc
#### Schema
```json
type user_model {
  id: ID
  name: String
  followers: [ID]
  tweets: [ID]
}

type tweet_model {
  id: ID!
  title: String
  content: String
  user: ID
}
type Query {
  list_all_user: [user_model]
  list_all_tweets: [tweet_model]
  list_followers(id: ID!): [tweet_model]
  list_tweet(id: ID!): [tweet_model]
  test: String
}

type Mutation {
  write_tweet(title: String!, content: String!, user: ID!): String
  follow_a_user(active_id: ID!, passive_id: ID!): String
}
```
## Query example
```graphql
query {
  list_all_user{
    id
    name
    followers
    tweets
  }

  list_all_tweets{
    id
    title
    content
    user
  }
  
  list_followers(id:0){
    id
    name
    followers
    tweets
  }

  list_tweet(id:0)
  {
    title
  }
}
```
## Mutation example
```graphql
mutation{
  write_tweet(title:"im ti",content:"im con",user:0)
  follow_a_user(active_id:2,passive_id:1)
  #user active_id want to follow user passive_id
}
```
or can see the doc in `127.0.0.1:4000` page
## Error handling
Error will be save to `errorlog.txt`
## Production level setting
- terminal set `export NODE_ENV=production`
- use nginx
- use nodemon to monitor restart
- etc....