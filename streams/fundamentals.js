import { Readable } from 'node:stream';

class OneToHundredStream extends Readable {
  index = 1

  //Método obrigatório que retorna os dados de uma stream
  _read() {
    const i = this.index++

    //setTimeout para simular um arquivo gigante processando varios dados por segundo
   setTimeout(()=> {
    if (i > 100) {
      //Método push() envia dados para a stream, se passar null, a stream é finalizada
      this.push(null)
    } else {
      //Bufer.from() converte uma string em um buffer, dados enviados não podem ser primarios, devem ser buffer
      const buf = Buffer.from(String(i))

      this.push(buf)
    }
   }, 1000)

  }
}

new OneToHundredStream().pipe(process.stdout)



