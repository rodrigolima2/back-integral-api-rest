const express = require('express');
const app = express();
const livros = [
    {
        id: 1,
        titulo: "A Odisséia de Jonas",
        autor: "Thomas Crawling",
        ano: 2001,
        numPaginas: 197
    },
    {
        id: 2,
        titulo: "Jonas e a sociedade escondida",
        autor: "Claire Crawling",
        ano: 2004,
        numPaginas: 158
    }
];

app.use(express.json());

app.get('/livros', (req, res) => {
    res.json(livros);
});

app.get('/:id', (req, res) => {
    if (isNaN(Number(req.params.id))) {
        res.json({ mensagem: 'O valor do parâmetro ID da URL não é um número válido.' });
    } else {
        const livro = livros.find(x => x.id === Number(req.params.id));

        if (livro === undefined) {
            res.json({ mensagem: 'Não existe livro para o ID informado.' })
        } else {
            res.json(livro);
        }
    }
});

app.post('/livros', (req, res) => {
    let dadosValidos = false;

    if (req.body.titulo !== undefined) {
        if (req.body.autor !== undefined) {
            if (req.body.ano !== undefined) {
                if (req.body.numPaginas !== undefined) {
                    dadosValidos = true;
                }
            }
        }
    }
    if (!dadosValidos) {
        res.json({ mensagem: 'Você precisa inserir todos os dados...' });
    } else {
        const id = livros.length + 1;

        livros.push({
            id: id,
            titulo: req.body.titulo,
            autor: req.body.autor,
            ano: req.body.ano,
            numPaginas: req.body.numPaginas
        });

        res.json(livros[livros.length - 1]);
    }
});

app.put('/livros/:id', (req, res) => {
    if (isNaN(Number(req.params.id))) {
        res.json({ mensagem: 'O valor do parâmetro ID da URL não é um número válido.' });
    } else {
        const livro = livros.find(x => x.id === Number(req.params.id));

        if (livro === undefined) {
            res.json({ mensagem: 'Não existe livro a ser substituído para o ID informado.' });
        } else {
            let dadosValidos = false;

            if (req.body.titulo !== undefined) {
                if (req.body.autor !== undefined) {
                    if (req.body.ano !== undefined) {
                        if (req.body.numPaginas !== undefined) {
                            dadosValidos = true;
                        }
                    }
                }
            }
            if (!dadosValidos) {
                res.json({ mensagem: 'Você precisa inserir todos os dados...' });
            } else {
                livro.titulo = req.body.titulo;
                livro.autor = req.body.autor;
                livro.ano = req.body.ano;
                livro.numPaginas = req.body.numPaginas;
                res.json({ mensagem: 'Livro substituído.' });
            }
        }
    }
});

app.patch('/livros/:id', (req, res) => {
    if (isNaN(Number(req.params.id))) {
        res.json({ mensagem: 'O valor do parâmetro ID da URL não é um número válido.' });
    } else {
        const livro = livros.find(x => x.id === Number(req.params.id));

        if (livro === undefined) {
            res.json({ mensagem: 'Não existe livro a ser alterado para o ID informado.' });
        } else {
            if (req.body.titulo !== undefined) {
                livro.titulo = req.body.titulo;
            }
            if (req.body.autor !== undefined) {
                livro.autor = req.body.autor;
            }
            if (req.body.ano !== undefined) {
                livro.ano = req.body.ano;
            }
            if (req.body.numPaginas !== undefined) {
                livro.numPaginas = req.body.numPaginas;
            }
            res.json({ mensagem: "Livro substituído." });
        }
    }
});

app.delete('/livros/:id', (req, res) => {
    if (isNaN(Number(req.params.id))) {
        res.json({ mensagem: 'O valor do parâmetro ID da URL não é um número válido.' });
    } else {
        const livro = livros.find(x => x.id === Number(req.params.id));

        if (livro === undefined) {
            res.json({ mensagem: 'Não existe livro a ser removido para o ID informado.' });
        } else {
            livros.splice(livros.indexOf(livro), 1);
            res.json({ mensagem: "Livro removido." });
        }
    }
});

app.listen(8000);