import 'dotenv/config';

const config = {

    domain: (process.env.DOMAIN || 'https://blogs.hyvor.com'),
    cliApiPath: (path) => config.domain + "/api/cli/" + process.env.SUBDOMAIN + path,

    folders: ['templates', 'lang', 'styles', 'assets'],

    defaultFiles: [
        'templates/@base.twig',
        'templates/index.twig',
        'templates/post.twig',
        'templates/tag.twig',
        'templates/author.twig',
        'lang/en.yaml',
        'styles/index.scss',
        'config.yaml',
        'config.def.yaml',
    ],

}

export default config;