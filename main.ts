const {
    ApolloServer,
    gql
} = require('apollo-server');
var arr: number[] = [];
let user_model_data = [{
        "id": 0,
        "name": "Alice",
        "followers": [1, 2],
        "tweets": [0]
    },
    {
        "id": 1,
        "name": "Bob",
        "followers":arr,
        "tweets": arr
    }
    , {
        "id": 2,
        "name": "Cindy",
        "followers": arr,
        "tweets": arr
    }
];
let tweet_model_data = [{
    "id": 0,
    "title": "hello",
    "content": "hello",
    "user": 1
}];
let current_tweet_len = 1;
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
        list_followers: (parent:any, args:any, context:any) => {
            const {
                id
            } = args;
            let res = user_model_data.filter(function(item) {
                if (item.id == id) {
                    return 'mark';
                }
            });
            return res[0].followers;
        },
        list_tweet: (parent:any, args:any, context:any) => {
            const {
                id
            } = args;
            let res = tweet_model_data.filter(function(item) {
                if (item.id == id) {
                    return 'mark';
                }
            });
            return res;
        },
        test: () => 'im test'

    },
    Mutation: {
        write_tweet: (parent:any, args:any, context:any) => {
            const {
                id,
                title,
                content,
                user
            } = args;
            
            tweet_model_data.push({
                id: current_tweet_len,
                title: title,
                content: content,
                user: parseInt(user, 10)
            });
            
            let res:any= user_model_data.filter(function(item) {
                return item.id == user;
            });
            res[0].tweets.push(current_tweet_len);
            current_tweet_len = current_tweet_len + 1;
            return 'ok';
        },
        follow_a_user: (parent:any, args:any, context:any) => {
            const {
                active_id,
                passive_id
            } = args;
            let res = user_model_data.filter(function(item) {
                    return item.id == passive_id;
            });
            let id= parseInt(active_id, 10);
            if (!res[0].followers.includes(id)) {
                res[0].followers = res[0].followers.concat(id);
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
    url=null
}) => {
    console.log(`? Server ready at ${url}`);
});