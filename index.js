import chalk from 'chalk';
import fs, { ftruncateSync, readFile } from 'fs';
import path from 'path';

// regex interpreta a expressão regular no javascript 
// exec é o metodo de expressão regular
// match é um metodo que recebe string
// while = enquanto, .push empurra o resultado para a const
function extraiLinks(texto){
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayResultados = [];
    let temp;
    while((temp = regex.exec(texto)) !== null){
        arrayResultados.push({ [temp[1]]: temp[2] })
    }
return arrayResultados.length === 0 ? 'Não há links' : arrayResultados;
}
                                                                                                        
//função que trata os erro lançando(throw) o erro pra fora e mostrando no console
//erro.code - permite dar um texto ao erro
function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'Arquivo não encontrado'));
}
//readFile ou fs - lib que que lé arquivos(nativa do node)
//pegaArquivos - função que captura os arquivos com o fs e retorna ele no console ou o erro

//FUNÇÃO DE PROMESSAS COM async - await
//"try" tenta executar o codigo, caso der erro retorna no "catch" que pega o erro
//"finally" passa o retorno se der erro ou não
//(é uma forma de tratar o erro)

export default async function pegaArquivo(caminhoDoArquivo) {
    const encoding = 'utf-8';
    try {
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
    return (extraiLinks(texto));
    } catch(erro) {
        trataErro(erro);
    } finally {
        console.log(chalk.yellow("Operação Concluída!"));
    }
}


//FUNÇÃO DE PROMESSAS COM .then
// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.promises
//     .readFile(caminhoDoArquivo, encoding) //passou caminho do arquivo, vai ler o arquivo
//     .then((texto) => chalk.green(console.log(texto))) 
//then =então quando pegar o texto, passa a função callback console.log no caso
//     .catch((erro) => trataErro(erro)) 
//catch=pegar, pega o erro e passa a funçao callback trataErro no caso
// }

//FUNÇÃO SEM O ASINCRONO
// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//         if(erro) {
//             trataErro(erro);
//         }
//         console.log(chalk.green(texto));
//     })
// }




