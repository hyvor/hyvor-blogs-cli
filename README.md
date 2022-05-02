# Hyvor Blogs CLI

This is a tool for developing Hyvor Blogs themes. See [Theme Development Documentation](https://blogs.hyvor.com/docs/themes-overview) to learn about developing themes.

## Usage

0. If you don't have Node.js/npm, [install it](https://nodejs.org/en/) first.
1. Install this CLI tool globally in your computer using NPM

```bash
npm install -g hyvor-blogs-cli
```

2. Create a new folder for your theme.

```bash
mkdir my-theme
```

3. `cd` and run this tool there.

```bash
cd my-theme
hyvor-blogs-cli
```

This will create all required folders and files of your theme for you to start and will also start a local server, which allows you to test your theme.

4. Visit `127.0.0.1:8855` to test the theme.

## How it works

This tool does two things. First, it syncs your local files with our production system using the `uuid` in `.hb.cli.json`. Then, it works as a local server (at port `8855`). This server DOES NOT render content. It sends requests to our production server to render content and it just serves them (kind of like a proxy). It makes sure that your theme will work exactly same locally and in production. And, yes, because of that, you will need an active internet connection to develop the theme.

If you are interested in how this proxy thing works, see our [delivery API](https://blogs.hyvor.com/docs/api-delivery).

Data of the blog is from our demo blog (demo.hyvorblogs.io). It has a several posts, pages, tags, and authors. It has the default [routes](https://blogs.hyvor.com/docs/routes). Using a custom blog as a data source is currently not supported. If you would like that feature, please create an issue.

## Using GIT

If you are using GIT, make sure to add `.hb.cli.json` to .gitignore.