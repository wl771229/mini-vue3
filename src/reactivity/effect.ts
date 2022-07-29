
class ReactiveEffect {
    private _fn: any
    constructor(fn,public scheduler?){
        this._fn= fn
    }
    run(){
        activeEffect =  this
        return this._fn()
    }
}
let activeEffect
export function effect(fn,options:any = {}){
    const scheduler = options.scheduler
// 需要执行这个fn
  const _effect = new ReactiveEffect(fn,scheduler)
  _effect.run()
  const runner = _effect.run.bind(_effect)
  return runner
}
const targetMap = new Map()
export function track(target,key){
    let depsMap = targetMap.get(target)
    if(!depsMap){
        depsMap = new Map();
        targetMap.set(target,depsMap)
    }
    let dep = depsMap.get(key)
    if(!dep){
        dep = new Set();
        depsMap.set(key,dep)
    }
    dep.add(activeEffect)
}

export function trigger(target,key){

    let depMap = targetMap.get(target)

    let dep = depMap.get(key)
    for(const effect of dep){
        if(effect.scheduler){
            effect.scheduler()
        }else{
            effect.run()
        }

    }


}

