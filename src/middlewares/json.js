export async function json(req, res) {
  const buffers = [];

  //await dentro de uma stream aguarda todo o conteúdo ser enviado.
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    req.body = null;
  }
}
