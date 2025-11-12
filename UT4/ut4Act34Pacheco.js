//Ejercicio 34
//Crea un array de piezas capturadas, cada una con su tipo y valor.
const capturas = [
    {tipo: "Peon", valor: 1},
    {tipo: "Alfil", valor: 3},
    {tipo: "Dama", valor: 9},
    {tipo: "Torre", valor: 5},
    {tipo: "Alfil", valor: 3},
    {tipo: "Peon", valor: 1},
    {tipo: "Torre", valor:5},
    {tipo: "Alfil", valor: 3},
    {tipo: "Dama", valor: 9},
    {tipo: "Torre", valor: 5},
];

//Total de piezas capturadas
let piezasCapturadas = capturas.length;
console.log(`Piezas capturadas: ${piezasCapturadas}`)

//Valor total de las capturas
const valorTotal = capturas.reduce((acc, pieza) => acc + pieza.valor, 0);
console.log(`Valor total de capturas: ${valorTotal}`);

//Piezas mas valiosas filter evitado duplicados
const piezasValiosas = [...new Set(
    capturas.filter(pieza => pieza.valor >= 5).map(pieza => pieza.tipo)
)];
console.log("Tipos de piezas mas valiosas")
piezasValiosas.forEach((tipo) => console.log(`- ${tipo}`));
//Mostrar resumen con reduce
const resumen = capturas.reduce((acc, pieza) =>{
    acc[pieza.tipo] = (acc[pieza.tipo] || 0) +1;
    return acc;
}, {});
console.log("Resumen de piezas");
for (const tipo in resumen){
    console.log(`- ${tipo}: ${resumen[tipo]}`);
}