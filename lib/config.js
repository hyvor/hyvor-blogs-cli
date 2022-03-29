
console.log(process.env.DOMAIN)
const config = {

    domain: 'https://' + (process.env.DOMAIN || 'blogs.hyvor.com'),
    cliApiPath: (path) => config.domain + "/api/cli/new" + path,

    folders: ['templates', 'lang', 'styles', 'assets'],

    defaultFiles: [
        'templates/index.twig',
        'templates/post.twig',
        'lang/en.yaml',
        'styles/index.scss'
    ],

}

export default config;