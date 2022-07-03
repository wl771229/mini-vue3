describe("effect", ()=>{
	it('happy path', ()=>{

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

})