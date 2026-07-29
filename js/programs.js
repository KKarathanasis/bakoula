// mobile menu
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

const mainTabs = document.querySelectorAll(".program-tab");
const subTabs = document.querySelectorAll(".sub-tab");

const contents = document.querySelectorAll(".program-content");

const gymTabs = document.getElementById("gymnasium-tabs");
const lyceumTabs = document.getElementById("lyceum-tabs");
const summerTabs = document.getElementById("summer-tabs");



function activate(button, group, activeClasses = ["bg-indigo-500", "text-white"]){
    const inactiveClasses = ["bg-white", "text-slate-900"];
    group.forEach(tab=>{
        tab.classList.remove(...activeClasses);
        tab.classList.add(...inactiveClasses);
    });
    button.classList.remove(...inactiveClasses);
    button.classList.add(...activeClasses);
}

function hideAllMenus(){
    gymTabs.classList.add("hidden");
    lyceumTabs.classList.add("hidden");
    summerTabs.classList.add("hidden");
}

function showContent(id){
    contents.forEach(content=>{
        content.classList.add("hidden");
    });

    document
        .getElementById(id)
        .classList.remove("hidden");
}

mainTabs.forEach(tab=>{
    tab.addEventListener("click",()=>{

        activate(
            tab,
            [...mainTabs],
            ["bg-indigo-950", "text-white"]
        );

        hideAllMenus();

        const target = tab.dataset.target;

        if(target==="gymnasium"){
            gymTabs.classList.remove("hidden");
            document
                .querySelector('[data-target="gym-a"]')
                .click();
        }

        else if(target==="lyceum"){
            lyceumTabs.classList.remove("hidden");
            document
                .querySelector('[data-target="lyceum-a"]')
                .click();
        }

        else if(target==="summer"){
            summerTabs.classList.remove("hidden");
            document
                .querySelector('[data-target="summer-gym-a"]')
                .click();
        }
    });

});



subTabs.forEach(tab=>{
    tab.addEventListener("click",()=>{
        activate(
            tab,
            [...subTabs].filter(t =>
                t.parentElement === tab.parentElement
            )
        );

        showContent(
            tab.dataset.target
        );
    });
});