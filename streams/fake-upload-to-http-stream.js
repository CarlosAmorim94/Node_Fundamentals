import { Readable } from 'node:stream'

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

//Requisição abaixo vai enviar dados aos poucos pro servidor
//stream só pode ser enviadas com POST ou PUT.
fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half' // adicione essa linha para enviar e receber dados.
})
