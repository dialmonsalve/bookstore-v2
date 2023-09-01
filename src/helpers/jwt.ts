import jwt from 'jsonwebtoken';

export const signToken = (_id: string, prop: string) => {

  if (!process.env.SECRETPRIVATEKEY) {
    throw new Error('No hay JWT - Revisar las variables de entorno');
  };

  return jwt.sign(
    { _id, prop },
    process.env.SECRETPRIVATEKEY,
    { expiresIn: '30d' }
  )
}

export const isValidToken = (token: string): Promise<string> => {

  if (!process.env.SECRETPRIVATEKEY) {
    throw new Error('No hay JWT - Revisar las variables de entorno');
  };

  return new Promise((resolve, reject) => {

    try {
      jwt.verify(token, process.env.SECRETPRIVATEKEY || '', (err, payload) => {
        if (err) return reject('JWT no es válido');

        const { _id } = payload as { _id: string };

        resolve(_id);
      })
    } catch (error) {
      console.log(error);

      reject('JWT no es válido');
    }


  })
}