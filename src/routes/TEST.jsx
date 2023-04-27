const TEST = () => {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const qwert = async () => {
    // const a = document.querySelector('#q1');
    // const b = document.querySelector('#q2');
    // function lol() {
    //     sleep(500).then(() => {
    //         a.innerHTML +="1"
    //    }).then(() => sleep(500)).then(() => {
    //         b.innerHTML +="2";
    //         lol()
    //     });
    // }
    // lol()
    async function a() {
        await(sleep(1000))
        console.log(1)
    }
    console.log(1);
    var i = 0;
    async function b() {
        if (i < 10) {          
             a().then(() => {
                i += 1
                console.log(["i", i])
                b()
            })
        }
    }
    b()
    
    }
    return(
        <>
        <div id="q1" className="d1">

        </div>
        <div id="q2" className="d1">

        </div>
        <button onClick={qwert}>123</button>
        </>
    )
}

export default TEST;