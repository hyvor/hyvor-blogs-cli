# Hyvor Blogs CLI

This is a tool for developing Hyvor Blogs themes. See [Theme Development Documentation](https://blogs.hyvor.com/docs/themes-overview) to learn about developing themes.

## Usage

0. If you don't have Node.js/npm, [install it](https://nodejs.org/en/) first.
1. Install this CLI tool globally in your computer using NPM

```bash
npm install -g hyvor-blog-cli
```

2. Create a new folder for your theme.

```bash
hyvor-blogs-cli
```

This will create all required folders and files of your theme for you to start and will also start a local server, which allows you to test your theme.

3. Visit `127.0.0.1:8855` to test the theme.

Make sure to add `.hb.cli.json` to .gitignore.

## How it works

This tool does two things. First, it syncs your local files with our production system using the `uuid` in `.hb.cli.json`. Then, it works as a local server (at port `8855`). This server DOES NOT render content. It sends requests to our production server to render content and it just serves them. It makes sure that your theme will work exactly same locally and in production. And, yes, because of that, you will need an active internet connection to develop the theme.