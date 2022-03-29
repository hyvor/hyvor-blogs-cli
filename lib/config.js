import 'dotenv/config';
console.log(process.env.DOMAIN)

const config = {

    domain: (process.env.DOMAIN || 'https://blogs.hyvor.com'),
    cliApiPath: (path) => config.domain + "/api/cli" + path,

    folders: ['templates', 'lang', 'styles', 'assets'],

    defaultFiles: [
        'templates/index.twig',
        'templates/post.twig',
        'lang/en.yaml',
        'styles/index.scss'
    ],

}

export default config;