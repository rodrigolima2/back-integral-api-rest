const express = require('express');
const app = express();
const convidados = ["Carlos", "Amanda", "Fernanda", "Juliana", "Lucas", "Roberto"];

app.use(express.json());

app.get('/convidados', (req, res) => {
    if (req.query.nome === undefined) {
        res.json(convidados);
    } else {
        const nome = convidados.find(x => x === req.query.nome);

        if (nome === undefined) {
            const mensagem = { mensagem: `O convidado buscado não está presente na lista.` };

            res.json(mensagem);
        } else {
            const mensagem = { mensagem: `Convidado presente.` };

            res.json(mensagem);
        }
    }
});

app.post('/convidados', (req, res) => {
    if (req.body.nome === undefined) {
        res.json("Nenhum nome informado");
    } else {
        const jaExiste = convidados.find(x => x === req.body.nome);

        if (jaExiste) {
            const mensagem = { mensagem: 'O nome do convidado a ser adicionado já existe na lista. Caso queria adicionar outro convidado de mesmo nome, favor fornecer o sobrenome também.' };

            res.json(mensagem);
        } else {
            const mensagem = { mensagem: 'Convidado adicionado.' };

            convidados.push(req.body.nome);
            res.json(mensagem);
        }
    }
});

app.delete('/convidados/:nome', (req, res) => {
    const existe = convidados.find(x => x === req.params.nome);
    if (existe) {
        const indexDeletar = convidados.indexOf(req.params.nome);
        const mensagem = { mensagem: 'Convidado removido.' };

        convidados.splice(indexDeletar, 1);
        res.json(mensagem);
    } else {
        const mensagem = { mensagem: 'O nome do convidado a ser removido não existe na lista. Nenhum convidado foi removido.' };

        res.json(mensagem);
    }
});

app.listen(8000);