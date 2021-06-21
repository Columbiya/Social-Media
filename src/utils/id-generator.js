function* generator() {
    let value = 0;

    while (true) {
        value++;
        yield value;
    }
}

export const idGenerator = generator();