const {
    ApolloServer,
    gql
} = require('apollo-server');
var fs = require('fs');

// 1. 在假資料中補充朋友資訊
var user_model_data = [{
        "id": 0,
        "name": "Alice",
        "followers": [1, 2],
        "tweeets": [0]
    },
    {
        "id": 1,
        "name": "Bob",
        "followers": [],
        "user": []
    }, {
        "id": 2,
        "name": "Cindy",
        "followers": [],
        "user": []
    }
];
var tweet_model_data = [{
    "id": 0,
    "title": "hello",
    "content": "hello",
    "user": 1
}];
var current_tweet_len = 1;
// var jsonData = JSON.stringify(users);
// fs.writeFile("test.txt", jsonData, function(err) {
//     if (err) {
//         console.log(err);
//     }
// });
// The GraphQL schema
// 2. 在 Schema 添加新 fields
const typeDefs = gql `
  """
  使用者
  """

  type user_model {
    id: ID
    name: String
    followers: [ID]
    tweets: [ID]
  }
  type tweet_model{
      id: ID!
      title: String
      content: String
      user: ID
  }
  type Query {
    list_all_user: [user_model] 
    list_all_tweet: [tweet_model]
    list_followers(id: ID!): [ID]
    list_tweet(id:ID!):[tweet_model]
    test:String
  }
  type Mutation{
    write_tweet(title:String!,content:String!,user:ID!):String
    follow_a_user(active_id: ID!, passive_id: ID!): String
    }
`;
const resolvers = {
    Query: {
        list_all_user: () => user_model_data,
        list_all_tweet: () => tweet_model_data,
        list_followers: (parent, args, context) => {
            const {
                id
            } = args;
            var res = user_model_data.filter(function(item) {
                if (item.id == id) {
                    return 'mark';
                }
            });
            return res[0].followers;
        },
        list_tweet: (parent, args, context) => {
            const {
                id
            } = args;
            var res = tweet_model_data.filter(function(item) {
                if (item.id == id) {
                    return 'mark';
                }
            });
            return res;
        },
        test: () => 'im test'

    },
    Mutation: {
        write_tweet: (root, args, context) => {
            const {
                id,
                title,
                content,
                user
            } = args;
            // console.log(args);
            tweet_model_data.push({
                id: current_tweet_len,
                title: title,
                content: content,
                user: parseInt(user, 10)
            });
            // console.log(tweet_model_data);
            var res = user_model_data.filter(function(item) {
                if (item.id == user) {
                    return 'mark';
                }
            });
            res[0].tweeets.push(parseInt(id, 10));
            current_tweet_len = current_tweet_len + 1;

            return 'ok';
        },
        follow_a_user: (root, args, context) => {
            const {
                active_id,
                passive_id
            } = args;
            var res = user_model_data.filter(function(item) {
                if (item.id == passive_id) {
                    return 'mark';
                }
            });
            // console.log(res);
            id = parseInt(active_id, 10)
            if (!res[0].followers.includes(id)) {
                res[0].followers.push(id);

            }
            return 'ok';
        },
    }

};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({
    url
}) => {
    console.log(`? Server ready at ${url}`);
});