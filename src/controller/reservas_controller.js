import Reservas from "../model/reservas_model.js"
import ValidacaoReserva from "../services/validacaoReservas.js"

const reservasController = (app) => {
    const modelReservas = new Reservas()
    app.get('/reservas', async (req, res) => {
        try {
            const todasReservas = await modelReservas.pegaReservas()
            res.json(todasReservas)
        } catch (error) {
            res.json(error)
        }
    })

    app.get('/reservas/quarto/:quarto', async (req, res) => {
        const quarto = req.params.quarto
        try {
            let reserva = await modelReservas.pegaUmaReserva(quarto)
            res.json(reserva)
        } catch (error) {
            res.json(error)
        }
    })

    app.post('/reservas', async (req, res) => {
        const body = req.body
        try {
            const resposta = await modelReservas.insereReserva(body)
            res.json(resposta)
        } catch (error) {
            res.json(error)
        }

    })

    app.delete('/reservas/quarto/:quarto', async (req, res) => {
        const quarto = req.params.quarto
        try {
            const resposta = await modelReservas.deletaReserva(quarto)
            res.json(resposta)
        } catch (error) {
            res.json({
                "mensagem": error.message,
                "erro": true
            })
        }

    })


    app.put('/reservas/quarto/:quarto', async (req, res) => {
        const body = req.body
        const quarto = req.params.quarto
        try {
            const novosDados = new ValidacaoReserva (body.quarto, body.quantLeitos, body.frigobar, body.dataEntrada, body.dataSaida)
            await modelReservas.atualizaReserva(quarto, novosDados)
            res.json({
                "msg": "Reserva Atualizada com sucesso",
                "reserva": novosDados,
                "erro":false
            })

        } catch (error) {
            res.json({
                "msg": error.message,
                "erro":true
            })
        }
    })
}

export default reservasController