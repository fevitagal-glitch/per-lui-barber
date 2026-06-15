async function loadCuts() {
    const res = await fetch("/cuts");
    const cuts = await res.json();

    document.getElementById("cuts").innerHTML = cuts.map(c =>
        `<div class="card">${c.name} - €${c.price}</div>`
    ).join("");

    document.getElementById("cutSelect").innerHTML = cuts.map(c =>
        `<option value="${c.name}">${c.name}</option>`
    ).join("");
}

async function book() {
 

   function book() {
    const name = document.getElementById("name").value;
    const cut = document.getElementById("cutSelect").value;
    const time = document.getElementById("time").value;

    console.log(name, cut, time);

    fetch("/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            cut,
            time
        })
    });
}

loadCuts();
