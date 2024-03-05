(function(){
    // Remove the main layout (TODO: Just add the simulator on top of the main page, and let the user show or hide it)
    document.getElementById('__nuxt').remove();

    let body = document.getElementsByTagName('body')[0];
    body.style = "height: 100vh; width: 100vw; background: #202020; display: flex; justify-content: center; align-items: center; flex-direction: column";

    let title = document.createElement('h1');
    title.innerText = "Infinite Craft Simulator";
    title.style = "color: white";

    let form = document.createElement("form");
    form.style = "display: flex; ";

    // Initialize first element input
    let i1 = document.createElement("input");
    i1.type = "text";
    i1.id = "i1";
    i1.value = "";
    i1.style = "size: 3em; font-size: 2em; width: 250px; margin-right: 20px";
    form.appendChild(i1);

    // Initialize second element input
    let i2 = document.createElement("input");
    i2.type = "text";
    i2.id = "i2";
    i2.value = "";
    i2.style = "size: 3em; font-size: 2em; width: 250px; margin-left: 20px";
    form.appendChild(i2);

    let result = document.createElement("p");
    result.innerText = "Result";
    result.style = "display:flex;align-items:center;min-height:99px;line-height:0;font-size:41px;padding:1px 9px 0;border:1px solid #9f9f9f; transition:background .1s linear; background: white; margin: 10px; border-radius: 5px; user-select: none";

    body.appendChild(title);
    body.appendChild(form);
    body.appendChild(result);


    // Automatically generate result after 500 ms of inactivity
    let typingTimer;

    i1.addEventListener('input', e => {
        e.preventDefault();
        startListening();
    });

    i2.addEventListener('input', e => {
        e.preventDefault();
        startListening();
    });

    // Custom hotkeys for automatically switching and clearing inputs 
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            if (document.activeElement.id === 'i1') {
                i2.value = "";
                i2.focus();
            } else {
                i1.value = "";
                i1.focus();
            }
        } else if (e.key === 'Control') {
            e.preventDefault();
            if (document.activeElement.id === 'i1') {
                i1.value = "";
            } else if (document.activeElement.id === 'i2') {
                i2.value = "";
            }
        }
    });

    function startListening() {
        result.innerText = "Generating...";
        clearTimeout(typingTimer);

        typingTimer = setTimeout(function() {
            updateResult();
        }, 500);
    };

    function updateResult() {
        if (i1.value === "" || i2.value === "") return;

        fetch(`https://neal.fun/api/infinite-craft/pair?first=${i1.value}&second=${i2.value}`)
            .then(res => res.json())
            .then((x) => { result.innerText = x.result === "Nothing" ? "[couldn't generate]" : `${x.emoji} ${x.result}${x.isNew ? " [First Discovery]" : ""}`});
    };
})();