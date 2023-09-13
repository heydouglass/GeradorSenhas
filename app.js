const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const app = express();
const port = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');


const porta = process.env.PORT || 3000;
const baseURL = "https://gerador-senhas-seven.vercel.app"
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

    const senha = gerarSenha(length, charset);
    senhas.push(senha);


    salvarSenha(senha);

    res.redirect('/');
  }

});

function gerarSenha(length, charset) {
  const randomBytes = crypto.randomBytes(length);
  const senha = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = randomBytes[i] % charset.length;
    senha.push(charset[randomIndex]);
  }
  return senha.join('');
}

function salvarSenha(senha) {
  fs.writeFile('senhas.html', senha + '\n', { flag: 'a' }, (err) => {
    if (err) {
      console.error('Erro ao salvar a senha no arquivo:', err);
    } else {
      console.log('Senha salva no arquivo com sucesso.');
    }
  });
}

app.listen(port, () => {
  console.log(`O Servidor está rodando aqui! ${port}`);
});
