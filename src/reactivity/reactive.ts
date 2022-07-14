import { track,trigger } from "./effect"


export function reactive(raw){

    // get里面执行依赖收集，set里面执行依赖更新
  return  new Proxy(raw,{
        get(target,key){

            const res = Reflect.get(target,key)
            // 收集依赖
            track(target,key)
            return res
        },
        set(target,key,value){
            const res = Reflect.get(target,key,value)
              // 触发依赖

              trigger(target,key)
            return res
        }
   })
}