import { Readable, Writable, Transform } from 'node:stream';

//Stream de leitura: Readable
class OneToHundredStream extends Readable {
  index = 1

  //Método obrigatório que retorna os dados de uma stream.
  _read() {
    const i = this.index++

    //setTimeout para simular um arquivo gigante processando varios dados por segundo.
   setTimeout(()=> {
    if (i > 100) {
      //Método push() envia dados para a stream, se passar null, a stream é finalizada.
      this.push(null)
    } else {
      //Bufer.from() converte uma string em um buffer, dados enviados não podem ser primarios, devem ser buffer, chunk é um "pedaço de dado".
      const buf = Buffer.from(String(i))

      this.push(buf)
    }
   }, 1000)

  }
}

//Estamos lendo dados de uma stream e enviando para o console.
new OneToHundredStream().pipe(process.stdout)


//Stream de escrita: Writable:
class MultiplyByTenStream extends Writable {
  //Chunk é o "pedaço de dado" que lemos do buf de leitura.
  //encoding é a codificação do dado.
  //callback é uma função que deve ser chamada quando o chunk for processado, quando terminar.
  _write(chunk, encoding, callback) {

    //chunk é um pedaço do buffer, então precisamos converter para string.
    console.log(Number(chunk.toString())*10)

    callback()
  }
}

//Estamos recebendo dados de uma stream e enviando para outra.
new OneToHundredStream().pipe(new MultiplyByTenStream())


//stream de transformação: Transform:
class InverseNumberStream extends Transform {
  //Chunk é o "pedaço de dado" que lemos do buf de leitura.
  //encoding é a codificação do dado.
  //callback é uma função que deve ser chamada quando o chunk for processado, quando terminar.
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    //primeiro parâmetro é se houver erro, segundo é o dado transformado.
    callback(null, Buffer.from(String(transformed)))
  }
}

//Streams de leitura e uma de escrita, com a transformação de dados no meio.
new OneToHundredStream().pipe(new InverseNumberStream()).pipe(new MultiplyByTenStream())
