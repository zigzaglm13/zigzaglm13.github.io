const mods = [
{
name:"Asteria",
version:"Fabric 1.21.11",
size:"7.28 MB",
file:"downloads/asteria-fabric-1.21.11.jar",
description:"mostly used for crystal pvp as it makes it x5 easier and looks legit.",
tags:["Crystal PvP","Combat","Utility"]
},
{
name:"Breeze",
version:"Fabric 1.21.11",
size:"1.97 MB",
file:"downloads/breeze-fabric-1.21.11.jar",
description:"Lightweight client designed for smooth gameplay and low detection, amazing gui and modules.",
tags:["Lightweight","FPS Boost","UI"]
},
{
name:"Krispyy",
version:"Fabric 1.21.11",
size:"1.82 MB",
file:"downloads/krispyy-fabric-1.21.11.jar",
description:"optimized cheat client best used for xray.",
tags:["X-Ray","Mining","Utility"]
},
{
name:"Kryptonite",
version:"Fabric 1.21.11",
size:"7.35 MB",
file:"downloads/kryptonite-fabric-1.21.11.jar",
description:"mostly used in donutsmp, its the most know cheat out there.",
tags:["Feature Rich","Popular","PvP"]
},
{
name:"Nyrex",
version:"Fabric 1.21.11",
size:"3.18 MB",
file:"downloads/nyrex-fabric-1.21.11.jar",
description:"Feature Rich Modules, There is a reason is extremely popular!.",
tags:["Balanced","Modules","Performance"]
},
{
name:"Vape",
version:"Fabric 1.21.11",
size:"3.88 MB",
file:"downloads/vape-fabric-1.21.11.jar",
description:"Amazing Cheat, With Good Config You Look Legit, Quality Modules Good Scaffold And More,",
tags:["Configurable","Advanced","PvP"]
}
];

const grid = document.getElementById("modsGrid");
const search = document.getElementById("search");

function render(list){
    grid.innerHTML = "";

    list.forEach(mod => {
        grid.innerHTML += `
        <div class="mod-card">
            <div class="mod-name">${mod.name}</div>
            <div class="version">${mod.version}</div>
            <div class="status">● UNDETECTED</div>

            <div class="description">
                ${mod.description}
            </div>

            <div class="tags">
                ${mod.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
            </div>

            <div class="footer">
                <span class="size">${mod.size}</span>
                <a href="${mod.file}" class="download-btn" download
                   onclick="document.getElementById('tutorial').scrollIntoView({behavior:'smooth', block:'start'})">
                    Download
                </a>
            </div>
        </div>
        `;
    });
}

search.addEventListener("input", () => {
    const value = search.value.toLowerCase();

    render(
        mods.filter(mod =>
            mod.name.toLowerCase().includes(value)
        )
    );
});

render(mods);