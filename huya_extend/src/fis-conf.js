/*
* @Author: xiejinlong
* @Date:   2017-02-14 19:44:50
* @Last Modified by:   xiejinlong
* @Last Modified time: 2017-03-09 10:13:15
*/

// 项目过滤
fis.set('project.ignore', [
    'docs/**',
    '.git/**',
    '.svn/**',  
    'package.json', 
    '**.cmd', 
    '**.sh',
    '**/*.md',
    'components/**/*.json',
    'fis-dev.js',
    'fis-pub.js',
    'fis-conf.js'
]);

// scss文件处理
fis.match('*.{scss,sass}', {
    //sass编译
    parser: fis.plugin('node-sass'), //启用fis-parser-sass插件
    //产出css后缀的名字
    rExt: '.css',
    //使用雪碧图
    useSprite: true,
    //标准化处理，加css前缀
    preprocessor: fis.plugin('autoprefixer', {
        // https://www.npmjs.com/package/fis3-preprocessor-autoprefixer
        "browsers": ["Android >= 2.1", "iOS >= 4"]
    })
});

// 对于有_的css就不要产出了，比如_xx.css,这种当做是内联的 
fis.match(/(__(.*)\.(css|less|scss|sass))/i, {
    release : false
});


//解析模板  https://github.com/fouber/fis-parser-utc
fis.match('**.tmpl', {
    //utc编译
    parser: fis.plugin('utc'), //启用fis-parser-utc插件
    isJsLike: true, //只是内嵌，不用发布
    isMod: false,
    release : false
},true);



//启用打包插件，必须匹配 ::package
fis.match('::package', {
    //css精灵合并  更多配置  https://github.com/fex-team/fis-spriter-csssprites
    spriter: fis.plugin('csssprites', {
        //图之间的边距
        margin: 5,
        //使用矩阵排列方式，默认为线性`linear`
        layout: 'matrix'
    }),
    //可开启定制的打包插件  https://github.com/fex-team/fis3-packager-map
    /*packager: fis.plugin('map', {
        'pkg/index.js': [
            'modules/a.js',
            'modules/index.js'
        ]
    }),*/
})

//view 的文件发布到根目录下
/*fis.match('output/(**)', {
   release : '../../../huya_assets/a_dwstatic_huya/hd.huya.com/huya_extend/$1',
   useHash : false, 
},true)*/



fis.match('js/**/(**)', {
   release : false,
})


fis.match('**', {
  //domain : 'http://xjl.huya.com/dev',  
  deploy: [
    //https://github.com/fex-team/fis3-deploy-skip-packed
    fis.plugin('skip-packed',{
        // 默认被打包了 js 和 css 以及被 css sprite 合并了的图片都会在这过滤掉，
        // 但是如果这些文件满足下面的规则，则依然不过滤
        /*ignore: [
            '/img/b1.png'
        ]*/
    }),
    fis.plugin('local-deliver')
  ]
})



fis.media('test')
    .match('mock/*', {
        release : false
    })
    .match('**', {
      //domain : 'http://xjl.huya.com/dev',  
      deploy: [
        //https://github.com/fex-team/fis3-deploy-skip-packed
        fis.plugin('skip-packed',{
            // 默认被打包了 js 和 css 以及被 css sprite 合并了的图片都会在这过滤掉，
            // 但是如果这些文件满足下面的规则，则依然不过滤
            /*ignore: [
                '/img/b1.png'
            ]*/
        }),
        fis.plugin('local-deliver', {
            to: '../test'
        })
      ]
    })


fis.media('pub')
    .match('mock/*', {
        release : false
    })
    .match('manifest2.json', {
        release : false
    })
    //压缩css    
    .match('**.css', {
        optimizer: fis.plugin('clean-css')
    })
    //压缩js
    .match('**.js', {
        optimizer: fis.plugin('uglify-js', {
            mangle: {
                expect: ['exports, module, require, define'] //不想被压的
            },
            //自动去除console.log等调试信息
            compress : {
                drop_console: true
            }
        })
    })
    .match('**', {
      //domain : 'http://xjl.huya.com/dev',  
      deploy: [
        //https://github.com/fex-team/fis3-deploy-skip-packed
        fis.plugin('skip-packed',{
            // 默认被打包了 js 和 css 以及被 css sprite 合并了的图片都会在这过滤掉，
            // 但是如果这些文件满足下面的规则，则依然不过滤
            /*ignore: [
                '/img/b1.png'
            ]*/
        }),
        fis.plugin('local-deliver', {
            to: '../pub'
        })
      ]
    })