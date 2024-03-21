Nextron basically just fetches the content from GitHub, adds styles, replaces jsx strings with React components and generates website

After setting up Nextron for the first time, you can just start adding markdown files in the `/docs` directory and Nextron will automatically update the website.

Nextron uses Next.js to render the website. The website keeps updating periodically with the help of Next.js <Tooltip content="Incremental Static Regeneration">ISR</Tooltip> feature. So you don't need to worry about the rebuilding stuff.

To render mdx, Nextron uses the [`mdx-bundler`](https://github.com/kentcdodds/mdx-bundler) from Kent C. Dodds.

The periodic regeneration regenerates the page very quickly because `mdx-bundler` uses esbuild under the hood to bundle mdx.