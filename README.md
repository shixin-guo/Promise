Start right now at [nextjs.org/commerce](https://nextjs.org/commerce)

## Contribute

2. Create a new branch `git checkout -b MY_BRANCH_NAME`
3. Install the dependencies: `yarn`
4. Duplicate `site/.env.template` and rename it to `site/.env.local`
5. Add proper store values to `site/.env.local`
6. start local etherum node `yarn start:node`
7. open another terminal and deplop contract `yarn dev:deploy`
8. start local UI project

## Work in progress

## Q&A

### how to kill a port

lsof -n -i4TCP:8545
kill -9 54486

### What happens when a transaction nonce is too high?

if you're using hardhat + metamask, and seeing this after restarting the node, try resetting your account on metamask: Settings > Advanced > Reset Account.
