FROM node:14
WORKDIR /stark-tech-twitter-project
ADD . .
RUN ["npm","install"]
RUN ["npm","list","--depth=0"]
RUN ["npx","tsc","main.ts"]
RUN ["export","NODE_ENV=production"]
EXPOSE 4000
CMD ["nodemon","main.js"]