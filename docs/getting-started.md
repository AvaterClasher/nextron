Let's create your first documentation site

## Create an account on Nextron

Visit https://nextron.netlify.app/signup and create a new account. This where you will manage all your documentation sites.

## Create a new site

After creating an account successfully, head over to https://nextron.netlify.app/new and create a new site.

<Callout type='info'>
	The details entered while creating a new site will also be used for SEO purposes. All these can be later changed in site dashboard too.
</Callout>

### Slug

Provide a unique slug for your site. Your docs site will be hosted at `https://nextron.netlify.app/<slug>/docs` (the homepage and blog will be at `https://nextron.netlify.app/<slug>` and `https://nextron.netlify.app/<slug>/blog` respectively).

### Repository link

Make sure the repository is correct and the the repo has a `docs` directory at the root level with markdown files in it.  
If it's a private repository, make sure you add a github token in the site settings in dashboard.

<Callout type='warning'>
	Make sure the the files in the '/docs' directory **have `.md`** extension and not '.mdx'.
</Callout>

## All Done!

And that's it!! Now you can just keep adding new markdown files in the `/docs` directory and Nextron will automatically update the website.
