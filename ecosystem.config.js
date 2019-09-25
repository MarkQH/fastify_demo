module.exports = {
  apps : [{ // 一组应用的配置
    name: 'server',
    script: 'app.js',
    wait_ready: true, // 如果为true，进程会等待process.send（'ready'）的ready事件
    args: 'one two', // 传递给脚本的参数 - Array, String
    instances: 1,
    autorestart: false, // 进程失败后启用或禁用自重启
    watch: true, // 启用或禁用观察模式 - Boolean,Array,String
    ignore_watch: ['./node_modules', './package.json', './yarn.lock', './accessToken.txt', './.gitignore', './logs'], // 要忽略的路径列表（正则表达式） - Array,String
    watch_options: {
      usePolling: true
    },  // 用作chokidar选项的对象（请参阅chokidar文档） - Object
    max_memory_restart: '1G', // 如果进程内存超出这个指定的最大内存，会重新启动应用
    env: { // 要注入的环境变量
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    // node_args: 'xxxx', // 传给解释器的参数 - Array, String
    output: './logs/output.log', // stdout的文件路径（输出的行会追加到文件中） -String
    error: './logs/error.log', // stderr的文件路径（输出的行会追加到文件中） -String
    // log_type: '', // 指定日志输出类型,可能的值为：json	 - String
    log_date_format: 'YYYY-MM-DD HH:mm:ss', // 日志时间戳的格式，采用moment.js格式（例如YYYY-MM-DD HH：mm Z） - String
    // restart_delay: '', // 在重启崩溃应用的延迟时间，单位毫秒 - Number
    // max_restarts: '', // 最大重启次数 - Number
    // exec_mode: '', // 执行模式 可能的值为：fork|cluster - String
    // append_env_to_name: '', // 将环境名称附加到应用名称 - Boolean
    // trace: '', // 启用或禁用事务跟踪
  }],

  // deploy : { // 部署配置选项
  //   production : {
  //     user : 'node', // SSH用户
  //     host : '212.83.163.1', // SSH主机
  //     ref  : 'origin/master', // GIT的remote/branch
  //     repo : 'git@github.com:repo.git', // GIT的remote
  //     path : '/var/www/production', // 服务器中的路径
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production', // 部署后执行
  //     key: '', // SSH密钥的路径 - String, default: $HOME/.ssh,

  //   }
  // }
};
