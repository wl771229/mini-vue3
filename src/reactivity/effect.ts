
class ReactiveEffect {
    private _fn: any
    deps = []
    constructor(fn,public scheduler?){
        this._fn= fn
    }
    run(){
        activeEffect =  this
        return this._fn()
    }
    stop(){
        this.deps.forEach((dep:any) => {
            dep.delete(this) 
        });

    }
}
let activeEffect
export function effect(fn,options:any = {}){
    const scheduler = options.scheduler
// 需要执行这个fn
  const _effect = new ReactiveEffect(fn,scheduler)
  _effect.run()
  const runner:any= _effect.run.bind(_effect)
  runner.effect =  _effect
  return runner
}

export function stop(runner){
    runner.effect.stop()
}

const targetMap = new Map()
export function track(target,key){
    // tarket ->key ->dep
    let depsMap = targetMap.get(target)
    if(!depsMap){
        depsMap = new Map();
        targetMap.set(target,depsMap)

        console.log(target)
        console.log(depsMap)
    }
    let dep = depsMap.get(key)
    if(!dep){
        dep = new Set();
        depsMap.set(key,dep)
    }
    console.log(depsMap)
    if(!activeEffect) return 
    dep.add(activeEffect)
    activeEffect.deps.push(dep)

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

