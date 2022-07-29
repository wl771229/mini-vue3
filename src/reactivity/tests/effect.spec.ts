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

    it('effect retutn fun',()=>{
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

    it("scheduler", () => {
        /**
         * 1、effect 需要传入第二个参数 scheduler
         * 2、首次执行 effect 的时候，还是会执行 fn
         * 3、当set发生改变的时候会执行  scheduler ，不会执行fn
         * 4、当执行run() 会执行fn
         */
        let dummy;
        let run: any;
        const scheduler = jest.fn(() => {
          run = runner;
        });
        const obj = reactive({ foo: 1 });
        const runner = effect(
          () => {
            dummy = obj.foo;
          },
          { scheduler }
        );
        expect(scheduler).not.toHaveBeenCalled();
        expect(dummy).toBe(1);
        // should be called on first trigger
        obj.foo++;
        expect(scheduler).toHaveBeenCalledTimes(1);
        // // should not run yet
        expect(dummy).toBe(1);
        // // manually run
        run();
        // // should have run
        expect(dummy).toBe(2);
      });
  

})