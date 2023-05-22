import http from 'node:http';
import { Transform } from 'node:stream'


//stream de transformação: Transform:
class InverseNumberStream extends Transform {
  //Chunk é o "pedaço de dado" que lemos do buf de leitura.
  //encoding é a codificação do dado.
  //callback é uma função que deve ser chamada quando o chunk for processado, quando terminar.
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)

    //primeiro parâmetro é se houver erro, segundo é o dado transformado.
    callback(null, Buffer.from(String(transformed)))
  }
}


//req = ReadableStream
//res = WritableStream
//invés de fazermos nossas streams de leitura e escrita como no "fundamentals.js", podemos usar as streams do node(req, res).

const server = http.createServer(async(req, res) => {
  //Se precisarmos dos buffers completos, sem utilizar streams, podemos usar o método abaixo:
  const buffers = []

  //await dentro de uma stream aguarda todo o conteúdo ser enviado.
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)

  //Se quisermos trabalhar com a stream completa usaríamos o return abaixo:
  //return res.end(fullStreamContent)


  return req.pipe(new InverseNumberStream()).pipe(res)
})

server.listen(3334)
