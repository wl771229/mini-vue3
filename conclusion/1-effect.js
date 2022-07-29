/**
 * 
 * 1、首选我们要明白什么事effect，在设计与实现当中 ， effect被称之为付作用函数
 * 2、那么什么事副作用函数
 * 
 */

// 副作用函数
const obj = {text:"hellow vue3"}
function effect(){
    document.body.innerText = obj.text
}
// 在effect 函数之外的任何函数都可以访问到body的内容，也就是说effect 可以间接或者直接影响到其他函数，所以产生了副作用，称之为副作用函数

/**
 * 这里我们希望当obj.text 的值发生变化的时候，effect可以重生执行
 * 那么我们应该怎么去做
 *1、当我们调用effect的时候 ，会触发obj的get操作， 我们可以把eddect 函数放到一个桶里面，也就是说所说的依赖收集 
 */

  new Proxy(raw,{
    get(target,key){

        const res = Reflect.get(target,key)
        // 收集依赖
        track(target,key)
        return res
    },

})

export function track(target,key){
    let depsMap = targetMap.get(target)
    let dep = depsMap.get(key)
    dep.add(activeEffect)
}


/**
 * 那么我们希望在obj.text  的值发生变化的时候，我们需要重新执行effect () ,也就是我们说的依赖更新
 * 
 * 执行effect 实际上就是希望我们从桶里边把fn 拿出来 ，执行 
 *  */ 


  new Proxy(raw,{

    set(target,key,value){
        const res = Reflect.get(target,key,value)
          // 触发依赖

          trigger(target,key)
        return res
    }
})

export function trigger(target,key){

    let depMap = targetMap.get(target)

    let dep = depMap.get(key)
    for(const effect of dep){
        effect.run()

    }


}


/**
 * effect 的整个执行过程
 * 
 * effect() ->  run（）->fun()->return fun()
 * 
 * 
 */



