const Vue = require('vue');
const VueServerRenderer = require("vue-server-renderer")
const fs=require("fs")
const path=require("path")
const vm = new Vue({
    data(){
        return {
            msg:'hezhen'
        }
    },
    template:`<div>{{msg}}</div>`
})
const template= fs.readFileSync(path.resolve(__dirname,"template.html"),'utf8')
//通过服务端渲染包  创建一个渲染器
const render =VueServerRenderer.createRenderer({
    template
})

const Koa =require("koa");
const Router=require("koa-router")
const app = new Koa();
const router=new Router();
app.use(router.routes());//koa应用中加载了路由系统

router.get("/",async (ctx)=>{
    ctx.body=await render.renderToString(vm)
})


app.listen(3000);
//npm isntall nodemon -g