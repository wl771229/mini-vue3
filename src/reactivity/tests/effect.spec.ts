import { effect } from '../effect';
import {reactive} from '../reactive'

describe("effect", ()=>{
    // 任务拆分的思想
	it.skip('happy path', ()=>{
    const user = reactive({
        age:10
    })  
    let nextAge;
    effect(()=>{
        // 收集，当调用effect 时收集依赖 ， 收集到一个桶里面去
        nextAge = user.age++
    })
    expect(nextAge).toBe(11)
    // 更新
    nextAge++
    expect(user.age).toBe(12)

	})

    it('effect fun',()=>{
        // effect->function(runner)->fn->retutn fun
        // 当我们调用effect 的时候，实际上会执行 runner 函数   ， 调用runner 函数 实际上会拿到 fn ，这是时候我们是把fn return 出去的
        let foo = 10
        const runner  =  effect(()=>{
            foo++;
            return 'foo';
        })
         expect(foo).toBe(11)
         const r = runner()
         expect(foo).toBe(12)
         expect(r).toBe('foo')

    })



})