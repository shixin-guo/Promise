Start right now at [nextjs.org/commerce](https://nextjs.org/commerce)

## Contribute

Our commitment to Open Source can be found [here](https://github.com/shixin-guo/gallery/issues).

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
2. Create a new branch `git checkout -b MY_BRANCH_NAME`
3. Install the dependencies: `yarn`
4. Duplicate `site/.env.template` and rename it to `site/.env.local`
5. Add proper store values to `site/.env.local`
6. Run `cd site` and `yarn dev` to build and watch for code changes
7. Run `yarn turbo run build` to check the build after your changes

## Work in progress

We're using Github Projects to keep track of issues in progress and todo's. Here is our [Board](https://github.com/users/shixin-guo/projects/1)

lsof -n -i4TCP:8545
kill -9 54486

What happens when a transaction nonce is too high?

if you're using hardhat + metamask, and seeing this after restarting the node, try resetting your account on metamask: Settings > Advanced > Reset Account.
