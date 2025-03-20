function makeCounter() {
    let count = 0

    return function() {
        return count++
    }
}

export let counter = makeCounter()