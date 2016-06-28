'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var path = require('path');


module.exports = yeoman.Base.extend({
  constructor: function() {
    yeoman.Base.apply(this, arguments);
  },
  //初始化方法
  initializing: function() {

  },
  //获取用户选项
  prompting: function() {
    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the sensational ' + chalk.red('generator-website-app') + ' generator!'
    ));
    this.name = path.basename(process.cwd());
    this.license = 'ISC';
    this.description = '';
    this.author = 'tutu';

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'name of app',
      default: this.name
    }, {
      type: 'input',
      name: 'description',
      message: 'description:',
      default: this.description
    }, {
      type: 'input',
      name: 'license',
      message: 'license:',
      default: this.license
    }, {
      type: 'input',
      name: 'author',
      message: 'author:',
      default: this.author
    }];

    return this.prompt(prompts).then(function(props) {
      this.name = props.name;
      this.pkgName = props.name;
      this.license = props.license;
      this.author = props.author;
      this.description = props.description;
      done(); //进入下一个生命周期阶段
    }.bind(this));
  },
  //保存配置
  // configuring: function() {

  // },

  // default: function() {

  // },
  //写generator特殊文件（路由、控制器）
  writing: function() {
    //生成目录结构阶段
    //默认源目录就是生成器的templates目录，目标目录就是执行`yo example`时所处的目录。调用this.template用Underscore模板语法去填充模板文件
    this.template('package.json', 'package.json');
    this.template('gulpfile.js', 'gulpfile.js');
    mkdirp('src');
    mkdirp('src/images');
    mkdirp('src/js');
    mkdirp('src/scss');
    mkdirp('src/slice');
    mkdirp('src/view');
    this.copy('src/view/index.html', 'src/view/index.html');
    this.copy('src/scss/base.scss', 'src/scss/base.scss');

  },
  //冲突后处理方案
  // conflicts: function() {

  // },
  //安装
  install: function() {
    var done = this.async();
    done();
    // this.spawnCommand('npm', ['install']) //安装项目依赖
    //   .on('exit', function(code) {
    //     if (code) {
    //       done(new Error('code:' + code));
    //     } else {
    //       done();
    //     }
    //   })
    //   .on('error', done);
  },
  //安装结束
  end: function() {
    var done = this.async();
    done();
    this.log('工作流初始化完毕, 请 `npm install` 安装依赖.');


  }
});
