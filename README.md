Start right now at [nextjs.org/commerce](https://nextjs.org/commerce)

## Contribute

2. Create a new branch `git checkout -b MY_BRANCH_NAME`
3. Install the dependencies: `yarn`
4. Duplicate `site/.env.template` and rename it to `site/.env.local`
5. Add proper store values to `site/.env.local`
6. Run `cd site` and `yarn dev` to build and watch for code changes
7. Run `yarn turbo run build` to check the build after your changes

## Work in progress

lsof -n -i4TCP:8545
kill -9 54486

What happens when a transaction nonce is too high?

if you're using hardhat + metamask, and seeing this after restarting the node, try resetting your account on metamask: Settings > Advanced > Reset Account.
