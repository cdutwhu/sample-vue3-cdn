export function fetch_get(url) {
    const data = fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            // console.log(data);
            return data;
        });

    //   const data = async () => {
    //     const a = await prom;
    //     console.log(a);
    //     return a;
    //   };

    return data;
}