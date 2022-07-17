// function geraArrayURLs(arrayLinks) {
//     return arrayLinks.map(objetoLink => Object.values(objetoLink).join());
// }

// export function validaURLs(arrayLinks) {
//     return geraArrayURLs(arrayLinks);
// }
function manejaErros(erro) {
    throw new Error(erro.message);
}

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function checaStatus(arrayURLs) {
    try {
        const arrayStatus = await Promise
        .all(arrayURLs
            .map(async url => {
        const res = await fetch(url)
        return `${res.status} - ${res.statusText}`;
    }))
    return arrayStatus
    
} catch(erro) {
    manejaErros(erro);
}
}

function geraArrayURLs(arrayLinks) {
    return arrayLinks
        .map(objetoLink => Object
            .values(objetoLink).join());
}

export async function validaURLs(arrayLinks) {
    const links = geraArrayURLs(arrayLinks);
    const statusLinks = await checaStatus(links)
    const resultados = arrayLinks.map((objeto, indice) => ({ 
        ...objeto,
        status: statusLinks[indice]
     }))
    
     return resultados
}
