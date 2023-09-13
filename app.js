const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const senhas = [];

app.get('/', (req, res) => {
  res.render('index', { senhas });
});

app.post('/generate', (req, res) => {
  const length = parseInt(req.body.length, 10);
  const { usarMaiusculas, usarMinusculas, usarNumeros, usarEspeciais } = req.body;

  if (isNaN(length) || length < 1) {
    // Se não ter o minimo de caracteres da um erro bolado.

  } else {
    const charset = [
      usarMaiusculas && 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      usarMinusculas && 'abcdefghijklmnopqrstuvwxyz',
      usarNumeros && '0123456789',
      usarEspeciais && '!@#$%^&*()_+{}[]|:;<>,.?/~'
    ]
      .filter(Boolean)
      .join('');

    if (charset === '') {

    }

    const senha = gerarsenha(length, charset);
    senhas.push(senha);

    res.redirect('/');
  }
});

function gerarsenha(length, charset) {
  const randomBytes = crypto.randomBytes(length);
  const senha = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = randomBytes[i] % charset.length;
    senha.push(charset[randomIndex]);
  }
  return senha.join('');
}

app.listen(port, () => {
  console.log(`O Servidor está rodando aqui! ${port}`);
});
