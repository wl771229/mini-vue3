
import {reactive}  from '../reactive'

describe('reactive',()=>{
        
it('happy path', ()=>{
    const original = {foo:1}
    const observable = reactive(original)

    expect(original).not.toBe(observable)
    expect(observable.foo).toBe(1)
})
})